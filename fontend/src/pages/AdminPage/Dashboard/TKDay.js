import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../../components/Loading/Loading'
import TableTKDTTG from '../../../components/TableTKDT/TableTKDTTG';
import TableTKDTTuan from '../../../components/TableTKDT/TableTKDTTuan';
import TableTKDTNgay from '../../../components/TableTKDT/TableTKDTNgay';
import listColor from '../../../colorChart/colorChart';

export default function TKDay() {
  const [valueChecked, setValueChecked] = useState(1);
  const [TKDTTG, setTKDTTG] = useState();
  const [TKDTTuan, setTKDTTuan] = useState();
  const [TKDTNgay, setTKDTNgay] = useState();
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dataTG = await axios.get(`https://localhost:7067/api/Order/getTKDTTG`);
        const dataTuan = await axios.get(`https://localhost:7067/api/Order/getTKDTTuan`);
        const dataNgay = await axios.get(`https://localhost:7067/api/Order/getTKDTTGNgay`);
        if (dataTG?.status === 200 && dataTuan?.status === 200 && dataNgay?.status === 200) {
          setTKDTTG(dataTG?.data?.data);
          setTKDTTuan(dataTuan?.data?.data);
          setTKDTNgay(dataNgay?.data?.data);
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [])
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:ml-64 pt-10 px-10">
      {isLoading && <Loading />}
      <div className=''>
        <div className="flex items-center mb-4" onClick={() => setValueChecked(1)}>
          <input checked={valueChecked === 1} id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biểu đồ cột</label>
        </div>
        <div className="flex items-center mb-4" onClick={() => setValueChecked(2)}>
          <input checked={valueChecked === 2} id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biểu đồ tròn</label>
        </div>
        <div className="flex items-center" onClick={() => setValueChecked(3)}>
          <input checked={valueChecked === 3} id="default-radio-3" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biểu đồ đường</label>
        </div>
      </div>
      <TableTKDTTG dataTG={TKDTTG} listColor={listColor} valueChart={valueChecked} />
      <TableTKDTTuan dataTuan={TKDTTuan} listColor={listColor} valueChart={valueChecked}/>
      <TableTKDTNgay dataNgay={TKDTNgay} listColor={listColor} valueChart={valueChecked}/>
    </div>

  )
}
