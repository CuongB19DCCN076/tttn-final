import React, { useState } from 'react'
import register from "./../../resource/register.png";
import fb from "./../../resource/facebook.png";
import gg from "./../../resource/gg.webp";
import './style.scss'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import axios from 'axios';
export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [data,setData] = useState();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        try{    
            setIsLoading(true);
            const res = await axios.post("https://localhost:7067/api/Member/login", {email, password});
            const isAdmin = await axios.get(`https://localhost:7067/api/Member/check/${res.data?.data.id}`)
            const idCartData = await axios.get(`https://localhost:7067/api/Cart/getCart/${res.data?.data.id}`)
            const idCart =  idCartData?.data?.data?.id;
            setIsLoading(false);
            setData(res.data?.data);
            if(res?.status === 200){
                navigate("/");
                dispatch(updateUser({...res.data?.data, isAdmin, idCart}));
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
            }
        }catch(e) { 
            console.log(e)
        }
    }
    return (
        <>
            {isLoading && <Loading />}
            <div className='h-screen w-full bg-[rgba(0,0,0,0.38)] flex justify-center login'>
                <div className='w-[800px] h-[527px] bg-white rounded-[20px] top-20 relative flex overflow-hidden'>
                    <div className='h-full w-[500px] flex justify-center text-sm'>
                        <form className="form">
                            <div className='w-full text-center text-xl font-bold text-[red]'>Đăng nhập</div>
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
                            <div className='w-full h-3 flex items-start'>
                            {data?.status === "ERR" ? <span className='text-xs text-[red]'>{data?.message}</span> : <span className='text-xs text-[red]'>{data?.message}</span>}
                            </div>
                            <div className="flex-row">
                                <div className='flex items-center'>
                                    <input type="checkbox" />
                                    <label>Ghi nhớ
                                    </label>
                                </div>
                                <span className="span">Quên mật khẩu?</span>
                            </div>
                            <div className="button-submit bg-colorSearch flex items-center justify-center"
                                onClick={
                                    () => handleSubmit()
                                }>Đăng nhập</div>
                            <p className="p">Bạn chưa có tài khoản?
                                <Link to={"/signup"}
                                    className="span">Đăng ký</Link>
                            </p>
                            <p className="p line">Hoặc với</p>

                            <div className="flex-row">
                                <button className="btn google">
                                    <img src={gg}
                                        alt='fblogo'
                                        className='w-8 h-8' />
                                    Google
                                </button>
                                <button className="btn apple">
                                    <img src={fb}
                                        alt='fblogo'
                                        className='w-8 h-8' />
                                    Facebook
                                </button>
                            </div>
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
