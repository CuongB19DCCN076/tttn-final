import React, { useEffect, useState } from 'react'
import './style.scss'

export default function NavMenuComponent(props) {
    const fun = props?.fun;
    const [ram, setRam] = useState(0);
    const [price, setPrice] = useState(0);
    const listItem = [
        { title: "Tất cả" },
        { title: "Từ 1 - 3 Triệu" },
        { title: "Từ 3 - 5 Triệu" },
        { title: "Từ 5 - 10 Triệu" },
        { title: "Từ 10 - 20 Triệu" },
        { title: "Trên 20 Triệu" },
    ]
    const listItem1 = [
        { title: "Tất cả" },
        { title: "2GB" },
        { title: "3GB" },
        { title: "4GB" },
        { title: "6GB" },
        { title: "8GB" },
        { title: "12GB" },
    ]
    useEffect(() => {
        fun(ram, price);
    }, [fun, price, ram])
    return (
        <div className='hidden xl:block w-full max-w-[230px] navMenu sticky top-4 bg-[#fff] rounded-lg py-3 px-2 mb-4'>
            <div className='text-[14px] font-bold leading-[150%] text-blackNav mb-2 ps-4'>
                Lọc theo Giá tiền
            </div>
            {listItem.map((item, index) => {
                return (<label htmlFor={`price${index}`} onClick={() => setPrice(index)} key={index} className='w-full h-12 py-2 px-4 flex items-center cursor-pointer rounded-lg bg-[#fff] hover:bg-graye5 active:bg-graycb'>
                    <input type='radio' id={`price${index}`} name={"Price"} className='me-4 peer/published' />
                    <span className='text-[14px] peer- font-normal leading-[150%] text-blackNav peer-checked/draft:text-sky-500 h-full flex items-center' >{item.title}</span>
                </label>)
            })}
            <div className='h-4 bg-colorSearch w-full mt-2'>
            </div>
            <div className='text-[14px] font-bold leading-[150%] text-blackNav mt-8 mb-2 ps-4 '>
                Lọc theo RAM
            </div>
            {listItem1.map((item, index) => {
                return (<label htmlFor={`ram${index}`} onClick={() => setRam(index)} key={index} className='w-full h-12 py-2 px-4 flex items-center cursor-pointer rounded-lg bg-[#fff] hover:bg-graye5 active:bg-graycb'>
                    <input type='radio' id={`ram${index}`} name={"Ram"} className='me-4 peer/published' />
                    <span className='text-[14px] peer- font-normal leading-[150%] text-blackNav peer-checked/draft:text-sky-500 h-full flex items-center' >{item.title}</span>
                </label>)
            })}
        </div>
    )
}
