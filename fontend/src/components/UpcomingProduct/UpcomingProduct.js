import React, { useEffect, useState } from 'react'
import banner from "./../../resource/bannerLa.png"
import './style.scss'
import axios from 'axios';
import { toast } from 'react-toastify';
export default function UpcomingProduct({idProduct}) {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [reason, setReason] = useState();
    const [product, setProduct] = useState();
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const data = await axios.get(`https://localhost:7067/api/Product/${idProduct}`);
                setProduct(data?.data.data);
            }catch(e){
                console.log(e)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleSubmit = async () => {
        try{
            const res = await axios.post(`https://localhost:7067/api/Registration`,{
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                name: name,
                phone: phone,
                email: email
              });
              if(res?.status === 201){
                const id = res?.data?.data.id;
                const res2 = await axios.post("https://localhost:7067/api/RegistrationProduct",{
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    tblRegistrationid: id,
                    tblProductid: idProduct,
                    reason: reason,
                    statusRP: 1
                })
                if(res2?.status === 201){
                    toast.success("Đăng ký nhận thông tin thành công!");
                }else{
                    toast.error("Đăng ký nhận thông tin không thành công!");
                }
              }
        }catch(e){
            console.log(e)
        }
    }
    console.log(product);
    return (
        <div className='upcoming flex justify-center flex-col'>
            <img src={banner}
                alt=''
                className='w-full'/>
            <div className='w-[960px] flex justify-center mt-10 mx-auto flex-col'>
                <div className="aos w-full h-[400px] cameLa text-white flex justify-between items-end pb-10 px-40" data-aos="fade-up">
                    <div className=' font-semibold text-3xl w-[284px] h-24'>
                        Hệ thống camera chuyên nghiệp của Leica
                    </div>
                    <div className='w-[284px] text-sm h-24'>
                        Ống kính quang học chuyên nghiệp của Leica Hai phong cách chụp ảnh Leica
                    </div>
                </div>
                <div className='grid grid-cols-5 grid-rows-3 h-[1200px] w-full gap-4 my-5'>
                    <div className='aos screenLa row-span-2 col-span-3 text-black pt-[70px] rounded-2xl' data-aos="fade-down-right">
                        <div className='text-[28px] font-semibold w-[320px] mx-auto text-center leading-8'>
                            Màn hình 144Hz CrystalRes AMOLED*
                        </div>
                        <div className=' text-sm w-[320px] mx-auto text-center leading-8 font-light mt-5'>
                            Chi tiết đáng kinh ngạc với khả năng phản hồi siêu mượt
                        </div>
                    </div>
                    <div className='aos choLa col-span-2  rounded-2xl relative ' data-aos="fade-down-left">
                        <video autoPlay muted loop className='w-full h-full fixed top-[-35px] right-0 -z-10' src="https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-13t-leica/PC/new_drop_of_water_pc.mp4" type="video/mp4"></video>
                        <div className='text-[40px] font-semibold w-[320px] mx-auto text-center leading-8 my-10'>
                            IP68
                        </div>
                        <div className='text-[28px] font-semibold w-[320px] mx-auto text-center leading-8'>
                            Chống nước & bụi theo tiêu chuẩn IP68*
                        </div>
                        <div className=' text-sm w-[320px] mx-auto text-center leading-8 font-light mt-5'>
                            Được thiết kế cho nhiều tình huống hơn
                        </div>
                    </div>
                    <div className='aos chipLa col-span-3 rounded-2xl pt-5' data-aos="fade-up-right" data-aos-duration="2000">
                        <div className='text-[28px] font-semibold w-[320px] mx-auto text-center leading-8'>
                            Vi xử lý MediaTek Dimensity 8200-Ultra
                        </div>
                        <div className=' text-sm w-[320px] mx-auto text-center leading-8 font-light mt-5'>
                            Hiệu suất tối ưu, hiệu quả năng lượng vượt trội
                        </div>
                    </div>
                    <div className='aos row-start-2 col-start-4 chargerLa row-span-2 col-span-2 rounded-2xl pt-10' data-aos="fade-up-left" data-aos-duration="2000">
                        <div className='text-[28px] font-semibold w-[320px] mx-auto text-center leading-8'>
                            42 phút đến 100%*
                        </div>
                        <div className=' text-base w-[320px] mx-auto text-center leading-8 font-light mt-3'>
                            Được trang bị công nghệ Sạc nhanh tăng cường 67W*
                        </div>
                        <div className='text-[28px] font-semibold w-[320px] mx-auto text-center leading-8 mt-10'>
                            Phát video lên tới 16 giờ*
                        </div>
                        <div className=' text-base w-[320px] mx-auto text-center leading-8 font-light mt-3'>
                            Pin dung lượng lớn 5000mAh (tiêu chuẩn)
                        </div>
                    </div>
                </div>
                <div className='text-3xl text-colorSearch'>Video giới thiệu</div>
                <div className='p-5'>
                <iframe width="1120" height="630" src={product?.videoIntro} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
            <div className='formLa w-full h-[880px] '>
                <div className='bg-colorSearch bg-opacity-70 w-full h-full py-36 px-96 text-white'>
                    <div className='w-full h-full bg-colorSearch p-10 rounded-xl'>
                    <div className='mb-6 text-3xl'>
                        Nhập thông tin của bạn để nhận được thông báo khi sản phẩm ra mắt
                    </div>
                    <label for="input-group-1" className="block mb-2 text-sm font-medium  dark:text-white">Tên khách hàng</label>
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                            </svg>
                        </div>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="input-group-1" className="text-black bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nguyễn Văn A"/>
                    </div>
                    <label for="website-admin" className="block mb-2 text-sm font-medium  dark:text-white mt-5">Email</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm  bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        </span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="website-admin" className="text-black rounded-none rounded-r-lg bg-gray-50 border  focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxx@gmail.com"/>
                    </div>
                    <label for="website-admin" className="block mb-2 text-sm font-medium  dark:text-white mt-5">Số điện thoại</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm  bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        </span>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" id="website-admin" className="text-black rounded-none rounded-r-lg bg-gray-50 border  focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09xxxxxxxx"/>
                    </div>
                    <label for="message" class="block mb-2 text-sm font-medium  dark:text-white mt-5">Your message</label>
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-black  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lý do bạn muốn nhận thông báo"></textarea>
                    <button onClick={() => handleSubmit()} type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3">Gửi thông tin</button>
                </div>
            </div>
            </div>

        </div>
    )
}
