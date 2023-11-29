import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import { genneralAccessToken, genneralRefeshToken } from "./jwtService.js";

const UserService = {
    createUserService: (newUser) => {
        return new Promise(async (resolve, reject) => {
            const {
                email
            } = newUser
            try {
                const checkUser = await User.findOne({email: email})
                if (checkUser !== null) {
                    resolve({status: 'ERR', message: 'Email đã tồn tại'})
                }
                const createdUser = await User.create(newUser)
                if (createdUser) {
                    resolve({status: 'OK', message: 'SUCCESS', data: createdUser})
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    loginUserService: (user) => {
        return new Promise(async (resolve, reject) => {
            const {email, password} = user;
            try {
                const checkUser = await User.findOne({email: email});
                if (checkUser === null) {
                    resolve({status: "ERR", message: "Tài khoản không tồn tại"})
                }

                const comparePassword = (password === checkUser.password);

                if (! comparePassword) {
                    resolve({status: 'ERR', message: 'Mật khẩu hoặc email không chính xác'})
                }
                const access_token = await genneralAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await genneralRefeshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token,
                    refresh_token
                })
            } catch (e) {
                reject(e)
            }
        })

    },
    updateUserService: (userId, data) => {
        return new Promise(async (resolve, reject) => {
            try{
                const checkUser = await User.findById({_id:userId});
                if(checkUser === null){
                    return resolve({
                        status: "ERR",
                        message: "Người dùng không tồn tại"
                    })
                }
                const userUpdate = await User.findByIdAndUpdate(userId, data, {new: true})
                resolve({
                    status: "OK",
                    message: "Cập nhật người dùng thành công!",
                    userUpdate
                })
            }catch(e){
                reject(e)
            }
        })
    },
    deleteUserService: (userId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const checkUser = await User.findById({_id:userId});
                if(checkUser === null){
                    return resolve({
                        status: "ERR",
                        message: "Người dùng không tồn tại"
                    })
                }
                const userUpdate = await User.findByIdAndDelete(userId)
                resolve({
                    status: "OK",
                    message: "Xóa người dùng thành công!",
                })
            }catch(e){
                reject(e);
            }
        })
    },
    deleteManyUserService: (ids) => {
        return new Promise(async (resolve, reject) => {
            try{
                await User.deleteMany(ids);
                resolve({
                    status: "OK",
                    message: "Xóa người dùng thành công!",
                })
            }catch(e){
                reject(e);
            }
        })
    },
    getDetailsUserService: (userId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const checkUser = await User.findById({_id:userId});
                if(checkUser === null){
                    return resolve({
                        status: "ERR",
                        message: "Người dùng không tồn tại"
                    })
                }
                resolve({
                    status: "OK",
                    message: "Lấy thông tin người dùng thành công!",
                    data: checkUser
                })
            }catch(e){
                reject(e);
            }
        })
    },
    getAllUserService: () => {
        return new Promise(async (resolve, reject) => {
            try{
                const allUser = await User.find().sort({createdAt: -1, updatedAt: -1});
                resolve({
                    status: "Ok",
                    message: "Lấy thông tin người dùng thành công!",
                    data: allUser
                })
            }catch(e){
                reject(e)
            }
        })
    }
}

export default UserService;
