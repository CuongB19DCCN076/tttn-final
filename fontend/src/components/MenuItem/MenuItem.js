/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slides/userSlide';
import { toast } from 'react-toastify';
export default function MenuItem({
    nameIcon,
    href,
    nameHref,
    ClassName = "",
    nameUser = ""
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [hovered, setOnHovered] = useState(false);
    const handleLogOut = async (e) => {
        e.preventDefault();
        await dispatch(resetUser());
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        toast.success("Đăng xuất thành công!");
        navigate('/');
    }
    const className = `${ClassName} text-[14px] font-medium leading-[150%] flex relative items-center h-full px-3 py-2 bg-[#fffff] text-colorMenuItem hover:bg-graye5 active:bg-graycb rounded-lg group`
    const PushItem = () => {
        return (
            <div className='w-[240px] h-[132px] bg-white shadow-xl absolute top-10 right-0 z-10 py-[10px] rounded-lg'>
                <Link to={"/user/profile"}
                    className='font-normal block leading-[150%] text-sm text-[#27272a] py-2 px-4 hover:bg-[#e5e5e5] '>
                    Thông tin tài khoản
                </Link>
                {
                    user.isAdmin ? 
                    <Link to={"/admin"}
                        className='font-normal block leading-[150%] text-sm text-[#27272a] py-2 px-4 hover:bg-[#e5e5e5] '>
                       Quản lý hệ thống
                    </Link> 
                    : 
                    <Link to={"/user/ordersuccess"}
                        className='font-normal block leading-[150%] text-sm text-[#27272a] py-2 px-4 hover:bg-[#e5e5e5] '>
                        Đơn hàng của tôi
                    </Link>
                }
                <div onClick={(e) => handleLogOut(e)} className='font-normal block leading-[150%] text-sm text-[#27272a] py-2 px-4 hover:bg-[#e5e5e5] '>
                    Đăng xuất
                </div>
            </div>
        )
    }
    if (user.email !== "" && nameIcon === "person-circle-outline") {
        href = "/user/profile";
    }
    return (
        <NavLink to={href}
            className={className}
            onMouseEnter={
                () => setOnHovered(true)
            }
            onMouseLeave={
                () => setOnHovered(false)
            } >
            {
                user.avatar !== "" && nameHref === "Tài Khoản" ? <img src={
                    user.avatar
                }
                    alt=''
                    className='h-6 w-6 object-contain rounded-full group-hover:text-colorSearch' /> : <ion-icon name={nameIcon}></ion-icon>
            }
            <div className='ms-1 group-hover:text-colorSearch'>
                {
                    nameUser !== "" ? nameUser : nameHref
                }</div>
            <div className={
                hovered ? "block" : "hidden"
            }>
                {
                    nameHref === "Tài Khoản" && user.email !== "" ? <PushItem /> : null
                } </div>
        </NavLink>
    )
}
