import React from 'react'
import official from "./../../resource/official.png"
import now from "./../../resource/now.png"

import { Link } from 'react-router-dom';
export default function CardProduct({ image, title, price, star, id, status, ram, memory, screen, chip, color, pin, camera }) {
	const priceLast = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
	return (
		<Link to={`/detailproduct/${id}`} className='w-[174px] mr-2 p-1 relative group'>
			{status === 2 && <div className='absolute top-0 left-0 bg-red-600 text-white p-2 z-30'>Sản phẩm sắp ra mắt</div>}
			<img src={image}
				alt=''
				className='w-full h-[174px] rounded-lg object-contain' />
			<div className='p-2'>
				<img src={official}
					alt='' className='w-18 h-5 object-contain' />
				<div className='text-base font-normal '> {title} </div>
				<div>{ram}/{memory}</div>
				<div className='font-medium text-base'> {priceLast} </div>
			</div>
			<div className='pt-[6px] pb-2 flex border-t border-[#ebebf0]'>
				<img src={now}
					alt='' className='w-8 object-contain' />
				<span className='ml-1 text-xs text-[#808089] '>
					Giao siêu tốc trong 2h
				</span>
			</div>
			<div className='hidden group-hover:block absolute w-40 text-sm text-white -left-44 top-0 shadow-2xl bg-colorSearch p-3 rounded-lg z-50'>
				<div className='w-5 h-5 rotate-45 bg-colorSearch absolute top-4 -right-2'></div>
				<div className='my-2'>Tên: {title}</div>
				<div className='my-2'>Ram: {ram}</div>
				<div className='my-2'>Bộ nhớ: {memory}</div>
				<div className='my-2'>Màu sắc: {color}</div>
				<div className='my-2'>Pin: {pin}</div>
				<div className='my-2'>Camera: {camera}</div>
				<div className='my-2'>Màn hình: {screen}</div>
				<div className='my-2'>Chip: {chip}</div>
			</div>
		</Link>
	)
}
