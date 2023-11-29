import React, { useState } from 'react'
import main from './../../resource/main.png'
import StarRatings from 'react-star-ratings'
import now from './../../resource/now.png';
import sun from './../../resource/sun.png';
import bh1 from './../../resource/bh1.png';
import unchecked from './../../resource/unchecked.svg';
import checked from './../../resource/checked.svg';
import bh from './../../resource/bh.jpg';
export default function DetailProductMid({ product }) {
	const [isCheck, setIsCheck] = useState(false);
	return (
		<div className='flex flex-wrap w-[584px] mb-4 h-max'>
			<div className='w-full bg-white rounded-lg h-[286px] p-4'>
				<div className='flex items-center h-5 w-full'>
					<img src={main}
						alt=''
						className='h-full object-contain mr-2' />
					<h6>Thương hiệu:
						<span className='text-[13px] leading-[20px] text-[#0d5cb6]'>Xiaomi</span>
					</h6>
				</div>
				<h1 className='mt-1'>{product.name}</h1>
				<div className='flex items-center mt-2'>
					<span className='text-sm font-medium mr-1'>
						{product.rating}</span>
					<StarRatings rating={product.rating}
						starRatedColor="rgb(255, 196, 0)"
						numberOfStars={5}
						name='rating'
						starDimension="16px"
						starSpacing="0px" />
					<div className='text-sm leading-6 text-[#787878] ml-2'>({product.quantitySold})</div>
					<div className='w-[1px] h-3 bg-[#c7c7c7] mx-2'></div>
					<div className='text-sm leading-6 text-[#787878]'>
						Đã bán {product.quantitySold}+
					</div>
				</div>
				{product.status === 1 ? (<div className='text-sm leading-6 text-[#787878]'>
					Kho: {product.quantityInStock === 0 ? "Tạm hết" : product.quantityInStock}
				</div>) : (<div className='text-sm leading-6 text-[#787878]'>
					Ngừng bán
				</div>)}
				{product.status === 1 && (<div className='font-semibold text-2xl mt-2'>
					{
						new Intl.NumberFormat('vi-VN', {
							style: 'currency',
							currency: 'VND'
						}).format(String(Number(product.price)))
					}
				</div>)}
			</div>
			<div className='w-full bg-white p-4 mt-4 rounded-lg'>
				<span className='font-semibold inline-flex  items-center text-base'>Thông tin vận chuyển</span>
				<div className='flex justify-between items-center font-normal text-sm leading-[150%] py-2 mt-2 border-b border-graycb'>
				</div>
				<div className='py-2'>
					<div className='flex items-center'>
						<img src={now}
							alt=''
							className='w-8 object-contain' />
						<span className='text-sm leading-[150%] ml-2 text-[#27272a] font-medium'>Giao siêu tốc trong 2h</span>
					</div>
					<div className='text-[#27272A] leading-[150%] text-[14px]'>
						Trước 15h hôm nay:&nbsp;
						<span className='text-[#00AB56]'>Miễn phí &nbsp;
							<span className='text-[#808089] relative text-sm before:border before:border-[#808089] before:absolute before:top-[50%] before:w-full'>
								{
									new Intl.NumberFormat('vi-VN', {
										style: 'currency',
										currency: 'VND'
									}).format(25000)
								}</span>
						</span>
					</div>
				</div>
				<div className='py-2 mt-1'>
					<div className='flex items-center'>
						<img src={sun}
							alt=''
							className='w-8 object-contain' />
						<span className='text-sm leading-[150%] ml-2 text-[#27272a] font-medium'>Giao đúng chiều mai</span>
					</div>
					<div className='text-[#27272A] leading-[150%] text-[14px]'>
						14h - 18h, {console.log(new Date())}:&nbsp;
						<span className='text-[#00AB56]'>Miễn phí &nbsp;
							<span className='text-[#808089] relative text-sm before:border before:border-[#808089] before:absolute before:top-[50%] before:w-full'>
								{
									new Intl.NumberFormat('vi-VN', {
										style: 'currency',
										currency: 'VND'
									}).format(11000)
								}</span>
						</span>
					</div>
				</div>
			</div>
			<div className='w-full bg-white p-4 mt-4 rounded-lg h-max'>
				<span className='font-semibold inline-flex  items-center text-base'>Dịch vụ bổ sung</span>
				<div className='flex justify-between items-center font-normal text-sm leading-[150%] py-2 mt-2 border-b border-graycb h-[62px] w-full'>
					<div className='h-full w-full flex items-center'>
						<img src={bh}
							alt=''
							className='h-full object-contain' />
						<div className='ml-2'>
							<div className='flex items-center'>
								Bảo hiểm Thiết bị di động nâng cao
								<img src={bh1}
									alt=''
									className='h-4 object-contain ml-1' />
							</div>
							<div className='font-semibold text-sm leading-[150%]'> {
								new Intl.NumberFormat('vi-VN', {
									style: 'currency',
									currency: 'VND'
								}).format(77000)
							} </div>
						</div>
					</div>
					<img src={isCheck ? checked : unchecked} alt='' className='h-5 w-5' onClick={() => { setIsCheck(!isCheck) }} />
				</div>
				{/* <div className='flex justify-between items-center font-normal text-sm leading-[150%] py-2 my-2 h-[62px] w-full'>
					<div className='h-full w-full flex items-center'>
						<img src={paylater}
							alt=''
							className='h-full object-contain'/>
						<span className='text-sm leading-[150%] font-medium ml-2'>

							Mua trước trả sau
						</span>
					</div>
					<span className='text-colorSearch w-16 inline-block'>Đăng ký</span>
				</div> */}
			</div>
			<div className='w-full bg-white p-4 mt-4 rounded-lg max-h-max'>
				<span className='font-semibold inline-flex  items-center text-base'>Mô tả sản phẩm</span>
				<div className='flex justify-between items-center font-normal text-sm leading-[150%] py-2 mt-2 border-b border-graycb w-full'>
					{product.description}
				</div>
			</div>
			<div className='w-full bg-white p-4 mt-4 rounded-lg max-h-max'>
				<span className='font-semibold inline-flex  items-center text-base'>Video giới thiệu sản phẩm</span>
				<div className='flex justify-between items-center font-normal text-sm leading-[150%] h-[1px] py-2 my-2 border-b border-graycb w-full'>
				</div>
				<iframe width="560" height="315" src={product?.videoIntro} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			</div>
			<div className='w-full bg-white p-4 mt-4 rounded-lg max-h-max'>
				<span className='font-semibold inline-flex  items-center text-base'>Video đánh giá sản phẩm</span>
				<div className='flex justify-between items-center font-normal text-sm leading-[150%] h-[1px] py-2 my-2 border-b border-graycb w-full'>
				</div>
				<iframe width="560" height="315" src={product?.videoReview} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			</div>
		</div>
	)
}
