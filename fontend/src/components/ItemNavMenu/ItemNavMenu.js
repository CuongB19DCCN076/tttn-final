import React from 'react'

export default function ItemNavMenu({title, name}) {
  return (
    <div className='w-full h-12 py-2 px-4 flex items-center cursor-pointer rounded-lg bg-[#fff] hover:bg-graye5 active:bg-graycb'>
        <input type='radio' name={name} className='me-4'/>
        <span className='text-[14px] font-normal leading-[150%] text-blackNav'>{title}</span>
    </div>
  )
}
