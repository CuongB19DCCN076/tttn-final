import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemNavProfile({iconImage, title, listChildren = [], hrefPa = ""}) {
  return (
    <Link to={hrefPa} className='text-colorSearch cursor-pointer'>
        <div className='flex w-full items-center mb-4'>
            <ion-icon name={iconImage}></ion-icon>
            <div className='font-medium text-sm ms-[10px] text-blackNav'>
                {title}
            </div>
        </div>
        <div className='w-full ps-8'>
            {listChildren.map((item, index) => {
                return <Link to={item.path} key={index} className='text-[#000000a6] hover:text-colorSearch block text-sm mb-4'>{item.name}</Link>
            })}
        </div>
    </Link>
  )
}
