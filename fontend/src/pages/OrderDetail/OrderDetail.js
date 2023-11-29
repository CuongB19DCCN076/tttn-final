import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading';
import { useLocation } from 'react-router-dom';

export default function OrderDetail() {
    const id = useLocation().pathname.split("/")[3];
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState();
    const [listSp, setListSp] = useState();
    let user = useSelector(state => {
        return state.user
    })
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`https://localhost:7067/api/Order/${id}`);
                const res1 = await axios.get(`https://localhost:7067/api/OrderProduct/getAllByIdOrder/${id}`);
                if (res?.status === 200 && res1?.status === 200) {
                    setOrder(res.data.data);
                    setListSp(res1.data.data);
                    console.log(res1.data.data)
                }
            } catch (e) {
                console.log(e)
            }
            setIsLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='h-max'>
            {isLoading && <Loading />}
            <div className="h-max px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className=" flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Đơn hàng 1</p>
                            <div className='h-10 w-full p-2 my-3'>
                                <div className='border border-b-2 rounded-md w-full h-3'>
                                    <div className={`${order?.statusOrder === 1 ? "w-1/12 " : order?.statusOrder === 2 ? "w-2/5 " : order?.statusOrder === 3 ? "w-3/5" : "w-full"} h-full bg-colorSearch border border-b rounded-md`}></div>
                                </div>
                                <div className=' w-full h-3 mt-2 flex text-sm'>
                                    <div className='h-full w-2/5  text-start'>Đã đặt hàng</div>
                                    <div className='h-full w-1/6  text-start'>Xử lý</div>
                                    <div className='h-full w-1/5  text-start'>Đang giao hàng</div>
                                    <div className='h-full w-2/6  text-end'>Đã giao hàng</div>
                                </div>
                            </div>
                            {listSp && listSp.map((item, index) => {
                                return (
                                    <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                            <img className="w-full hidden md:block" src={item.image} alt="dress" />
                                            <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                        </div>
                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.name}</h3>
                                                <div className="flex justify-start items-start flex-col space-y-2">
                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                        <span className="dark:text-gray-400 text-gray-300">Ram:
                                                        </span>
                                                        {item.ram}</p>
                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                        <span className="dark:text-gray-400 text-gray-300">Bộ nhớ:
                                                        </span>
                                                        {item.memory}</p>
                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                        <span className="dark:text-gray-400 text-gray-300">Màu:
                                                        </span>
                                                        {item.color}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                <p className="text-base dark:text-white xl:text-lg leading-6">{
                                                    new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(String(item.priceByOne))
                                                }

                                                </p>
                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{item.quantity}</p>
                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{
                                                    new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(String(item.totalPriceOrder))
                                                }</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Tóm tắt</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-base dark:text-white leading-4 text-gray-800">Tổng giá sp</p>
                                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{
                                            new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(String(order?.totalPrice-50000))
                                        }</p>
                                    </div>

                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base dark:text-white leading-4 text-gray-800">Vận chuyển</p>
                                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{
                                            new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(String(50000))
                                        }</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Tổng tiền</p>
                                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{
                                        new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(String(order?.totalPrice))
                                    }</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Vận chuyển</h3>
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                        <div className="w-8 h-8">
                                            <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                        </div>
                                        <div className="flex flex-col justify-start items-center">
                                            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Giao hàng Tiết Kiệm<br /><span className="font-normal">Giao trong khoảng 24h</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">$8.00</p>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">Xem thông tin vận chuyển</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Khách hàng</h3>
                        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <img src={user?.avatar} className='w-10 h-10' alt="avatar" />
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{user?.name}</p>
                                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">10 Đơn hàng trước đây</p>
                                    </div>
                                </div>

                                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 ">{user?.email}</p>
                                </div>
                            </div>
                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Thông tin giao hàng</p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Người nhận: <span className='font-medium'>{order?.nameShipping}</span></p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">sdt: <span className='font-medium'>{order?.phoneShipping}</span></p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Địa chỉ: <span className='font-medium'>{order?.addressShipping}</span></p>
                                    </div>
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Phương thức thanh toán</p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order?.methodPayment === 1 ? "Thanh toán khi nhận hàng" : "Đã thanh toán"}</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-center items-center md:justify-start md:items-start mt-3">
                                    <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Chỉnh sửa đơn hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
