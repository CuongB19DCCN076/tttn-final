import React, {useState} from 'react'
import ip1 from "./../../resource/ip1.webp";
import ip2 from "./../../resource/ip2.webp";
import ip3 from "./../../resource/ip3.webp";
import ip4 from "./../../resource/ip4.webp";
import ip5 from "./../../resource/ip5.webp";
import ip6 from "./../../resource/ip6.webp";
import ip7 from "./../../resource/ip7.webp";
import ip8 from "./../../resource/ip8.webp";
import ip9 from "./../../resource/ip9.webp";
import Slider from 'react-slick';
export default function DetailProductLeft({product}) {
    const [imgMain, setImgMain] = useState(product.image);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    };
    const listImage = [
        product.image,
        ip1,
        ip2,
        ip3,
        ip4,
        ip5,
        ip6,
        ip7,
        ip8,
        ip9
    ]
    return (
        <div className='sticky top-3 w-[400px] mb-4'>
            <div className=' bg-white rounded-lg p-4 h-[464px] mb-4'>
                <img src={imgMain}
                    alt=''
                    className='object-contain w-[368px]'/>
                <div className='mt-4 detailProduct overflow-hidden '>
                    <Slider {...settings}>
                        {
                        listImage.map((item, index) => {
                            return (
                                <div key={index}
                                    className=' w-11 flex items-center justify-center mx-3 '
                                    onMouseEnter={
                                        () => setImgMain(item)
                                    }
                                    onMouseLeave={
                                        () => setImgMain(product.image)
                                }>
                                    <img src={item}
                                        alt=''
                                        className='h-11 w-11 object-contain'/>
                                </div>
                            )
                        })
                    } </Slider>
                </div>
            </div>
			<div className='bg-white border rounded-lg p-4'>
				<div className='flex mb-3 text-colorSearch'>
					<ion-icon name="briefcase-outline" size="large"></ion-icon>
					<div className='ms-3 text-base '>
					Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Ốp lưng, Cáp Type C, Củ sạc nhanh rời đầu Type A
					</div>
				</div>
				<div className='flex mb-3 text-colorSearch'>
				<ion-icon name="checkbox-outline" size="large"></ion-icon>
					<div className='ms-3 text-base '>
					Bảo hành chính hãng điện thoại 2 năm tại các trung tâm bảo hành hãng
					</div>
				</div>
				<div className='flex mb-3 text-colorSearch'>
				<ion-icon name="sync-outline" size="large"></ion-icon>
					<div className='ms-3 text-base '>
					Hư gì đổi nấy 12 tháng tại 3353 siêu thị toàn quốc (miễn phí tháng đầu)
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-lg p-4 mt-3'>
				<div className='text-2xl font-semibold mb-3'>Cấu hình điện thoại {product?.name}</div>
				<div className='flex text-sm border-t-2 py-2'>
					<div className='w-[100px]'>Màn hình:</div>
					<div>{product?.screen}</div>
				</div>
				<div className='flex text-sm border-t-2 py-2'>
					<div className='w-[100px]'>Hệ điều hành:</div>
					<div>{product?.system}</div>
				</div>
				<div className='flex text-sm border-t-2 py-2'>
					<div className='w-[100px]'>Camera sau:</div>
					<div>{product?.camera}</div>
				</div>
				<div className='flex text-sm border-t-2 py-2'>
					<div className='w-[100px]'>Chip:</div>
					<div>{product?.chip}</div>
				</div>
				<div className='flex text-sm border-t-2 py-2'>
					<div className='w-[100px]'>RAM:</div>
					<div>{product?.ram}</div>
				</div>
				<div className='flex text-sm border-t-2 py-2'>
					<div className='w-[100px]'>Dung lượng lưu trữ:</div>
					<div>{product?.memory}</div>
				</div>
				<div className='flex text-sm border-t-2 py-2'>
					<div className='w-[100px]'>Pin, Sạc:</div>
					<div>{product?.pin}, {product?.charger}</div>
				</div>
			</div>
        </div>

    )
}
