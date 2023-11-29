import React, { useState } from 'react'
import "./style.scss"
import { useSelector } from 'react-redux';
import userImg from "./../../resource/user.png";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../fisebase';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
// import { updateUser } from '../../redux/slides/userSlide';
export default function Profile() {
    let user = useSelector(state => {
        return state.user
    })
    console.log(user);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])


    // const dispatch = useDispatch();
    const handleName = (value) => {
        setName(value)
    }
    const handlePhone = (value) => {
        setPhone(value)
    }
    const handleAddress = (value) => {
        setAddress(value)
    }
    const handleAvatar = (value) => {
        if (value == null)
            return;
        const imageRef = ref(storage, `images/${user.id}`);
        uploadBytes(imageRef, value).then((snapshot) => {
            getDownloadURL(ref(storage, `images/${user?.id}`))
                .then((url) => {
                    setAvatar(url);
                })
        });
    }
    const uploadFile = async () => {
        try {
            const res = await axios.put(`https://localhost:7067/api/Member/${user.id}`, {
                name,
                email,
                password: user.password,
                phone,
                address,
                avatar
            })
            console.log(res);
        } catch (e) {
            console.log(e)
        }
        toast.success("Cập nhật thành công!")
    };
    console.log(user);
    return (
        <div className='w-full max-w-[993px] h-full max-h-[568px] bg-[#fff] rounded-sm px-[30px] flex'>
            <div>

                <div >
                    <div className='py-[18px]'>
                        <div className='font-medium text-[#333] text-lg'>
                            Hồ Sơ Của Tôi
                        </div>
                        <div className='text-[#555] text-sm'>
                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-[#f1f1f1]'></div>
                    <div className='flex pt-[30px]'>
                        <div className='pe-[50px]'>
                            <div className='w-full flex items-center'>
                                <div className='w-[150px]  h-[70px] pb-[30px] flex items-center '>
                                    <span className='w-full text-right text-[#555555cc] text-sm'>Tên</span>
                                </div>
                                <div className='w-[453px] h-[70px] pb-[30px] ps-5'>
                                    <input type='text'
                                        value={name}
                                        onChange={
                                            (e) => handleName(e.target.value)
                                        }
                                        className='p-3 border text-xs outline-colorSearch border-[#464545cc] w-full' />
                                </div>
                            </div>
                            <div className='w-full flex items-center'>
                                <div className='w-[150px]  h-[70px] pb-[30px] flex items-center '>
                                    <span className='w-full text-right text-[#555555cc] text-sm'>Email</span>
                                </div>
                                <div className='w-[453px] h-[70px] pb-[30px] ps-5'>
                                    <input type='text'
                                        value={email}
                                        className='p-3 border text-xs outline-colorSearch border-[#464545cc] w-full' />
                                </div>
                            </div>
                            <div className='w-full flex items-center'>
                                <div className='w-[150px]  h-[70px] pb-[30px] flex items-center '>
                                    <span className='w-full text-right text-[#555555cc] text-sm'>Số điện thoại</span>
                                </div>
                                <div className='w-[453px] h-[70px] pb-[30px] ps-5'>
                                    <input type='text'
                                        value={phone}
                                        onChange={
                                            (e) => handlePhone(e.target.value)
                                        }
                                        className='p-3 border text-xs outline-colorSearch border-[#464545cc] w-full' />
                                </div>
                            </div>
                            <div className='w-full flex items-center'>
                                <div className='w-[150px]  h-[70px] pb-[30px] flex items-center '>
                                    <span className='w-full text-right text-[#555555cc] text-sm'>Địa chỉ</span>
                                </div>
                                <div className='w-[453px] h-[70px] pb-[30px] ps-5'>
                                    <input type='text'
                                        value={address}
                                        onChange={
                                            (e) => handleAddress(e.target.value)
                                        }
                                        className='p-3 border text-xs outline-colorSearch border-[#464545cc] w-full' />
                                </div>
                            </div>
                        </div>
                        <div className='h-[232px] w-[280px] border-l border-[#f1f1f1] flex justify-center items-center flex-col'>
                            <div className='w-[100px] h-[100px] overflow-hidden'>
                                {
                                    avatar !== "" ? <img src={avatar}
                                        alt=''
                                        className='h-full w-[100px] rounded-full overflow-hidden' /> : <img src={userImg}
                                            alt=''
                                            className='h-full w-[100px] rounded-full overflow-hidden' />
                                }
                            </div>
                            <input type="file"
                                onChange={
                                    (event) => {
                                        handleAvatar(event.target.files[0])
                                    }
                                }
                                className='hidden'
                                id="file" />
                            <label for="file" className='text-[#555] text-sm px-5 h-10 border flex items-center border-[#00000017] mt-5 hover:bg-[#f7f7f7]'>
                                Chọn ảnh
                            </label>
                            <div className='mt-3 text-[#999] text-sm'>
                                <div>Dụng lượng file tối đa 1 MB</div>
                                <div>Định dạng:.JPEG, .PNG</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[453px] h-[70px] pb-[30px] ps-5'>
                        <button onClick={
                            () => uploadFile()
                        }
                            className='text-[white] ms-[150px] rounded-sm text-sm px-5 h-10 border flex items-center bg-colorSearch border-[#00000017] mt-5 hover:bg-[#3c3888]'>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
