import React, { useEffect, useState } from 'react'
import "./style.scss"
import DetailProductLeft from '../../components/DetailProductLeft/DetailProductLeft';
import DetailProductRight from '../../components/DetailProductRight/DetailProductRight';
import DetailProductMid from '../../components/DetailProductMid/DetailProductMid';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import UpcomingProduct from '../../components/UpcomingProduct/UpcomingProduct';
export default function DetailProduct() {
	const [product, setProduct] = useState()
	const id = useLocation().pathname.split("/")[2];
	console.log(id);
	useEffect(() => { // Khi chuyển đường dẫn xong, cuộn lên đầu trang
		const fetchData = async () => {
			try {
				const req = await axios.get(`https://localhost:7067/api/Product/${id}`);
				console.log(req?.data.data)
				setProduct(req?.data.data);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
		window.scrollTo(0, 0);
	}, [id]);
	if (product && product?.status === 2) {
		return <UpcomingProduct idProduct={id}/>
	} else {
		return (
		<div className='bg-grayf5'>
			<div className='pt-4 w-full max-w-[1440px] flex justify-between mx-auto'>
			{product && <DetailProductLeft product={product} />}
			{product && <DetailProductMid product={product} />}
			{product && <DetailProductRight product={product} />}
			</div>
		</div>
		
		)
	}
}
