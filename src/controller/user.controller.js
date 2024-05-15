import { User } from "../model/users.js";

export const getUser = async (req,res)=> {
    try {
        const { user_id } = req.user;
        const user = await User.findOne({ _id: user_id });
        if (user) {
            return res.status(200).json({
                user : {
                    name : user.name,
                    email : user.email,
                    user_id : user._id,
                    createdAt : user.createdAt,
                }
            })
        }
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}


