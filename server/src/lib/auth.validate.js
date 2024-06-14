import Joi from 'joi';
import { User } from '../model/users.js';

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().required()
});

export const validateUser = async (data) => {
    try {
        const { error, value } = schema.validate(data);
        if (error) {
            return { isValid: false, message: error.details[0].message };
        }

        const user = await User.findOne({ email: value.email });

        if (user) {
            return { isValid: false, message: 'User already exists', user: user };
        } else {
            return { isValid: true, user: value };
        }
    } catch (err) {
        return { isValid: false, message: 'An error occurred while searching for the user' };
    }
}
