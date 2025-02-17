import React from 'react'

function CTA({content}) {
    return (
        <button className='rounded-2xl bg-blue-600 px-4 font-light h-[60%] duration-100 hover:scale-105'>
            {content}
        </button> 
    )
}

export default CTA
