import React from 'react'
import { Link } from 'react-router-dom'
// import thanhtoan from "./../../resource/thanhtoan.png"
// import chungnhan from "./../../resource/chungnhan.png"
// import fb from "./../../resource/facebook.png"
// import zalo from "./../../resource/zalo.webp"
import logo from "./../../resource/NHC.png"
export default function FooterComponent() {
	// const listSp = [
	// 	"Các câu hỏi thường gặp",
	// 	"Gửi yêu cầu hỗ trợ",
	// 	"Hướng dẫn đặt hàng",
	// 	"Phương thức vận chuyển",
	// 	"Chính sách đổi trả",
	// 	"Hướng dẫn trả góp",
	// 	"Chính sách hàng nhập khẩu",
	// 	"Hỗ trợ khách hàng: hotro@tiki.vn",
	// 	"Báo lỗi bảo mật: security@tiki.vn",
	// ]
	// const listAbout = [
	// 	"Giới thiệu Tiki",
	// 	"Tiki Blog",
	// 	"Tuyển dụng",
	// 	"Chính sách bảo mật thanh toán",
	// 	"Chính sách bảo mật thông tin cá nhân",
	// 	"Chính sách giải quyết khiếu nại",
	// 	"Điều khoản sử dụng",
	// 	"Giới thiệu Tiki Xu",
	// 	"Thưởng thêm Astra",
	// 	"Gói hội viên VIP",
	// 	"Tiếp thị liên kết cùng Tiki",
	// 	"Bán hàng doanh nghiệp",
	// 	"Điều kiện vận chuyển",
	// ]
	return (
		// <div classNameName='grid grid-cols-1 md:grid-cols-5 g h-[100px] gap-4 text-[#808089] mx-[133px] py-4'>
		// 	<div classNameName=''>
		// 		<h4>Hỗ trợ khách hàng</h4>
		// 		<p classNameName='text-xs'>
		// 			Hotline: &nbsp;
		// 			<Link to="tel: 0966644237" classNameName='text-[#000]'>09 666 44 237</Link>
		// 			<br/>
		// 			<span>(1000 đ/phút, 8-21h kể cả T7, CN)</span>
		// 		</p>
		//         {listSp.map((item, index) => {
		//             return <div key={index} classNameName='mb-2 text-xs'>{item}</div>
		//         })}
		// 	</div>
		// 	<div classNameName=''>
		// 		<h4>Hỗ trợ khách hàng</h4>
		//         {listAbout.map((item,index) => {
		//             return <div key={index} classNameName='mb-2 text-xs'>{item}</div>
		//         })}
		// 	</div>
		// 	<div classNameName=''>
		// 		<h4>Hợp tác và liên kết</h4>
		//          <div classNameName='mb-2 text-xs'>Quy chế hoạt động Sàn GDTMĐT</div>
		//          <div classNameName='mb-2 text-xs'>Bán hàng cùng Tiki</div>
		//         <h4>Chứng nhận bởi</h4>
		//         <img src={chungnhan} alt='' classNameName='h-8 object-contain'/>
		// 	</div>
		// 	<div classNameName=''>
		// 		<h4>Phương thức thanh toán</h4>
		//         <img src={thanhtoan} alt='' classNameName='w-full object-contain'/>
		// 	</div>
		// 	<div classNameName=''>
		// 		<h4>Kết nối với chúng tôi</h4>
		//         <div classNameName='h-8 flex gap-3'>
		//             <Link to={'https://www.facebook.com/cuong.trannguyen.9212'}>
		//                 <img src={fb} alt='' classNameName='h-full object-contain'/>
		//             </Link>
		//             <Link to={'https://www.facebook.com/cuong.trannguyen.9212'}>
		//                 <img src={zalo} alt='' classNameName='h-full object-contain'/>
		//             </Link>
		//             <Link to={'https://www.youtube.com/@BDCCN-NguyenVanCuong'}>
		//                 <img src={yt} alt='' classNameName='h-full object-contain'/>
		//             </Link>
		//         </div>
		// 	</div>
		// </div>

		<footer className="bg-gray-900">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<Link to="http://localhost:3000/" className="flex items-center">
							<img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
							<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">NHC Shop</span>
						</Link>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 sm:w-[550px]">
						<div>
							<h2 className="mb-6 text-sm font-semibold  uppercase text-white">Tài nguyên</h2>
							<ul className="text-gray-400 font-medium text-sm">
								<li className="mb-4">
									<Link to="http://localhost:3000/" className="hover:underline hover:text-white">Sản phẩm</Link>
								</li>
								<li>
									<Link to="http://localhost:3000/" className="hover:underline hover:text-white"></Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold  uppercase text-white">Hỗ trợ</h2>
							<ul className="text-gray-400 font-medium text-sm">
								<li className="mb-4">
									<Link to="http://localhost:3000/" className="hover:underline hover:text-white ">Hướng dẫn sử dụng</Link>
								</li>
								<li className="mb-4">
									<Link to="http://localhost:3000/" className="hover:underline hover:text-white">Bảo hành</Link>
								</li>
								<li>
									<Link to="http://localhost:3000/" className="hover:underline hover:text-white">MIUI</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold  uppercase text-white">Giới thiệu</h2>
							<ul className="text-gray-400 font-medium text-sm">
								<li className="mb-4">
									<Link to="#" className="hover:underline hover:text-white">Xiaomi</Link>
								</li>
								<li>
									<Link to="#" className="hover:underline hover:text-white">Cửa hàng</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
				<div className="sm:flex sm:items-center sm:justify-between">
					<span className="text-sm  sm:text-center text-gray-400">© 2023 <Link to="https://flowbite.com/" className="hover:underline hover:text-white">Flowbite™</Link>. All Rights Reserved.
					</span>
					<div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
						<Link to="#" className="  hover:text-white">
							<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
								<path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
							</svg>
							<span className="sr-only">Facebook page</span>
						</Link>
						<Link to="#" className="  hover:text-white">
							<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
								<path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
							</svg>
							<span className="sr-only">Discord community</span>
						</Link>
						<Link to="#" className="  hover:text-white">
							<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
								<path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd" />
							</svg>
							<span className="sr-only">Twitter page</span>
						</Link>
						<Link to="#" className="  hover:text-white">
							<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
							</svg>
							<span className="sr-only">GitHub account</span>
						</Link>
						<Link to="#" className="  hover:text-white">
							<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd" />
							</svg>
							<span className="sr-only">Dribbble account</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>

	)
}
