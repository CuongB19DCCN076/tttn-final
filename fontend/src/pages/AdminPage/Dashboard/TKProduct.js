import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../../components/Loading/Loading'
import listColor from '../../../colorChart/colorChart';
import { Bar } from 'react-chartjs-2';

export default function TKProduct() {
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    const [isSelect, setIsSelect] = useState(5)
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`https://localhost:7067/api/OrderProduct/getAllFilter/${isSelect}`);
                if (res?.status === 200) {
                    setData(res?.data?.data);
                }
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [isSelect])
    const dataa = {
        labels: data?.map(e => e?.name),
        datasets: [
            {
                label: 'Doanh thu',
                data: data?.map(e => e.totalPrice),
                fill: false,
                borderColor: '#000000a6',
                backgroundColor: shuffleArray(listColor)
            },
        ]
    }
    const dataa2 = {
        labels: data?.map(e => e?.name),
        datasets: [
            {
                label: 'Số lượng',
                data: data?.map(e => e.totalQuantity),
                fill: false,
                borderColor: '#000000a6',
                backgroundColor: listColor
            },
        ]
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:ml-64 pt-10 px-5">
            {isLoading && <Loading />}
            <div className="flex flex-colum sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div>
                    <select value={isSelect} onChange={(e) => setIsSelect(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="1">Hôm nay</option>
                        <option value="2">7 ngày trước</option>
                        <option value="3">30 ngày trước</option>
                        <option value="4">1 năm trước</option>
                        <option value="5">Tất cả</option>
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
                            Ram
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Bộ nhớ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Màu
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Số lượng
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                            Doanh thu
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    {index+1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4 text-left">
                                    {item.ram}
                                </td>
                                <td className="px-6 py-4 text-left">
                                {item.memory}
                                </td>
                                <td className="px-6 py-4 text-left">
                                {item.color}
                                </td>
                                <td className="px-6 py-4 text-center">
                                {item.totalQuantity}
                                </td>
                                <td className="px-6 py-4 text-right">
                                {
                                    new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(item.totalPrice)
                                }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Bar data={dataa} className='my-5'/>
            <Bar data={dataa2} className='my-5'/>
        </div>

    )
}
