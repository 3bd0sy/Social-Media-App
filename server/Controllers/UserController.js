import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await UserModel.find({})
        // users = allUsers.map((u) => {
        //         const { password, ...otherData } = u._doc
        //         console.log(otherData)
        //         return otherData
        //     }
        //     )
        // console.log("users:", users)
        res.status(200).json(allUsers.map((u) => {
            const { password, ...otherData } = u._doc
            return otherData
        }))


        // res.status(200).json(allUsers)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id)
        if (user) {
            const { password, ...otherData } = user._doc
            res.status(200).json(otherData)
        }
        else {
            res.status(404).json("user not found ")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus, password } = req.body;
    if (id === _id || currentUserAdminStatus) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(
                id, req.body, { new: true }
            )
            const token = jwt.sign(
                { username: user.username, id: _id },
                process.env.JWT_KEY, { expiresIn: "10h" }
            )
            res.status(200).json({ user, token })
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(404).json("Access Denied")
    }
}


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus } = req.body;
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            const result = await UserModel.findByIdAndDelete(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(404).json("Access Denied")
    }
}


// export const followUser = async (req, res) => {
//     const id = req.params.id;
//     const { currentUserId } = req.body;
//     if (id === currentUserId) {
//         res.status(403).json("Access Denied you cant follow your self")
//     } else {
//         try {
//             const followuser = await UserModel.findById(id)
//             const followinguser = await UserModel.findById(currentUserId)
//             if (!followuser.followers.includes(currentUserId)) {
//                 await followuser.updateOne({ $push: { followers: currentUserId } })
//                 await followinguser.updateOne({ $push: { following: id } })
//                 res.status(200).json("User Followed")
//             } else {
//                 res.status(403).json("user already followed by you")
//             }

//             res.status(200).json(result)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
// }


export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    if (id === _id) {
        return res.status(403).json("Access Denied you cant follow your self");
    } else {
        try {
            const followuser = await UserModel.findById(id);
            const followinguser = await UserModel.findById(_id);
            if (!followuser.followers.includes(_id)) {
                await followuser.updateOne({ $push: { followers: _id } });
                await followinguser.updateOne({ $push: { following: id } });
                return res.status(200).json("User Followed");
            } else {
                return res.status(203).json("user already followed by you");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

export const unFollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
    if (id === _id) {
        return res.status(403).json("Access Denied you cant unfollow your self");
    } else {
        try {
            const followuser = await UserModel.findById(id);
            const followinguser = await UserModel.findById(_id);
            if (followuser.followers.includes(_id)) {
                await followuser.updateOne({ $pull: { followers: _id } });
                await followinguser.updateOne({ $pull: { following: id } });
                return res.status(200).json("User UnFollowed");
            } else {
                return res.status(203).json("user is not followed by you");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};




// export const followUser = async (req, res) => {
//     const id = req.params.id;
//     const { _id } = req.body;
//     if (id === _id) {
//         return res.status(403).json("Access Denied you cant follow your self");
//     } else {
//         try {
//             const followuser = await UserModel.findById(id);
//             const followinguser = await UserModel.findById(_id);
//             if (!followuser.followers.includes(_id)) {
//                 await followuser.updateOne({ $push: { followers: _id } });
//                 await followinguser.updateOne({ $push: { following: id } });
//                 return res.status(200).json("User Followed");
//             } else {
//                 return res.status(403).json("user already followed by you");
//             }
//         } catch (error) {
//             return res.status(500).json(error);
//         }
//     }
// };



// export const unFollowUser = async (req, res) => {
//     const id = req.params.id;
//     const { _id } = req.body;
//     if (id === _id) {
//         res.status(403).json("Access Denied you cant unfollow your self")
//     } else {
//         try {
//             const followuser = await UserModel.findById(id)
//             const followinguser = await UserModel.findById(_id)
//             if (followuser.followers.includes(_id)) {
//                 await followuser.updateOne({ $pull: { followers: _id } })
//                 await followinguser.updateOne({ $pull: { following: id } })
//                 res.status(200).json("User UnFollowed")
//             } else {
//                 res.status(403).json("user is not  followed by you")
//             }

//             res.status(200).json(result)
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }
// }