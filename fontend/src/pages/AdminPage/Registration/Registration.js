import React, { useEffect, useState } from 'react'
import Loading from '../../../components/Loading/Loading'
import axios from 'axios';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

export default function Registration() {
    const [isLoading, setIsLoading] = useState(false)
    const [isReset, setIsReset] = useState(false);
    const [idSelec, setIdSelec] = useState("");
    const [regis, setRegis] = useState("");
    const [list, setList] = useState();
    const [isSelect, setIsSelect] = useState(3);
    useEffect(() => {
        const fetchData = async () => {
            try{
                setIsLoading(true);
                const res = await axios.get(`https://localhost:7067/api/Registrationproduct/getAllFilter/${isSelect}`);
                if(res?.status === 200){
                    setList(res?.data?.data);
                    console.log(res?.data?.data);
                }
                setIsLoading(false);
            }catch(e){
                console.log(e)
            }
        }
        fetchData();
    },[isReset,isSelect])
   
    const handleModal = (id = "") => {
        document.getElementById("popup-modal").classList.toggle("hidden");
        if (id !== "") {
            setIdSelec(id);
        }
    }
    const handleModalSendClose = (id = "", item = "") => {
        document.getElementById("authentication-modal").classList.toggle("hidden");
        if (id !== "") {
            setIdSelec(id);
            setRegis(item);
        }
    }
    const handleDelete = async () => {
        try{
            const res = await axios.delete(`https://localhost:7067/api/Registrationproduct/${idSelec}`);
            console.log(res)
            if(res?.status === 200){
                toast.success("Xóa thành công người dùng!");
                setIsReset(!isReset);
            }else{
                toast.error("Xóa thất bại người dùng!");
            }
        }catch(e){
            console.log(e)
        }
        handleModal();
    }
    const handleModalSend = () => {
        document.getElementById("authentication-modal").classList.toggle("hidden");
        try{
            emailjs.send('service_ys3yzj4', 'template_8laq8c4', {
                to_name: regis.nameRe,
                from_name: "NHCShop",
            message: `Sản phẩm ${regis.name} đã ra mắt và có bán tại cửa hàng`,
            to_email: regis.email,
        }, 'ojLajjZ5-Vmd0dT9S')
            .then( async (result) => {
                const res = await axios.put(`https://localhost:7067/api/Registrationproduct/${idSelec}`, {...regis, statusRP: 2});
                if(res?.status === 200){
                    toast.success("Gửi email thành công!");
                    setIsReset(!isReset);
                }else{
                    toast.error("Lỗi khi gửi email!");
                }
            })
            .catch((error) => {
                toast.error("Lỗi khi gửi email!");
            });
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:ml-64 pt-10 px-5">
            {isLoading && <Loading />}
            <div id="authentication-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full mx-auto max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => handleModalSendClose()} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <ion-icon name="close-outline"></ion-icon>
                            </button>
                            <div className="p-6 text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn có muốn gửi email thông báo tới người này</h3>
                                <button onClick={() => handleModalSend()} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Có, tôi đồng ý.
                                </button>
                                <button onClick={() => handleModalSendClose()} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Không, đóng.</button>
                            </div>
                        </div>
                    </div>
                </div>
            <div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full mx-auto max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => handleModal()} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <ion-icon name="close-outline"></ion-icon>
                            </button>
                            <div className="p-6 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn có chắc muốn xóa thông tin này?</h3>
                                <button onClick={() => handleDelete()} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Có, tôi đồng ý.
                                </button>
                                <button onClick={() => handleModal()} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Không, đóng.</button>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="flex flex-colum sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div>
                    <select value={isSelect} onChange={(e) => setIsSelect(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="1">Chưa gửi</option>
                        <option value="2">Đã gửi</option>
                        <option value="3">Tất cả</option>
                    </select>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            STT
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Tên sản phẩm
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Tên người ĐK
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            SĐT
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Lý do ĐK
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Đã gửi thông tin
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Gửi email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map((item, index) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4 text-left">
                                    {item.nameRe}
                                </td>
                                <td className="px-6 py-4 text-left">
                                    {item.phone}
                                </td>
                                <td className="px-6 py-4 text-left">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {item.reason}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {item.statusRP === 2 ? "Đã gửi" : "Chưa gửi"}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className='text-colorSearch' onClick={() => handleModalSendClose(item.id, item)}>
                                        <ion-icon name="paper-plane-outline" size="small"></ion-icon>
                                    </span>
                                    <span type="button" className='ms-1 text-[red]' onClick={() => handleModal(item.id)} >
                                        <ion-icon name="trash-outline" size="small"></ion-icon>
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
