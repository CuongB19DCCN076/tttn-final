import React from 'react';
import Slider from "react-slick";
import ban1 from "./../../resource/ban1.webp";
import ban2 from "./../../resource/ban2.webp";
import ban3 from "./../../resource/ban3.webp";
import ban4 from "./../../resource/ban4.webp";

import './style.scss';
export default function BannerComponent() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true
	};
	return (
		<div className='w-full h-72 col-span-4 overflow-hidden rounded-lg grid-cols-4'>
			<Slider {...settings} className='w-full h-full'>
				<div className='w-full h-full'>
					<img src={ban1} alt='' className=' h-full w-full rounded-lg'/>
				</div>
				<div className='w-full h-full'>
					<img src={ban2} alt='' className=' h-full w-full rounded-lg'/>
				</div>
				<div className='w-full h-full'>
					<img src={ban3} alt='' className=' h-full w-full rounded-lg'/>
				</div>
				<div className='w-full h-full'>
					<img src={ban4} alt='' className=' h-full w-full rounded-lg'/>
				</div>
				
			</Slider>
		</div>
	)
}
