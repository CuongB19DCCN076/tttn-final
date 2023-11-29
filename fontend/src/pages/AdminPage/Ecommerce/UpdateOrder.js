import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';

export default function UpdateOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const idOrder = useLocation().pathname.split("/")[4];
  const [addressShipping, setAddressShipping] = useState();
  const [nameShipping, setNameShipping] = useState();
  const [phoneShipping, setPhoneShipping] = useState();
  const [statusOrder, setStatusOrder] = useState();
  const [statusShipping, setStatusShipping] = useState();
  const [methodPayment, setMethodPayment] = useState();
  const [tblCartid, setTblCartid] = useState();
  const [tblUserid, setTblUserid] = useState();
  const [createAt, setCreateAt] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [listSp, setListSp] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`https://localhost:7067/api/Order/${idOrder}`)
        const res1 = await axios.get(`https://localhost:7067/api/OrderProduct/getAllByIdOrder/${idOrder}`);
        console.log(res1?.data.data)
        if (res?.status === 200 && res1?.status === 200) {
          const data = res?.data?.data;
          setAddressShipping(data.addressShipping);
          setCreateAt(data.createAt);
          setUpdateAt(data.updateAt);
          setMethodPayment(data.methodPayment);
          setNameShipping(data.nameShipping);
          setPhoneShipping(data.phoneShipping);
          setStatusOrder(data.statusOrder);
          setStatusShipping(data.statusShipping);
          setTblUserid(data.tblUserid);
          setTblCartid(data.tblCartid);
          setTotalPrice(data.totalPrice);
          setListSp(res1?.data?.data);
        }
        setIsLoading(false)
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    const dataTemp = {
      id: idOrder,
      addressShipping,
      phoneShipping,
      nameShipping,
      statusOrder,
      statusShipping,
      methodPayment,
      tblCartid,
      tblUserid,
      createAt,
      updateAt,
      totalPrice: Number(totalPrice)
    }
    await axios.put(`https://localhost:7067/api/Order/${idOrder}`, dataTemp).then((data) => {
      if (data?.status === 200) {
        navigate("/admin/billing")
        toast.success("Sửa đơn hàng thành công");
      } else {
        toast.error("Sửa đơn hàng không thành công");
      }
    }).catch(function (error) {
      console.log(error);
    })
  }
  
  return (
    <div className="py-4 px-52 sm:ml-64">
      {isLoading && <Loading />}
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-colorSearch dark:text-white">Cập nhật Hóa đơn</h3>
          {listSp && listSp.map((item, index) => {
            return (
              <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img className="w-full hidden md:block" src={item.image} alt="dress" />
                  <img className="w-full md:hidden" src={item.image} alt="dress" />
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
                    <div className="flex items-center border-gray-100 justify-end">
                     
                      <input className="h-11 w-11 border bg-white text-center text-xs outline-none" type="text" value={Number(item.quantity)} min="1" />
                     
                    </div>
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
          <div>
            <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="floating_text" id="floating_text"
                onChange={
                  (e) => setAddressShipping(e.target.value)
                }
                value={nameShipping}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required />
              <label htmlFor="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên người nhận</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="floating_text" id="floating_text"
                onChange={
                  (e) => setAddressShipping(e.target.value)
                }
                value={addressShipping}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required />
              <label htmlFor="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Địa chỉ người nhậnnhận</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="repeat_text" id="_repeat_text"
                  onChange={
                    (e) => setPhoneShipping(e.target.value)
                  }
                  value={phoneShipping}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required />
                <label htmlFor="_repeat_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại người nhận</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="repeat_text" id="_repeat_text"
                  onChange={
                    (e) => setTotalPrice(e.target.value)
                  }
                  value={totalPrice}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required />
                <label htmlFor="_repeat_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tổng hóa đơn</label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <div>
                  Trạng thái đơn hàng
                </div>
                <select value={statusOrder}
                  onChange={
                    (e) => setStatusOrder(e.target.value)
                  }
                  id=""
                  className=' text-sm'>
                  <option value="1" className="option">Chờ xử lý</option>
                  <option value="2" className="option">Đang xử lý</option>
                  <option value="3" className="option">Đang vận chuyển</option>
                  <option value="4" className="option">Đã giao</option>
                  <option value="5" className="option">Đã hủy</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <div>
                  Trạng thái vận chuyển
                </div>
                <select value={statusShipping}
                  onChange={
                    (e) => setStatusShipping(e.target.value)
                  }
                  id=""
                  className=' text-sm'>
                  <option value="0" className="option">Đang vận chuyển</option>
                  <option value="1" className="option">Đã giao</option>
                </select>
              </div>
            </div>


            <button onClick={
              () => handleSubmit()
            }
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}
