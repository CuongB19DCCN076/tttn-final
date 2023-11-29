import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { storage } from '../../../fisebase';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function UpdateUser({ idUser, parentCallback }) {
    const user = useSelector(state => state.user);
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [isChangedImage, setIsChangedImage] = useState(false);
    const handleModalUpdate = () => {
        document.getElementById("authentication-modal").classList.toggle("hidden");
    }
    const handleImage = (e) => {
        const imageTemp = e.target.files[0];
        setAvatar(imageTemp);
        setIsChangedImage(true);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`https://localhost:7067/api/Member/${idUser}`)
                setAvatar(data?.data.data.avatar);
                setName(data?.data.data.name);
                setPassword(data?.data.data.password);
                setEmail(data?.data.data.email);
                setPhone(data?.data.data.phone);
                setAddress(data?.data.data.address);
            } catch (e) {
                toast.error(e);
            }
        }
        fetchData()
    }, [idUser, user?.access_token])

    const handleSubmit = () => {
        const dataTemp = {
            name: name !== null ? name : "",
            email,
            phone: phone !== null ? phone : "",
            address: address !== null ? address : "",
            password,
        }
        if (avatar === "") {
            toast.warning("vUI LÒNG CHỌN 1 ẢNH!");
            return;
        }
        if (isChangedImage) {
            const imageRef = ref(storage, `images/` + email);
            uploadBytes(imageRef, avatar).then((snapshot) => {
                getDownloadURL(ref(storage, `images/` + email)).then(async (url) => {
                    await axios.put(`https://localhost:7067/api/Member/${idUser}`, { ...dataTemp, avatar: url }).then((data) => {
                        if (data?.status === 200) {
                            toast.success("Cập nhật thành công!");
                            parentCallback();
                            handleModalUpdate();
                        } else {
                            toast.error("Cập nhật thất bại!");
                        }
                    }).catch(function (error) {
                        // xử trí khi bị lỗi
                        console.log(error);
                    })
                })
            });
        } else {
            const fetchData = async () => {
                await axios.put(`https://localhost:7067/api/Member/${idUser}`, { ...dataTemp, avatar: avatar }).then((data) => {
                if (data?.status === 200) {
                        toast.success("Cập nhật thành công!");
                        parentCallback();
                        handleModalUpdate();
                    } else {
                        toast.error("Cập nhật thất bại!");
                    }
                }).catch(function (error) {
                    // xử trí khi bị lỗi
                    console.log(error);
                })
            }
            fetchData();
        }
    }
    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="absolute top-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto hiddenScroll md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full mx-auto max-w-3xl max-h-full shadow-2xl">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={() => handleModalUpdate()} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-colorSearch dark:text-white">CHỈNH SỬA NGƯỜI DÙNG</h3>

                        <form>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_text" id="floating_text"
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                    value={name}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
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
                                    />
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
                            <div className='h-96 w-full border border-gray-300 mb-6 addImage relative flex justify-center'>
                                <input type='file' id='addImage'
                                    onChange={
                                        (e) => handleImage(e)
                                    }
                                    className='hidden' />
                                {JSON.stringify(avatar) === '{}' ?
                                    <img src={URL.createObjectURL(avatar)} alt='' className='h-full max-h-96 object-fill' />
                                    :
                                    <img src={avatar} alt='' className='h-full max-h-96 object-fill' />}
                                <label for="addImage" className='h-full w-full block cursor-pointer absolute top-0 left-0 z-20 '></label>
                            </div>
                            <button onClick={
                                () => handleSubmit()
                            }
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
