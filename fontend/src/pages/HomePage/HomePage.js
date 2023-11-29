import React, { useEffect, useState } from 'react';
import "./style.scss";
import check from "./../../resource/check.png"
import profile from "./../../resource/profile.png"
import ban from "./../../resource/ban.webp"
import ship from "./../../resource/ship.png"
import BannerComponent from '../../components/BannerComponent/BannerComponent';
import xiaomilogo from "../../resource/logo.png"
import ProductsComponent from '../../components/ProductsComponent/ProductsComponent';
import { getAllProductService } from '../../services/ProductService';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../redux/slides/userSlide';
import { updateCart } from '../../redux/slides/cartSlide';
import { updateProducts } from '../../redux/slides/productsSlide';
export default function HomePage() {
	const [products, setProducts] = useState()
	const [productHot, setProductHot] = useState()
	const [productSRM, setProductSRM] = useState()
	const user = useSelector(state => {
		return state.user
	})
	const dispatch = useDispatch();
	console.log(user)
	useEffect(() => { // Khi chuyển đường dẫn xong, cuộn lên đầu trang
		const fetchData = async () => {
			try {
				const email = localStorage.getItem("email");
				const password = localStorage.getItem("password");
				const res = await axios.post("https://localhost:7067/api/Member/login", { email, password });
				const isAdmin = await axios.get(`https://localhost:7067/api/Member/check/${res.data?.data.id}`);
				const idCartData = await axios.get(`https://localhost:7067/api/Cart/getCart/${res.data?.data.id}`);
				const dataHot = await axios.get(`https://localhost:7067/api/Product/getSPHot`);
				const dataSRM = await axios.get(`https://localhost:7067/api/Product/getSPSRM`);
				const idCart = idCartData.data.data.id;
				const admin = isAdmin && isAdmin.data.data
				if (res.status === 200) {
					dispatch(updateUser({ ...res.data?.data, isAdmin: admin, idCart }));
				}
				const cartProducts = await axios.get(`https://localhost:7067/api/CartProduct/getAllByMGH/${idCart}`);

				const req = await getAllProductService();
				if (cartProducts?.status === 200) {
					dispatch(updateCart(cartProducts?.data.data));
				}
				setProducts(req.data);
				setProductHot(dataHot?.data.data);
				setProductSRM(dataSRM?.data.data);
				dispatch(updateProducts(req.data))
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const listTab = ["Điện thoại"]
	return (
		<div className='bg-grayf5 w-full '>
			<div className='pt-4 w-full px-6 flex justify-center'>
				<div className='w-full'>
					<div className='w-full grid grid-cols-5 gap-4'>
						<BannerComponent />
						<div className='h-[280px] w-[280px] overflow-hidden rounded-lg'>
							<img src={xiaomilogo} className='w-full object-contain'
								alt='' />
						</div>
					</div>
					<div className='rounded-lg w-full bg-[#fff] h-[60px] p-4 flex justify-between cursor-pointer mt-4'>
						<div className=' flex items-center'>
							<div className='flex items-center '>
								<img src={check}
									alt=''
									className='h-6 w-6' />
								<span className='px-2 font-medium text-[14px] leading-[150%] text-blackNav'>100% hàng chính hãng</span>
							</div>
							<div className='flex items-center ms-4 '>
								<img src={profile}
									alt=''
									className='h-6 w-6' />
								<span className='px-2 font-medium text-[14px] leading-[150%] text-blackNav'>trợ lý cá nhân</span>
							</div>
							<div className='flex items-center ms-4'>
								<img src={ship}
									alt=''
									className='h-6 w-6' />
								<span className='px-2 font-medium text-[14px] leading-[150%] text-blackNav'>Giao nhanh & đúng hẹn</span>
							</div>
						</div>
						<div className='flex items-center '>
							<span className='ms-1 text-[14px] font-medium leading-[150%] text-colorSearch'>an tâm mua sắm</span>
							<ion-icon name="chevron-forward-outline"></ion-icon>
						</div>
					</div>
					<div className='w-full grid  grid-cols-2 gap-5 mt-4 rounded-md'>
						{productSRM && productSRM.map((item, index) => {
							return (
								<div key={index + item.name} className='p-7 aos bg-white hover:drop-shadow-xl relative' >
									<div className='absolute top-0 left-0 bg-red-600 text-white text-lg p-4 z-50'>Sản phẩm sắp ra mắt</div>
									<div className='font-semibold text-[28px] text-black mt-10 text-center'>{item.name}</div>
									<div className='text-sm text-center'>
										Tuyệt tác trong tầm tay
									</div>
									<div className='flex items-center justify-center'>
										<Link to={`/detailproduct/${item.id}`} className='bg-black text-white rounded-xl px-6 py-2 text-sm mt-4 text-center hover:bg-[#444]'>Tìm hiểu thêm</Link>
									</div>
									<div className='flex justify-center '>
										<img src={item.image} alt='' className='w-[240px] aos object-contain mt-16' />
									</div>
								</div>
							)
						})}
					</div>
					<div className='w-full grid grid-cols-4 gap-5 mt-4 rounded-md'>
						{productHot && productHot.map((item, index) => {
							return (
								<div key={index + item.name} className='p-7 aos bg-white hover:drop-shadow-xl' >
									<div className='aos font-semibold text-[28px] text-black mt-10 text-center' data-aos="fade-down" data-aos-duration="2000">{item.name}</div>
									<div className='text-sm text-center aos' data-aos="fade-up" data-aos-duration="2000">
										Tuyệt tác trong tầm tay
									</div>
									<div className='flex items-center justify-center'>
										<Link to={`/detailproduct/${item.id}`} className='bg-black text-white rounded-xl px-6 py-2 text-sm mt-4 text-center hover:bg-[#444]'>Tìm hiểu thêm</Link>
									</div>
									<div className='flex justify-center '>
										<img src={item.image} alt='' className='w-[240px] aos object-contain mt-16' data-aos="fade-right" />
									</div>
								</div>
							)
						})}
					</div>
					<ProductsComponent title="Sản phẩm sắp ra mắt" listTab={listTab} listProduct={products} />
					<ProductsComponent title="Gợi ý hôm nay" listTab={listTab} listProduct={products} />
					<div>
						<img src={ban} alt='' className='h-full object-contain' />
					</div>
				</div>


			</div>

		</div>
	)
}
