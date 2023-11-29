import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function BillingAdmin() {
  const [isReset, setIsReset] = useState(false);
    const [idSelec, setIdSelec] = useState("");
    const [orders, setOrders] = useState();
    const [ordersTemp, setOrdersTemp] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [filtered,setFiltered] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try{
          setIsLoading(true);
          const res = await axios.get("https://localhost:7067/api/Order/getall");
          if(res?.status === 200){
            setOrders(res?.data.data);
            setOrdersTemp(res?.data.data);
            console.log(res?.data.data)
          }
          setIsLoading(false)
        }catch(e){
          console.log(e)
        }
      }
      fetchData()
    },[isReset])
    
    
    const handleModal = (id = "") => {
        document.getElementById("popup-modal").classList.toggle("hidden");
        if (id !== "") {
            setIdSelec(id);
        }
    }
    const handleModalUpdate = (id = "") => {
        setIdSelec(id);
        navigate(`updateOrder/${id}`)
    }
    const deleteOrder = async () => {
      try{
        setIsLoading(true);
        const res = await axios.delete(`https://localhost:7067/api/Order/${idSelec}`);
        if(res?.status === 200){
          setIsReset(isReset);
          toast.success("Xóa hóa đơn thành công");
        }else{
          toast.error("Xóa hóa đơn thất bại");
        }
      }catch(e){
        console.log(e)
        toast.error("Xóa hóa đơn thất bại");
      }
    }
    const handleDelete = () => {
        deleteOrder();
        handleModal();
    }
    // eslint-disable-next-line no-unused-vars
    const handleReset = () => {
        setIsReset(isReset);
    }
    useEffect(() => {
        const temp = ordersTemp?.filter(item => {
                // eslint-disable-next-line eqeqeq
                if(filtered == 0){
                    return true;
                }
                // eslint-disable-next-line eqeqeq
                return item.statusOrder == filtered
        })
        setOrders(temp)
    },[filtered, ordersTemp])
  return (
    <>
            <div className="p-4 sm:ml-64 relative">
               {isLoading && <Loading />}
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
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button onClick={() => handleDelete()} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Có, tôi đồng ý.
                                </button>
                                <button onClick={() => handleModal()} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Không, đóng.</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-grid relative">
                    <div className='flex items-center'>
                        <div className='inline-block w-[300px] text-2xl text-colorSearch'>Danh sách Hóa Đơn
                        </div>
                        <div className='flex justify-between w-full'>
                            <div className='max-w-[500px] w-full h-full border border-whiteBoder rounded-lg flex items-center justify-between overflow-hidden text-colorMenuItem'>
                                <div className='ms-[18px] flex items-center text-sm'>
                                    <ion-icon name="search-outline"></ion-icon>
                                </div>
                                <input type='text' className='w-[84%] h-full px-2 text-[14px] font-normal border-none outline-none focus:ring-transparent  leading-[150%]' placeholder='Nhập sản phẩm cần tìm kiếm' />
                                <button className='text-[14px] font-normal relative leading-[150%] text-center text-colorSearch w-full max-w-[92px] h-[34px] hover:bg-[#cee1ff] before:border-l before:border-whiteBoder before:absolute before:h-6 before:my-auto before:left-0'>Tìm kiếm</button>
                            </div>
                            <select value={filtered} onChange={(e) => setFiltered(e.target.value)} name="type" id="" className='ms-5 text-sm'>
                                <option value="0" className="option">Tất cả</option>
                                <option value="1" className="option">Xử lý</option>
                                <option value="2" className="option">Đang chuẩn bị</option>
                                <option value="3" className="option">Đang vận chuyển</option>
                                <option value="4" className="option">Đã giao</option>
                                <option value="5" className="option">Đã hủy</option>
                            </select>
                            <div className='text-[white] flex items-center text-sm bg-colorSearch py-1 px-3 rounded-xl'>
                                <ion-icon name="person-add-outline"></ion-icon>
                                <span>Thêm</span>
                            </div>
                        </div>

                    </div>
                    <div className='mt-3 overflow-auto p-table'>
                        <table className="w-full border-collapse border-spacing-0 text-[11px] ">
                            <thead>
                                <tr className='sticky top-0 z-20 h-12 border-b border-[#BBB] cursor-pointer bg-[white]'>
                                    <th className="sticky top-0 z-20 px-4 text-center">#</th>
                                    <th className="sticky top-0 z-20 px-4 text-left flex items-center h-12 gap-1">
                                        Mã hóa đơn
                                        <ion-icon name="swap-vertical-outline" size="small"></ion-icon>
                                    </th>
                                    <th className="sticky top-0 z-20 px-4 text-center">Ngày đặt</th>
                                    <th className="sticky top-0 z-20 px-4 text-left flex items-center h-12 gap-1">
                                        Ngày chỉnh sửa
                                        <ion-icon name="swap-vertical-outline" size="small"></ion-icon>
                                    </th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Tổng tiền</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Thanh Toán</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Tình trạng đơn hàng</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Tên người đặt</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Tình trạng vận chuyển</th>
                                    <th className="sticky top-0 z-20 px-4 text-center">Edit</th>
                                </tr>
                            </thead>
                            <tbody> {
                               orders &&  orders.map((item, index) => {
                                    return (
                                        <tr key={index}
                                            className='h-12 border-b border-[#BBB] cursor-pointer'>
                                                 <td className="px-4 text-center ">
                                                    <input type='checkbox' className='h-3 w-3 outline-none'/>
                                                </td>
                                            <td className="px-4 text-left ">
                                                {
                                                    item.idOrder
                                                }</td>
                                            <td className="px-4 text-center ">
                                                {item.createAt}
                                            </td>
                                            <td className="px-4 text-left">
                                            {item.updateAt}
                                            </td>
                                            <td className="px-4 text-right">
                                                {
                                                    new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(item.totalPrice)
                                                }
                                            </td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.methodPayment === 1 ? "Thanh toán khi nhận hàng" : "Đã thanh toán"
                                                }</td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.statusOrder === 1 ? "Chờ xử lý" : item.statusOrder === 2 ? "Đang xử lý" : item.statusOrder === 3 ? "Đang vận chuyển" : item.statusOrder === 4 ? "Đã giao hàng" : "Đã hủy"
                                                }
                                            </td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.email
                                                } </td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.statusShipping
                                                }</td>
                                            <td className="px-4 text-center gap-2 ">
                                                <span className='text-colorSearch' onClick={() => handleModalUpdate(item.idOrder)}>
                                                    <ion-icon name="brush-outline" size="small"></ion-icon>
                                                </span>
                                                <span type="button" className='ms-1 text-[red]' onClick={() => handleModal(item.idOrder)} >
                                                    <ion-icon name="trash-outline" size="small"></ion-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            } </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
  )
}
