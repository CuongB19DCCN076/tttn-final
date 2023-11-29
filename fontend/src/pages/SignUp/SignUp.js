import React, { useState } from 'react'
import register from "./../../resource/register.png";

import './style.scss'
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    function validateEmail(email) {
        // Biểu thức chính quy cho kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        // Sử dụng test() để kiểm tra chuỗi
        return emailRegex.test(email);
      }
    const handleSubmit = async () => {
        if(!validateEmail(email)){
            alert("Email chưa đúng định dạng, vui lòng nhập lại!")
            return;
        }
        try{
            setLoading(true);
            const res = await axios.post("https://localhost:7067/api/Member/signup", {email, password});
            setData(res.data.response);
            setLoading(false);
            console.log(res.status)
            if(res.status === 201){
                const res = await axios.post("https://localhost:7067/api/Member/login", {email, password});
                toast.success("Tạo tài khỏan thành công !")
                 await axios.post("https://localhost:7067/api/Cart", {id:"9dcce638-4ffc-4cf5-a350-3ddcc8ccde73",tblUserid: res.data.data.id});
            }else if(res.status === 500){
                toast.error(res.data.userMsg)
            }
        }catch(e){
            toast.error("Tạo tài khỏan thất bại do email đã được đăng ký!")
            setLoading(false);
        }
    }
    return (
        <> {
            loading && <Loading />
        }
            <div className='h-screen w-full bg-[rgba(0,0,0,0.38)] flex justify-center login'>
                <div className='w-[800px] h-[527px] bg-white rounded-[20px] top-20 relative flex overflow-hidden'>
                    <div className='h-full w-[500px] flex justify-center text-sm'>
                        <form className="form">
                            <div className='w-full text-center text-xl font-bold text-[red]'>Đăng ký</div>
                            <div className="flex-column">
                                <label>Email
                                </label>
                            </div>
                            <div className="inputForm ">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input value={email}
                                    onChange={
                                        (e) => handleEmail(e)
                                    }
                                    type="text"
                                    className="input border-none outline-none focus:ring-transparent"
                                    placeholder="Nhập email" />
                            </div>
                            <div className="flex-column">
                                <label>Mật khẩu
                                </label>
                            </div>
                            <div className="inputForm ">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input value={password}
                                    onChange={
                                        (e) => handlePassword(e)
                                    }
                                    type="password"
                                    className="input border-none outline-none focus:ring-transparent"
                                    placeholder="Nhập mật khẩu" />
                            </div>
                            <div className="flex-column">
                                <label>Nhập lại Mật khẩu
                                </label>
                            </div>
                            <div className="inputForm ">
                                <ion-icon name="lock-open-outline"></ion-icon>
                                <input value={confirmPassword}
                                    onChange={
                                        (e) => handleConfirmPassword(e)
                                    }
                                    type="password"
                                    className="input border-none outline-none focus:ring-transparent"
                                    placeholder="Nhập lại mật khẩu" />
                            </div>
                            <div className='w-full h-3'>
                                   {data?.status === "ERR" && <span className='text-xs text-[red]'>{data?.message}</span>}
                            </div>

                            <div className="button-submit bg-colorSearch flex justify-center items-center"
                                onClick={
                                    () =>handleSubmit()
                                }>Đăng ký</div>
                            <p className="p">Bạn đã có tài khoản?
                                <Link to={"/login"}
                                    className="span">Đăng nhập</Link>
                            </p>
                        </form>
                    </div>
                    <div className='h-full w-[300px] bgroud flex items-center justify-center'>
                        <img src={register}
                            alt=''
                            className='h-[203px] object-contain' />
                    </div>
                </div>
            </div>
        </>
    )
}
