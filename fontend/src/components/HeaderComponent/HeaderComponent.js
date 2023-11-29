import React, { useState } from 'react'
import "./style.scss"
import logo from "./../../resource/NHC.png"
import MenuItem from '../MenuItem/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function HeaderComponent() {
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const handleSearch = () => {
		navigate(`/search/${search}`)
	}
	return (
		<div className='w-full max-w-[1440px] bg-[#ffffff] mx-auto py-2 px-6 flex items-center justify-between h-24'>
			<Link to="/" className='max-w-[72px] h-[72px] '>
				<img src={logo}
					alt=''
					className='w-full h-full' />
			</Link>
			<div className='w-full max-w-[1272px] h-20 bg-slate-500 '>
				<div className='w-full h-10 flex justify-between'>
					<div className='max-w-[812px] w-full h-full border border-whiteBoder rounded-lg flex items-center justify-between overflow-hidden text-colorMenuItem'>
						<div className='ms-[18px] flex items-center text-sm'>
							<ion-icon name="search-outline"></ion-icon>
						</div>
						<input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='w-[84%] h-full px-2 text-[14px] font-normal border-none outline-none focus:ring-transparent leading-[150%]' placeholder='Nhập cần tìm kiếm' />
						<button onClick={() => handleSearch()} className='text-[14px] font-normal relative leading-[150%] text-center text-colorSearch w-full max-w-[92px] h-full hover:bg-[#cee1ff] before:border-l before:border-whiteBoder before:absolute before:h-6 before:top-2 before:left-0'>Tìm kiếm</button>
					</div>

					<div className='w-full max-w-[430px] h-full ms-12 flex'>
						<MenuItem nameIcon="home-outline" href="/" nameHref="Trang Chủ" />
						<MenuItem nameIcon="phone-portrait-outline" href="/products" nameHref="Sản phẩm" />
						<MenuItem nameIcon="person-circle-outline" href="/login" nameHref="Tài Khoản" nameUser={user.name} />

						<div className='h-full flex items-center relative'>
							<Link to="/cart">
								<div className='ms-6 before:border-l before:border-whiteBoder before:absolute before:h-5 before:top-2 before:left-0 w-10 h-10 flex justify-center items-center'>
									<div className='relative text-colorSearch'>
										<ion-icon name="cart-outline"></ion-icon>
										<span className='absolute bg-[red] rounded-full py-[0.5px] px-1 text-[10px] font-bold text-[#fff] leading-[150%] top-[-8px] left-5'>{cart.length}</span>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<div className='w-full h-8 flex justify-between mt-2'>
					<div className='text-[14px] font-normal leading-[150%] flex text-colorMenuItem items-center'>
						{/* {
						listItem.map((item,index) => {
							return <Link key={index} to={item.link} className='me-5'>
								{item.title}</Link>
					})
					}  */}
					</div>
					<div className='text-[14px] font-normal leading-[150%] flex text-colorMenuItem items-center cursor-pointer group relative'>
						<div className='me-1'>
							<ion-icon name="globe-outline"></ion-icon>
						</div>
						<span>Địa chỉ cửa hàng:
							<span className='underline decoration-1 text-[#000]'> P. Mộ Lao, Q. Hà Đông, Hà Nội</span>
						</span>
						<div>
						{// eslint-disable-next-line jsx-a11y/iframe-has-title
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2686192527526!2d105.7829089750795!3d20.981866780655736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accc525581db%3A0x470925a20a3037f7!2zS1RYIEIyIELGsHUgY2jDrW5oLCBQLiBOZ3V54buFbiBWxINuIFRy4buXaSwgUC4gTeG7mSBMYW8sIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1701094952033!5m2!1svi!2s" className='hidden group-hover:block absolute -bottom-96 right-0 z-50' width="500" height="384" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
						}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
