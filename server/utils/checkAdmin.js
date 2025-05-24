export default (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Доступ заборонен. Ви не є адміном.' });
    }
    next();
};