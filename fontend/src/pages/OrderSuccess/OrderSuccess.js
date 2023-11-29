import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading';
import { updateCart } from '../../redux/slides/cartSlide';
import { Link } from 'react-router-dom';
export default function OrderSuccess() {
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [listOrder, setListOrder] = useState();
    const [listPro, setListPro] = useState();
    const user = useSelector(state => {
        return state.user
    });
    const dispatch = useDispatch();
    useEffect(() => {
        setUserId(user.id);
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`https://localhost:7067/api/Order/getAllSuccess/${user.id}`);
                const res1 = await axios.get(`https://localhost:7067/api/OrderProduct/getall`);
                const cartProducts = await axios.get(`https://localhost:7067/api/CartProduct/getAllByMGH/${user.idCart}`);
                if (res?.status === 200 && res1?.status === 200) {
                    setListOrder(res.data.data);
                    setListPro(res1.data.data);
                    dispatch(updateCart(cartProducts?.data.data));
                }
            } catch (e) {
                console.log(e)
            }
            setIsLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    return (
        <div className='w-full max-w-[993px] h-max  rounded-sm px-[30px] flex flex-col'>
            {isLoading && <Loading />}
            {listOrder && listOrder.map((item, index) => {
                return (
                    <Link to={`/user/orderdetail/${item.idOrder}`} key={index} className='w-full block mb-5 bg-[#fff]'>
                        <div className='flex items-center justify-end mt-2 w-full p-3'>
                            <ion-icon name="rocket-outline"></ion-icon>
                            <span className='text-sm text-colorSearch me-2'>{item.statusOrder === 0 ? "Đơn hàng đã được đặt" : item.statusOrder === 1 ? "Đơn hàng đang được xử lý" : item.statusOrder === 2 ? "Đơn hàng đang được vận chuyển" : "Đơn hàng đã giao thành công"}</span>
                        </div>
                        <div className='w-full h-[1px] bg-[#f1f1f1]'></div>
                        {
                            // eslint-disable-next-line array-callback-return
                            listPro && listPro.map((item1, index1) => {
                                if (item1.tblOrderid === item.idOrder) {
                                    return (
                                        <div key={index+item1.id} className='h-max text-sm flex px-10 my-3'>
                                            <img src={item1.image} alt='' className='h-20 object-cover' />
                                            <div className='flex justify-between items-center w-full'>
                                                <div className='h-full text-lg font-medium'>
                                                    {item1.name}
                                                </div>
                                                <div >
                                                    <div className='text-end'>Giá: {item1.priceByOne}</div>
                                                    <div className='text-end'>SL: {item1.quantity}</div>
                                                    <div className='text-end'>Tổng tiền: {item1.totalPriceOrder}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                        <div className='w-full h-[1px] bg-[#f1f1f1]'></div>
                        <div className='flex items-center justify-end mt-2 w-full p-3'>
                            <ion-icon name="wallet-outline"></ion-icon>
                            <span className='text-lg text-colorSearch me-2'>Tổng tiền: <span className='text-red-500'>{item.totalPrice}</span></span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
