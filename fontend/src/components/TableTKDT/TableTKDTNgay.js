import React from 'react'
import { Bar, Doughnut, PolarArea } from 'react-chartjs-2'

export default function TableTKDTNgay({ dataNgay,listColor,valueChart }) {
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      const shuffledArray = shuffleArray(listColor);
    const dataa = {
        labels: dataNgay?.map(e => e?.ngay.split("T")[0]),
        datasets: [
            {
                label: 'Doanh thu theo ngày',
                data: dataNgay?.map(e => e.doanh_thu),
                fill: false,
                borderColor: '#000000a6',
                backgroundColor: shuffledArray
            },
        ]
    }
    return (
        <div className='my-5 '>
            <div className='my-5 text-center text-colorSearch text-4xl'>Thống kê doanh thu theo ngày</div>
            <table className="w-1/2 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            STT
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Ngày
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                            Doanh thu
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataNgay && dataNgay.map((item, index) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left">
                                    {item?.ngay.split("T")[0]}
                                </th>
                                <td className="px-6 py-4 text-right">
                                    {
                                        new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(item?.doanh_thu)
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='max-h-96 flex justify-center'>
            {dataNgay?.length !== 0 && valueChart === 1 ? <Bar data={dataa}/> : valueChart === 2 ? <Doughnut data={dataa}/> : <PolarArea data={dataa} />}
            </div>
        </div>
    )
}
