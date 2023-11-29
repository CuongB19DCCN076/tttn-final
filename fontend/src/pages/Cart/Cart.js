import React, { useEffect, useState } from 'react'
import "./style.scss"
import momoLoggo from "./../../resource/momo.png"
import ttknh from "./../../resource/ttknh.jpg"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { updateCart } from '../../redux/slides/cartSlide'
import Loading from '../../components/Loading/Loading'
import { Link, useNavigate } from 'react-router-dom'
export default function Cart() {
    const [idCart, setIdCart] = useState();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selected, setSelected] = useState(1);
    const [totalPrice, setTotalPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => {
        return state.user
    });
    const cart = useSelector(state => {
        return state.cart
    });
    const handleSubmit = async () => {
        try {
            if (selected === 1) {
                if (name === "" || phone === "" || address === "") {
                    toast.warning("Vui lòng điền đầy đủ thông tin nhận hàng!");
                    return
                }
                if(cart?.length === 0){
                    toast.warning("Giỏ hàng trống nên không thể đặt hàng");
                    return
                }
                setIsLoading(true);
                const res = await axios.post(`https://localhost:7067/api/Order/createOrder`, { idOrder: "3fa85f64-5717-4562-b3fc-2c963f66afa6", tblCartid: idCart, statusShipping: 0, tblUserid: user.id, totalPrice: totalPrice + 50000, addressShipping: address, phoneShipping: phone, nameShipping: name, statusOrder: 1, createAt: "2023-11-07T07:31:41.320Z", updateAt: "2023-11-07T07:31:41.320Z", methodPayment: selected });
                if (res?.status === 201) {
                    toast.success("Đặt hàng thành công !")
                    navigate("/user/ordersuccess")
                }
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log(user)
    const dispatch = useDispatch();
    useEffect(() => {
        setIdCart(user.idCart);
        const fetchData = async () => {
            try {
                setIsLoading(true);
                if (idCart) {
                    const cartProducts = await axios.get(`https://localhost:7067/api/CartProduct/getAllByMGH/${idCart}`);
                    const res = await axios.get(`https://localhost:7067/api/CartProduct/totalPrice/${idCart}`);
                    console.log(cartProducts);
                    if (cartProducts?.status === 200) {
                        dispatch(updateCart(cartProducts?.data.data));
                    }
                    if (res?.status === 200) {
                        setTotalPrice(res.data.data[0].TotalPrice);
                    }
                }
                setIsLoading(false);
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReset, idCart])
    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            const res = await axios.delete(`https://localhost:7067/api/CartProduct/${id}`);
            console.log(res);
            if (res?.status === 200) {
                toast.success("Xóa thành công sản phẩm ra khỏi giỏ hàng!")
            } else {
                toast.error("Xóa thất bại sản phẩm ra khỏi giỏ hàng!")
            }
            setIsLoading(false);
            setIsReset(!isReset);
        } catch (e) {
            console.log(e)
        }
    }
    const handleAdd = async (id, item) => {
        if(item.quantity === 2){
            return 0;
        }
        try {
            setIsLoading(true);
            await axios.get(`https://localhost:7067/api/CartProduct/addProductByMGH/${id}`);
            setIsLoading(false);
            setIsReset(!isReset);
        } catch (e) {
            console.log(e)
        }
    }

    const handleRemove = async (id, item) => {
        if (item.quantity === 1) {
            handleDelete(id);
        }
        else {
            try {
                setIsLoading(true);
                await axios.get(`https://localhost:7067/api/CartProduct/removeProductByMGH/${id}`);
                setIsLoading(false);
                setIsReset(!isReset);
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div className="h-max bg-gray-100 pt-10 mb-5">
            {isLoading && <Loading />}
            <h1 className="mb-10 text-center text-2xl font-bold">Giỏ hàng</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {
                        cart ? cart.map((item, index) => {
                            return (
                                <div key={index} id={item.id} className="group justify-between relative mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                    <img src={item.image}
                                        alt=''
                                        className="w-40 rounded-lg sm:w-20" />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                                            <p className="mt-1 text-xs text-gray-700">{item.ram}/{item.memory}/{item.color}</p>
                                            <Link to={`/detailproduct/${item.tblProductid}`} className='text-sm text-colorSearch mt-1 decoration-2'>Xem chi tiết sản phẩm</Link>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center border-gray-100 justify-end">
                                                <span onClick={() => handleRemove(item.id, item)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                    -
                                                </span>
                                                <input className="h-11 w-11 border bg-white text-center text-xs outline-none" type="text" value={Number(item.quantity)} min="1" />
                                                <span onClick={() => handleAdd(item.id, item)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                    +
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <p className="text-sm me-3">
                                                    {
                                                        new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(String(item.price * item.quantity))
                                                    } </p>
                                                <div onClick={() => handleDelete(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='hidden group-hover:block absolute w-40 text-sm text-white -left-44 top-0 shadow-2xl bg-colorSearch p-3 rounded-lg'>
                                        <div className='w-5 h-5 rotate-45 bg-colorSearch absolute top-4 -right-2'></div>
                                        <div className='my-2'>Tên: {item.name}</div>
                                        <div className='my-2'>Ram: {item.ram}</div>
                                        <div className='my-2'>Bộ nhớ: {item.memory}</div>
                                        <div className='my-2'>Màu sắc: {item.color}</div>
                                        <div className='my-2'>Pin: {item.pin}</div>
                                        <div className='my-2'>Camera: {item.camera}</div>
                                        <div className='my-2'>Màn hình: {item.screen}</div>
                                        <div className='my-2'>Chip: {item.chip}</div>
                                    </div>
                                </div>
                            )
                        }) : <div className='w-full h-20 my-auto text-center text-3xl bg-white'>Không có sản phẩm nào trong giỏ hàng</div>
                    }


                    <p class="mt-8 text-lg font-medium">Phương thức thanh toán</p>
                    <form class="mt-5 grid gap-6 text-sm">
                        <div class="relative" onClick={() => setSelected(1)}>
                            <input class="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
                            <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer items-center select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                                <img class="w-14 h-8"
                                    src={ttknh}
                                    alt="" />
                                <div class="ml-5">
                                    <span class="mt-2 font-semibold">Thanh toán khi nhận hàng</span>
                                </div>
                            </label>
                        </div>
                        <div class="relative" onClick={() => setSelected(2)}>
                            <input class="peer hidden" id="radio_2" type="radio" name="radio" />
                            <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                                <img class="w-14 h-8"
                                    src={momoLoggo}
                                    alt="" />
                                <div class="ml-5">
                                    <span class="mt-2 font-semibold">Thanh toán qua MoMo</span>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 text-sm ">
                    <div className='mb-4'>
                        <p class="text-xl font-medium">Địa chỉ giao hàng</p>
                        <p class="text-gray-400">Hoàn tất đơn đặt hàng của bạn bằng cách cung cấp chi tiết địa chỉ của bạn.</p>
                        <div class="">
                            <label for="text" class="mt-4 mb-2 block text-sm font-medium">Họ tên</label>
                            <div class="relative">
                                <input type="text" id="name" name="name" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Họ và tên người nhận hàng" value={name} onChange={(e) => setName(e.target.value)} />
                                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                </div>
                            </div>
                            <label for="text" class="mt-4 mb-2 block text-sm font-medium">Số điện thoại</label>
                            <div class="relative">
                                <input type="text" id="phone" name="phone" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Số điện thoại người nhận hàng" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                            <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Địa chỉ người nhận</label>
                            <div class="relative">
                                <input type="text" id="card-holder" name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Địa chỉ người nhận" value={address} onChange={(e) => setAddress(e.target.value)} />
                                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 flex justify-between">

                        <p className="text-gray-700">Tổng tiền sản phẩm</p>
                        <p className="text-gray-700">
                            {
                                new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(totalPrice)
                            }</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Phí vận chuyển ước tính</p>
                        <p className="text-gray-700 line-through">
                            {
                                new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(50000)
                            }</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Tổng tiền</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold ">
                                {
                                    new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(totalPrice)
                                }</p>
                            <p className="text-sm text-gray-700">Đã bao gồm cả VAT</p>
                        </div>
                    </div>
                    <button onClick={() => handleSubmit()} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Thanh toán</button>
                </div>
            </div>
        </div>
    )
}
