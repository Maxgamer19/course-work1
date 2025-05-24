import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {registerValidation,loginValidation, postCreateValidation, replyCreateValidation} from './validations.js';

import checkAuth from './utils/checkAuth.js';
import checkAdmin from './utils/checkAdmin.js';
import * as UserController  from './controllers/UserController.js';
import * as PostController  from './controllers/PostController.js';
mongoose
    .connect('my personal database(sasi)')
    .then(()=> console.log('DATABASE OK'))
    .catch((err)=> console.log('DATABASE ERROR',err));

const app = express();

app.use(cors());

app.use(express.json());

app.post('/auth/login',loginValidation,UserController.login);
app.post('/auth/register',registerValidation,UserController.register,);
app.get('/auth/me',checkAuth,UserController.getMe,);


app.get('/posts',PostController.getAll);
app.get('/posts/:id',PostController.getOne);
app.post('/posts',checkAuth,postCreateValidation,PostController.create);
app.post('/posts/reply/:id',checkAuth,replyCreateValidation,PostController.createReply);
app.delete('/posts/:id',checkAuth,PostController.remove);
app.patch('/posts/:id',checkAuth,PostController.update);
app.post('/auth/make-admin/:id', checkAuth, checkAdmin, PostController.makeAdmin);
app.listen(8000, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server ok');
});
