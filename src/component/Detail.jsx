import React from 'react'
const Detail = ({ data, setDetail }) => {
    console.log(data);
    return (
        <div className='fixed z-40 top-0 left-0  right-0 bottom-0 bg-indigo-900 px-8 sm:px-10 lg:px-24 pt-6 sm:pt-20'>
            <div className='flex flex-col sm:flex-row transition-all border dark:border-white/10 border-black/10 gap-3 shadow-md  rounded-md overflow-hidden bg-white/10'>
                <div className='aspect-[3/2] overflow-hidden cursor-pointer group'>
                    <img className='w-full h-full object-cover object-center' src={data.thumbnail} alt="" />
                </div>
                <div className="flex flex-col p-4 gap-2 pt-5 flex-1">
                    <h1 className='text-3xl font-bold text-white'>{data.title}</h1>
                    <p className='font-bold text-white'><span className="font-semibold">Brand:</span> {data.brand}</p>
                    <p className='font-semibold text-cyan-500'><span className="font-semibold">Price:</span> ${data.price}</p>
                    <p className='font-semibold text-yellow-500'><span className="font-semibold">Stock: </span>{data.stock}</p>
                    <p className='text-slate-400'><span className="font-semibold">Descritption:</span> {data.description}</p>
                    <button onClick={()=>setDetail(null)} className="bg-red-500 text-white sm:w-32 py-2 px-3 text-center sm:ml-auto mt-auto rounded back">Back</button>
                </div>
            </div>
        </div>
    )
}

export default Detail