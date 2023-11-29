import React from 'react'
import {Outlet} from 'react-router-dom'

import ItemNavProfile from '../../components/ItemNavProfile/ItemNavProfile';
import {useSelector} from 'react-redux';
import userImg from "./../../resource/user.png";

export default function User() {
    let user = useSelector(state => {
        return state.user
    })
    return (
        <div className='w-full profile bg-grayf5 min-h-[638px] h-max'>
            <div className='w-full max-w-[1200px] py-5 mx-auto h-max flex justify-between'>
                <div className='h-full w-[180px]'>
                    <div className='w-full h-20 py-4 flex'>
                        <div className='w-12 overflow-hidden h-12 mr-4'>
                            {
                            user.avatar === "" ? <img src={userImg}
                                className='h-full object-contain rounded-full'
                                alt=''/> : <img src={
                                    user.avatar
                                }
                                className='h-full object-contain rounded-full'
                                alt=''/>
                            }
                        </div>
                        <div className='h-full'>
                            <div className='font-semibold text-[#333] text-sm'>
                                {
                                user.name
                            } </div>
                            <div className='text-[#888] text-sm mt-1'>
                                <ion-icon name="pencil-outline" size="small"></ion-icon>
                                <span>Sửa hồ sơ</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mt-7'>
                        <ItemNavProfile iconImage={"person-outline"}
                            title={"Tài khoản của tôi"}
                            hrefPa='/user/profile'
                            listChildren={
                                [{name:"Hồ sơ", path: "/user/profile"}, {name:"Đổi mật khẩu", path: "/user/profile"}]
                            }/>
                        <ItemNavProfile iconImage={"newspaper-outline"}
                            title={"Đơn mua"}
                            hrefPa='/user/ordersuccess'
                            listChildren={
                                [{name:"Đơn hàng đang đặt", path: "ordersuccess"},{name:"Đơn hàng đã hủy", path: "orderfail"}, ]
                            }/>
                    </div>
                </div>
                <Outlet/>
                
            </div>
        </div>
    )
}
