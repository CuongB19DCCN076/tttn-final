import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { deleteProductService, getAllProductService } from '../../../services/ProductService';
import UpdateProduct from './UpdateProduct';
import { Link } from 'react-router-dom';

export default function AllProduct() {
    const [isReset, setIsReset] = useState(false);
    const [idSelec, setIdSelec] = useState("");
    const products = useQuery({
        queryKey: ["products", isReset],
        queryFn: () => getAllProductService(),
    })
    
    const handleModal = (id = "") => {
        document.getElementById("popup-modal").classList.toggle("hidden");
        if (id !== "") {
            setIdSelec(id);
        }
    }
    const handleModalUpdate = (id = "") => {
        document.getElementById("authentication-modal").classList.toggle("hidden");
        if (id !== "") {
            setIdSelec(id);
        }
    }
    const mutation = useMutation({
        mutationFn: (id) => deleteProductService(id),
        onSuccess: () => {
            setIsReset(!isReset);
            toast.success("Xóa sản phẩm thành công!")
        }
    })
    const handleDelete = () => {
        mutation.mutate(idSelec);
        handleModal();
    }
    const handleReset = () => {
        setIsReset(!isReset);
    }
    return (
        <>
            <div className="p-4 sm:ml-64 relative">
                <UpdateProduct idProduct={idSelec} parentCallback={handleReset}/>
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
                        <div className='inline-block w-[300px] text-2xl text-colorSearch'>Danh sách sản phẩm
                        </div>
                        <div className='flex justify-between w-full'>
                            <div className='max-w-[500px] w-full h-full border border-whiteBoder rounded-lg flex items-center justify-between overflow-hidden text-colorMenuItem'>
                                <div className='ms-[18px] flex items-center text-sm'>
                                    <ion-icon name="search-outline"></ion-icon>
                                </div>
                                <input type='text' className='w-[84%] h-full px-2 text-[14px] font-normal border-none outline-none focus:ring-transparent  leading-[150%]' placeholder='Nhập sản phẩm cần tìm kiếm' />
                                <button className='text-[14px] font-normal relative leading-[150%] text-center text-colorSearch w-full max-w-[92px] h-[34px] hover:bg-[#cee1ff] before:border-l before:border-whiteBoder before:absolute before:h-6 before:my-auto before:left-0'>Tìm kiếm</button>
                            </div>
                            <select name="type" id="" className='ms-5 text-sm'>
                                <option value="0" className="option">Tất cả</option>
                                <option value="1" className="option">Điện thoại</option>
                            </select>
                            <Link to="/admin/add-product" className='text-[white] flex items-center text-sm bg-colorSearch py-1 px-3 rounded-xl'>
                                <ion-icon name="person-add-outline"></ion-icon>
                                <span>Thêm</span>
                            </Link>
                        </div>
                    </div> 
                    
                    <div className='mt-3 overflow-auto p-table'>
                        <table className="w-full border-collapse border-spacing-0 text-[11px] ">
                            <thead>
                                <tr className='sticky top-0 z-20 h-12 border-b border-[#BBB] cursor-pointer bg-[white]'>
                                    <th className="sticky top-0 z-20 px-4 text-center">#</th>
                                    <th className="sticky top-0 z-20 px-4 text-left flex items-center h-12 gap-1">
                                        Tên sản phẩm
                                        <ion-icon name="swap-vertical-outline" size="small"></ion-icon>
                                    </th>
                                    <th className="sticky top-0 z-20 px-4 text-center">Ảnh</th>
                                    <th className="sticky top-0 z-20 px-4 text-left flex items-center h-12 gap-1">
                                        Trạng thái sản phẩm
                                    </th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Giá</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Số lượng trong kho</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Ram</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Bộ nhớ</th>
                                    <th className="sticky top-0 z-20 px-4 text-right">Đã bán</th>
                                    <th className="sticky top-0 z-20 px-4 text-center">Edit</th>
                                </tr>
                            </thead>
                            <tbody> {
                                products?.data?.data.map((item, index) => {
                                    return (
                                        <tr key={index}
                                            className='h-12 border-b border-[#BBB] cursor-pointer'>
                                                 <td className="px-4 text-center ">
                                                    <input type='checkbox' className='h-3 w-3 outline-none'/>
                                                </td>
                                            <td className="px-4 text-left ">
                                                {
                                                    item.name
                                                }</td>
                                            <td className="px-4 text-center flex justify-center items-center">
                                                <img alt=''
                                                    src={
                                                        item.image
                                                    }
                                                    className='h-10 w-10 mt-[3px]' />
                                            </td>
                                            <td className="px-4 text-left">
                                                {
                                                    item.status === 1 ? "Đang bán" : item.status === 2 ? "Sắp ra mắt" : "Ngừng bán"
                                                }</td>
                                            <td className="px-4 text-right">
                                                {
                                                    new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(item.price)
                                                }
                                            </td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.quantityInStock
                                                }</td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.ram
                                                }
                                            </td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.memory
                                                }</td>
                                            <td className="px-4 text-right">
                                                {
                                                    item.quantitySold
                                                }</td>
                                            <td className="px-4 text-center gap-2 ">
                                                <span className='text-colorSearch' onClick={() => handleModalUpdate(item.id)}>
                                                    <ion-icon name="brush-outline" size="small"></ion-icon>
                                                </span>
                                                <span type="button" className='ms-1 text-[red]' onClick={() => handleModal(item.id)} >
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
