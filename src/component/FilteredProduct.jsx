import { useState, useEffect } from 'react'
import Detail from './Detail'
// import Spinner from './spinner/Spinner'

const FilteredProduct = () => {
    const url = 'https://dummyjson.com/products'
    const [data, setData] = useState([])
    const [defData, setdefData] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [detail, setDetail] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    useEffect(() => {
        setIsFetching(true)
        async function fetched() {
            try {
                const res = await fetch(url)
                const { products } = await res.json()
                setData(products)
                setdefData(products)
                setIsFetching(false)
            } catch (error) {
                console.log(error);
            }
        }
        async function allCAtegories() {
            try {
                const res = await fetch(url + "/categories")
                const data = await res.json()
                let category = ["all", ...data]
                // console.log(category);
                setAllCategory(category)
            } catch (error) {
                console.log(error);
            }
        }
        allCAtegories()
        fetched()
    }, [])
    
    const inputHanler = async(e) => {
        let value = e.target.value.toLowerCase()
        try {
            const res = await fetch(url + `/search?q=${value}`)
            const { products } = await res.json()
            setData(products)
        } catch (error) {
            console.log(error);
        }
    }
    const selectHandler = async (value) => {
        setIsFetching(true)
        if (value === "all") {
            setData(defData)
        }
        else {
            try {
                const res = await fetch(url + `/category/${value}`)
                const { products } = await res.json()
                setData(products)
                setIsFetching(false)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const clickHandler = (item) => {
        setDetail(item)
    }

    return (
        <div>
            {/* {isFetching && <Spinner />} */}
            {detail && <Detail setDetail={setDetail} data={detail} />}
            <div className="sm:text-3xl text-xl font-semibold text-center  text-cyan-500 h-20 mb-20 flex items-center justify-between shadow-md shadow-white/10  px-8 sm:px-10 lg:px-24">
                <h1>Filtered and Fetched Elements</h1>
            </div>
            <div className='flex flex-col pb-10  px-8 sm:px-10 lg:px-24 relative'>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <select onChange={(e) => selectHandler(e.target.value)} id="selectElements" className="w-full md:w-52 text-white border-white/10">
                        {
                            allCategory.map((item, i) => (
                                <option key={i} className= 'text-black' value={item}>{item}</option>
                            ))
                        }
                    </select>
                    <input onChange={inputHanler} id="searching" className="w-full md:w-96 py-2 px-4 border-white/10 text-white  placeholder:text-white/70" placeholder="Searching products..." type="text" />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10'>
                    {
                        data?.map((item, i) => (
                            <div key={i} className='flex border border-white/10 flex-col gap-4 transition-all  rounded-md overflow-hidden bg-slate-800'>
                                <div className='aspect-[3/2]   w-full overflow-hidden cursor-pointer group'>
                                    <img className='w-full h-full object-cover object-center' src={item.thumbnail} alt="" />
                                </div>
                                <div className="flex flex-col flex-1 p-4 gap-2">
                                    <h1 className='text-lg font-bold text-white'>{item.title}</h1>
                                    <p className='font-semibold text-cyan-500'>${item.price}</p>
                                    <p className='font-semibold text-white'><span className="font-semibold">Stock: </span>{item.stock}</p>
                                    <p className='text-base text-white dark:text-slate-400'>{item.description}</p>
                                    <button onClick={() => clickHandler(item)} className='bg-cyan-500 text-white py-2 px-3 text-center mt-auto rounded detail'>Details</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default FilteredProduct