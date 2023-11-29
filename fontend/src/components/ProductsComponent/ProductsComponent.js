import React from 'react'
import CardProduct from '../CardProduct/CardProduct'
import Slider from 'react-slick'

export default function ProductsComponent({
	title,
	listTab = [],
	listProduct = []
}) {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 6,
		autoplaySpeed: 3000,
		autoplay: true
	};
	return (
		<div className='h-[444px] w-full bg-[white] rounded-lg my-4 p-4'>
			<div className='font-semibold text-base'>
				{title} </div>
			<div className='h-8 w-full mt-4 '>
				{
					listTab.map((item, index) => {
						let cls = 'h-full button inline-flex items-center me-3'
						if (index === 0) {
							cls = 'h-full button active inline-flex items-center me-3'
						}
						return <span key={index}
							className={cls}>
							{item} </span>
					})
				} </div>
			<Slider {...settings} className='mt-4 flex flex-row overflow-hidden'>
				{
					listProduct.map((item,index) => {
						return <CardProduct key={index}
							id={item.id}
							image={
								item.image
							}
							title={
								item.name
							}
							star={
								item.rating
							}
							price={
								item.price
							} />
					})
				} </Slider>
		</div>
	)
}
