import { validateUser } from "../lib/auth.validate.js";
import { User } from "../model/users.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


const { JWT_SECRET } = process.env;

export const register = async (req,res)=> {
    try {
    const data = req.body ;

    validateUser(data).then( async (result)=> {
        if (result.isValid) {
            const user = new User({
                email : data.email,
                password :  await bcrypt.hash(data.password,10),
                name : data.name,
            });
            await user.save();
            return res.status(200).json({
                msg: 'user created',
                user : user
            })
        } else {
            return res.status(400).json({
                msg: result.message
            });
        }
    })

    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

export const login = async (req,res)=> {
    try {
        const data = req.body ;
        validateUser(data).then( async (result)=> {
            if (!result.isValid) {
                const isMatch = await bcrypt.compare(data.password, result.user.password);
                if (isMatch) {
                    const token = jwt.sign(
                        {
                            user_id : result.user._id
                        },
                        JWT_SECRET ,
                        { expiresIn : "2d"}
                    )
                    return res.status(201).json({
                        user : {
                            email : result.user.email,
                            name : result.user.name,
                            _id : result.user._id,
                        },
                        token : token
                    })
                } else {
                    return res.status(201).json({
                        msg: 'email or password incorrect'
                    })
                }
            } else {
                return res.status(400).json({
                    msg: result.message
                });
            }
        })
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}
