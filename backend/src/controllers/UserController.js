import UserService from "../services/UserService.js"
import { refreshTokenJwtService } from "../services/jwtService.js"

const UserController = {
    createUser: async (req, res) => {
        try {
            const {
                email,
                password,
                confirmPassword,
            } = req.body
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            if (!email || !password || !confirmPassword) {
                return res.status(401).json({status: 'ERR', message: 'Trường nhập không được để trống'})
            } else if (! isCheckEmail) {
                return res.status(401).json({status: 'ERR', message: 'Email không đúng định dạng'})
            } else if (password !== confirmPassword) {
                return res.status(401).json({status: 'ERR', message: 'Mật khẩu nhập lại không khớp với mật khẩu'})
            }
            const response = await UserService.createUserService(req.body);
            return res.status(201).json({response})
        } catch (e) {
            return res.status(404).json({message: e})
        }
    },
    loginUser: async (req, res) => {
        try{
            const {email, password} = req.body;
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            if (!email || !password ) {
                return res.status(401).json({status: 'ERR', message: 'Trường nhập không được để trống'})
            } else if (! isCheckEmail) {
                return res.status(401).json({status: 'ERR', message: 'Email không đúng định dạng'})
            }
            const response = await UserService.loginUserService(req.body);
            const { refresh_token, ...newReponse } = response
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
            })
            return res.status(200).json({...newReponse, refresh_token})
        } catch(e){
            return res.status(404).json({message:e})
        }
    },
     updateUser: async (req, res) => {
        try {
            const userId = req.params.id
            const data = req.body
            if (!userId) {
                return res.status(401).json({
                    status: 'ERR',
                    message: 'User không được để trống!'
                })
            }
            const response = await UserService.updateUserService(userId, data)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id
            if (!userId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await UserService.deleteUserService(userId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    deleteMany: async (req, res) => {
        try {
            const ids = req.body.ids
            if (!ids) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The ids is required'
                })
            }
            const response = await UserService.deleteManyUserService(ids)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    getAllUser: async (req, res) => {
        try {
            const response = await UserService.getAllUserService()
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    getDetailsUser: async (req, res) => {
        try {
            const userId = req.params.id
            if (!userId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await UserService.getDetailsUserService(userId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    refreshToken: async (req, res) => {
        try {
            let token = req.headers.token.split(' ')[1]
            if (!token) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The token is required'
                })
            }
            const response = await refreshTokenJwtService(token)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    logoutUser: async (req, res) => {
        try {
            res.clearCookie('refresh_token')
            return res.status(200).json({
                status: 'OK',
                message: 'Logout successfully'
            })
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }
    
}

export default UserController;
