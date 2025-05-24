import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Невірний формат почти').isEmail(),
    body('password', "Пароль повинен бути мінімум 5 символів").isLength({min: 5}),
];
export const registerValidation = [
    body('email', 'Невірний формат почти').isEmail(),
    body('password', "Пароль повинен бути мінімум 5 символів").isLength({min: 5}),
    body('fullName', "Вкажіть ім'я").isLength({min: 3}),
    body('avatarUrl', "Ссилка на аватар є недостовірною").optional().isURL(),
];
export const postCreateValidation = [
    body('title', 'Введіть заголовок теми').isLength({min:3}).isString(),
    body('text', "Введіть тест теми:").isLength({min: 6}).isString(),
];
export const replyCreateValidation = [
    body('text', "Введіть текст відповіді на пост").isLength({min: 2}).isString(),
];