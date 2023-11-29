import jwt from "jsonwebtoken";

export const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({...payload}, "B19dccn076", {expiresIn: '3h'});
    return access_token;
}

export const genneralRefeshToken = async (payload) => {
    const refresh_token = jwt.sign({...payload}, "Phuongxinhgai", {expiresIn: "2d"})
    return refresh_token;
}

export const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token, "Phuongxinhgai", async (err, user) => {
                if(err){
                    resolve({
                        status: "ERR",
                        message: "Refesh_token đã hết hạn"
                    })
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAmin
                })
                resolve({
                    status: "OK",
                    message: "SUCESS",
                    access_token
                })
            })
        }catch(e){
            reject(e)
        }
    })
}