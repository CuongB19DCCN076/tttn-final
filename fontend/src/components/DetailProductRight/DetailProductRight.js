import React, { useState } from 'react'
import "./style.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/slides/cartSlide';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
export default function DetailProductRight({ product }) {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleQuantityRemove = () => {
		if (quantity === 1)
			return;

		setQuantity(value => {
			value = parseInt(value, 10);
			return value - 1;
		});
	}

	const handleQuantityAdd = () => {
		if(quantity === 2){
			return ;
		}
		setQuantity(value => {
			value = parseInt(value, 10);
			return value + 1;
		});
	}
	const addToCart = async () => {
		if(product.quantityInStock === 0){
			return;
		}
		try{
			if(user?.idCart === ""){
				navigate('/')
				return;
			}
			const priceTotal = quantity * (product.price)
			setIsLoading(true);
			const res = await axios.post("https://localhost:7067/api/CartProduct",{id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", tblCartid: user?.idCart, tblProductid: product?.id, quantity,totalPriceCart: priceTotal, priceByOne: product.price})
			setIsLoading(false);
			dispatch(addCart(product));
			if(res?.status === 201){
				toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
			}else{
				toast.error("Thêm sản phẩm vào giỏ hàng thất bại!");
			}
		}catch(e){
			console.log(e);
		}
	}
	const buyNow = async () => {
		if(product.quantityInStock === 0){
			return;
		}
		try{
			if(user?.idCart === ""){
				navigate('/')
				return;
			}
			const priceTotal = quantity * (product.price)
			setIsLoading(true);
			const res = await axios.post("https://localhost:7067/api/CartProduct",{id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", tblCartid: user?.idCart, tblProductid: product?.id, quantity,totalPriceCart: priceTotal, priceByOne: product.price})
			setIsLoading(false);
			dispatch(addCart(product));
			if(res.status === 201){
				navigate("/cart");
				toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
			}
		}catch(e){
			console.log(e);
		}
	}
	return (
		<div className='w-[360px] bg-white h-max rounded-lg sticky top-3 p-4 mb-4'>
			{isLoading && <Loading />}
			{product?.status !== 1 && <div className='text-lg text-colorSearch h-3 w-full'>Sản phẩm tạm hết hàng</div>}
			{product?.status === 1 && <div className='mt-4'>
				<span className='font-semibold inline-flex  items-center text-sm leading-[150%]'>Số Lượng</span>
				<div className='flex gap-1 h-8 mt-3'>
					<div className='border border-graycb rounded-[4px] flex items-center justify-center h-full w-8 cursor-pointer'
						onClick={
							() => handleQuantityRemove()
						}>
						<ion-icon name="remove-outline"></ion-icon>
					</div>
					<input type='text'
						value={quantity}
						className='border border-graycb h-full w-10 rounded-[4px] text-center text-sm '
						 />
					<div className='border border-graycb rounded-lg flex items-center justify-center h-full w-8 cursor-pointer'
						onClick={
							() => handleQuantityAdd()
						}>
						<ion-icon name="add-outline"></ion-icon>
					</div>
				</div>
			</div>}
			{product?.status === 1 && <div className='mt-4'>
				<span className='font-semibold inline-flex  items-center text-base'>Tạm tính</span>
				<div className='font-semibold text-2xl mt-2'>
					{
						new Intl.NumberFormat('vi-VN', {
							style: 'currency',
							currency: 'VND'
						}).format(String(Number(product.price) * Number(quantity)))
					} </div>
			</div>}
			{product?.status === 1 && <Link to="/cart" onClick={() => buyNow()} className='buttonCursor w-full h-10 flex items-center justify-center text-white rounded mt-4 cursor-pointer bg-[#ff424e] font-light text-base leading-[150%]'>
				<span className='relative'>
					Mua ngay
				</span>
			</Link>}
			{product?.status === 1 && <div onClick={() => addToCart()} className='w-full h-10 flex items-center justify-center text-colorSearch rounded mt-4 cursor-pointer border border-colorSearch bg-white font-light text-base leading-[150%]'>
				Thêm vào giỏ hàng
			</div>}
		</div>
	)
}
