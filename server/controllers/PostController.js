import PostModel from '../models/Post.js';
import ReplyModel from '../models/Reply.js';
import UserModel from '../models/user.js';
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('user', '-passwordHash -email')
            .lean();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати статью',
        });
    }
};
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        ).populate('user', '-passwordHash -email');

        if (!doc) {
            return res.status(404).json({
                message: 'Статья не знайдена',
            });
        }

        const replies = await ReplyModel.find({ postId })
            .populate('user', '-passwordHash -email');

        res.json({ ...doc.toObject(), replies });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати статью',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findById(postId);

        if (!doc) {
            return res.status(404).json({
                message: 'Статья не знайдена',
            });
        }
        if (doc.user.toString() !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({
                message: 'Ви не можете видалити цей пост',
            });
        }
        await PostModel.findByIdAndDelete(postId);
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось знайти статью',
        });
    }
};

export const create = async (req,res) => {
    try {
        const doc = new PostModel({
            title:req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch(err) {
          console.log(err);
          res.status(500).json({
              message:'Не вдалось створити тему',
          });
    }
};
export const createReply = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;

        if (!text || !postId) {
            return res.status(400).json({ message: 'Текст и postId  обов.язкові' });
        }

        const doc = new ReplyModel({
            text,
            postId,
            user: req.userId,
        });

        const reply = await doc.save();

        res.json(reply);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати відповідь',
        });
    }
};
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findById(postId);

        if (!doc) {
            return res.status(404).json({
                message: 'Тема не знайдена',
            });
        }

        // перевірка на право редагувати
        if (doc.user.toString() !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({
                message: 'Ви не можете редагувати цей пост',
            });
        }

        await PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
            },
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось обновити тему',
        });
    }
};
export const makeAdmin = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Користувач не знайден' });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Цей користувач вже є адміном' });
        }

        await UserModel.updateOne(
            { _id: userId },
            { role: 'admin' }
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось назначити адміністратора',
        });
    }
};
