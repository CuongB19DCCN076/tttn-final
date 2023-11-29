import React, { useCallback, useEffect, useState } from 'react'
import NavMenuComponent from '../../components/NavMenuComponent/NavMenuComponent'
import axios from 'axios';
import CardProduct from '../../components/CardProduct/CardProduct';
import Loading from '../../components/Loading/Loading';
import { useLocation } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState()
    const [productsTemp, setProductsTemp] = useState()
    const [loading, setLoading] = useState(false);
    const search = useLocation().pathname.split("/")[2];
    const [ram, setRam] = useState();
    const [price, setPrice] = useState();
    const handleFilter = (ramtemp, pricetemp) => {
        setRam(ramtemp);
        setPrice(pricetemp);
    }
    useEffect(() => { // Khi chuyển đường dẫn xong, cuộn lên đầu trang
        const fetchData = async () => {
            try {
                setLoading(true);
                const req = await axios.get(`https://localhost:7067/api/Product`);
                setProducts(req?.data.data);
                setProductsTemp(req?.data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    const filterProducts = useCallback(() => {
        if (products) {
            const newProduct = products?.filter((item) => {
                let condition;
                if (price === 5) {
                condition = item.price >= 20000000;
                } else if (price === 4) {
                condition = item.price >= 10000000 && item.price < 20000000;
                } else if (price === 3) {
                condition = item.price >= 5000000 && item.price < 10000000;
                } else if (price === 2) {
                condition = item.price >= 3000000 && item.price < 5000000;
                } else if (price === 1) {
                condition = item.price >= 1000000 && item.price < 3000000;
                } else {
                    condition = true;
                }
                return condition;
            });
            const newProduct2 = newProduct?.filter((item) => {
                console.log(item.ram)
                if (ram === 6) {
                    return item.ram === "12GB";
                } else if (ram === 5) {
                    return item.ram === "8GB";
                } else if (ram === 4) {
                    return item.ram === "6GB";
                } else if (ram === 3) {
                    return item.ram === "4GB";
                } else if (ram === 2) {
                    return item.ram === "3GB";
                } else if (ram === 1) {
                    return item.ram === "2GB";
                }
                return true;
            });
            setProductsTemp(newProduct2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ram, price]);
    useEffect(() => {
        filterProducts();
    }, [filterProducts]);
    return (
        <div className='bg-grayf5 w-full'>
            {loading && <Loading />}
            <div className='pt-4 w-full max-w-[1440px] flex justify-between px-6 mx-auto'>
                <NavMenuComponent fun={handleFilter} />
                <div className='w-full max-w-[1140px] bg-[white] p-4 mb-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                        {productsTemp && productsTemp.map((item, index) => {
                            return (<CardProduct key={index}
                                id={item.id}
                                image={
                                    item.image
                                }
                                title={
                                    item.name
                                }
                                star={
                                    item.rating
                                }
                                price={
                                    item.price
                                } 
                                status={item.status}
                                ram={item.ram}
                                memory={item.memory}
                                color={item.color}
                                chip={item.chip}
                                screen={item.screen}
                                camera={item.camera}
                                pin={item.pin}
                                />)
                        })}
                    </div>
                    <nav aria-label="Page navigation example " className='flex justify-center mt-4'>
                        <ul className="inline-flex -space-x-px text-sm cursor-pointer">
                            <li >
                                <span className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"><ion-icon name="arrow-back-outline"></ion-icon>Trước</span>
                            </li>
                            {/* {new Array(paginate.totalPage).fill(0).map((_, index) => {
                                return ( */}
                            <li >
                                <span className={` text-blue-600 bg-blue-50 first-line:text-gray-500 flex items-center justify-center px-3 h-8 ml-0 leading-tight   border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{1}</span>
                            </li>
                            {/* )
                            })} */}
                            <li >
                                <span className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Kế tiếp<ion-icon name="arrow-forward-outline"></ion-icon></span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    )
}
