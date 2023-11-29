import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../fisebase';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function AddUser() {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const handleImage = (e) => {
        const imageTemp = e.target.files[0];
        setImage(imageTemp);
    }

    const handleSubmit = () => {
        const dataTemp = {
            name,
            email,
            phone,
            address,
            city,
            password,
            confirmPassword: password,
            isAdmin: isAdmin === "0" ? true : false 
        }
        if (image === "") {
            toast.warning("vUI LÒNG CHỌN 1 ẢNH!");
            return;
        }

        const imageRef = ref(storage, `images/` + email );
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(ref(storage, `images/` + email )).then(async (url) => {
                await axios.post("http://localhost:3001/api/users/sign-up", { ...dataTemp, avatar: url }).then((data) => {
                    if (data?.data.status === "ERR") {
                        toast.error(data?.data.message);
                    } else {
                        toast.success(data?.data.message);
                    }
                }).catch(function (error) {
                    // xử trí khi bị lỗi
                    console.log(error);
                })
            })
        });
    }
    return (
        <div className="py-4 px-52 sm:ml-64">
            <div className='text-3xl text-colorSearch font-semibold mb-2'>
                THÊM NGƯỜI DÙNG
            </div>
            <form>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_text" id="floating_text"
                        onChange={
                            (e) => setName(e.target.value)
                        }
                        value={name}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required />
                    <label for="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên người dùng</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="floating_first_name"
                            onChange={
                                (e) => setEmail(e.target.value)
                            }
                            value={email}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="_name" id="_name"
                            onChange={
                                (e) => setPhone(e.target.value)
                            }
                            value={phone}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Số điện thoại</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="_phone" id="_phone"
                            onChange={
                                (e) => setPassword(e.target.value)
                            }
                            value={password}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label for="_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mật khẩu</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <select value={isAdmin}
                            onChange={
                                (e) => setIsAdmin(e.target.value)
                            }
                            id=""
                            className=' text-sm'>
                            <option value="0" className="option">Quản trị viên</option>
                            <option value="1" className="option">Người dùng</option>
                        </select>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_text" id="floating_text"
                        onChange={
                            (e) => setAddress(e.target.value)
                        }
                        value={address}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                         />
                    <label for="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Địa chỉ</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="repeat_text" id="_repeat_text"
                        onChange={
                            (e) => setCity(e.target.value)
                        }
                        value={city}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                         />
                    <label for="_repeat_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thành phố</label>
                </div>
                <div className='h-96 w-full border border-gray-300 mb-6 addImage relative flex justify-center'>
                    <input type='file' id='addImage'
                        onChange={
                            (e) => handleImage(e)
                        }
                        className='hidden' /> {
                        image && <img src={
                            URL.createObjectURL(image)
                        }
                            alt=''
                            className='h-full max-h-96 object-fill' />
                    }
                    <label for="addImage" className='h-full w-full block cursor-pointer absolute top-0 left-0 z-20 '></label>
                </div>
                <button onClick={
                    () => handleSubmit()
                }
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}
