import { User } from "../model/users.js"

export const user = async (req, res) => {
    const { user_id } = req.user
    const user = await User.findOne({ _id : user_id });
    return res.status(200).json({
        msg : 'user',
        user : user,
    })
}