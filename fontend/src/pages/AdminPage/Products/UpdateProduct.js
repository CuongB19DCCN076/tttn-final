import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { storage } from '../../../fisebase';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Loading from '../../../components/Loading/Loading';

export default function UpdateProduct({ idProduct, parentCallback }) {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [pin, setPin] = useState("");
    const [screen, setScreen] = useState("");
    const [system, setSystem] = useState("");
    const [chip, setChip] = useState("");
    const [camera, setCamera] = useState("");
    const [charger, setCharger] = useState("");
    const [describe, setDescribe] = useState("");
    const [quantityInStock, setQuantityInStock] = useState("");
    const [status, setStatus] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [quantitySold, setQuantitySold] = useState("");
    const [rating, setRating] = useState("");
    const [ram, setRam] = useState("");
    const [memory, setMemory] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState("");
    const [videoIntro, setvideoIntro] = useState("");
    const [isChangedImage, setIsChangedImage] = useState(false);
    const [videoReview, setVideoReview] = useState("");
    const handleModalUpdate = () => {
        document.getElementById("authentication-modal").classList.toggle("hidden");
    }
    const handleImage = (e) => {
        const imageTemp = e.target.files[0];
        setImage(imageTemp);
        setIsChangedImage(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await axios.get(`https://localhost:7067/api/Product/${idProduct}`)
                setIsLoading(false);
                const dataa = data?.data.data;
                setSystem(dataa.system);
                setCamera(dataa.camera);
                setCharger(dataa.charger);
                setChip(dataa.chip);
                setLaunchDate(dataa.launchDate.substring(0, 10));
                setScreen(dataa.screen);
                setStatus(dataa.status);
                setImage(dataa.image);
                setPin(dataa.pin);
                setQuantityInStock(`${dataa.quantityInStock}`);
                setDescribe(dataa.describe);
                setName(dataa.name);
                setRating(`${dataa.rating}`);
                setPrice(`${dataa.price}`);
                setRam(`${dataa.ram}`);
                setColor(`${dataa.color}`);
                setMemory(`${dataa.memory}`);
                setQuantitySold(`${dataa.quantitySold === undefined ? 0 : dataa.quantitySold}`);
                setvideoIntro(dataa.videoIntro);
                setVideoReview(dataa.videoReview);
            } catch (e) {
                toast.error(e);
            }
        }
        fetchData()
    }, [idProduct])

    const handleSubmit = () => {
        const dataTemp = {
            id: idProduct,
            image,
            system,
            camera,
            charger,
            chip,
            launchDate,
            createAt: "2023-10-31T09:00:45.599Z",
            updateAt: "2023-10-31T09:00:45.599Z",
            screen,
            status: Number(status),
            name,
            ram,
            pin,
            memory,
            price: Number(price),
            quantityInStock: Number(quantityInStock),
            rating: Number(rating),
            quantitySold: Number(quantitySold),
            describe,
            color,
            videoIntro: videoIntro ? videoIntro : "",
            videoReview: videoReview ? videoReview : ""
        }
        console.log(dataTemp);
        if (image === "") {
            toast.warning("vUI LÒNG CHỌN 1 ẢNH!");
            return;
        }
        if (isChangedImage) {
            const imageRef = ref(storage, `images/` + name + ram);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(ref(storage, `images/` + name + ram)).then(async (url) => {
                    await axios.put(`https://localhost:7067/api/Product/${idProduct}`, { ...dataTemp, image: url }).then((data) => {
                        console.log(data?.status)    
                    if (data?.status === 201) {
                            toast.success("Cập nhật thành công!");
                            parentCallback();
                            handleModalUpdate();
                        } else {
                            toast.error("Cập nhật thất bại!");
                        }
                    }).catch(function (error) {
                        // xử trí khi bị lỗi
                        console.log(error);
                    })
                })
            });
        } else {
            const fetchData = async () => {
                await axios.put(`https://localhost:7067/api/Product/${idProduct}`, { ...dataTemp, image: image }).then((data) => {
                    console.log(data?.status)    
                if (data?.status === 201) {
                        toast.success("Cập nhật thành công!");
                        parentCallback();
                        handleModalUpdate();
                    } else {
                        toast.error("Cập nhật thất bại!");
                    }
                }).catch(function (error) {
                    // xử trí khi bị lỗi
                    console.log(error);
                })
            }
            fetchData();
        }
    }
    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="absolute top-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto hiddenScroll md:inset-0 h-[calc(100%-1rem)] max-h-full">
            {isLoading && <Loading />}
            <div className="relative w-full mx-auto max-w-3xl max-h-full shadow-2xl">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={() => handleModalUpdate()} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-colorSearch dark:text-white">Cập nhật sản phẩm</h3>
                        <div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_text" id="floating_text"
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                    value={name}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required />
                                <label for="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên sản phẩm</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_text" id="floating_text"
                                    onChange={
                                        (e) => setDescribe(e.target.value)
                                    }
                                    value={describe}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required />
                                <label for="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mô tả sản phẩm</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="repeat_text" id="_repeat_text"
                                        onChange={
                                            (e) => setPrice(e.target.value)
                                        }
                                        value={price}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_repeat_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giá sản phẩm(XXX.XXX.XXX VNĐ)</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="repeat_text" id="_repeat_text"
                                        onChange={
                                            (e) => setQuantitySold(e.target.value)
                                        }
                                        value={quantitySold}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_repeat_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Đã bán</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="floating_first_name" id="floating_first_name"
                                        onChange={
                                            (e) => setQuantityInStock(e.target.value)
                                        }
                                        value={quantityInStock}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số lượng sản phẩm(Nhập số)</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setRating(e.target.value)
                                        }
                                        value={rating}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Đánh giá(Nhập số 0-5{<StarRatings rating={1}
                                        starRatedColor="rgb(255, 196, 0)"
                                        numberOfStars={1}
                                        name='rating'
                                        starDimension="16px"
                                        starSpacing="0px" />})</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="floating_first_name" id="floating_first_name"
                                        onChange={
                                            (e) => setCharger(e.target.value)
                                        }
                                        value={charger}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sạc</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setCamera(e.target.value)
                                        }
                                        value={camera}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Camera
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="floating_first_name" id="floating_first_name"
                                        onChange={
                                            (e) => setChip(e.target.value)
                                        }
                                        value={chip}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Chip</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="date" name="_name"
                                        onChange={
                                            (e) => setLaunchDate(e.target.value)
                                        }
                                        value={launchDate}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Ngày ra mắt
                                    </label>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 md:gap-6">

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setSystem(e.target.value)
                                        }
                                        value={system}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Hệ điều hành
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setPin(e.target.value)
                                        }
                                        value={pin}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Dung lượng pin
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setScreen(e.target.value)
                                        }
                                        value={screen}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Màn hình
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <div>
                                        Trạng thái
                                    </div>
                                    <select value={status}
                                        onChange={
                                            (e) => setStatus(e.target.value)
                                        }
                                        id=""
                                        className=' text-sm'>
                                        <option value="1" className="option">Đang bán</option>
                                        <option value="2" className="option">Sắp ra mắt</option>
                                        <option value="3" className="option">Ngừng bán</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setRam(e.target.value)
                                        }
                                        value={ram}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Ram
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setColor(e.target.value)
                                        }
                                        value={color}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Màu
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="_name"
                                        onChange={
                                            (e) => setMemory(e.target.value)
                                        }
                                        value={memory}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required />
                                    <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Bộ nhớ
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="floating_first_name"
                            onChange={
                                (e) => setvideoIntro(e.target.value)
                            }
                            value={videoIntro}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Video giới thiệu</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="_name"
                            onChange={
                                (e) => setVideoReview(e.target.value)
                            }
                            value={videoReview}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label for="_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex items-center">Video đánh giá 
                        </label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                    <iframe width="330" height="220" src={videoIntro} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <iframe width="330" height="220" src={videoReview} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
                            <div className='h-96 w-full border border-gray-300 mb-6 addImage relative flex justify-center'>
                                <input type='file' id='addImage'
                                    onChange={
                                        (e) => handleImage(e)
                                    }
                                    className='hidden' />
                                {JSON.stringify(image) === '{}' ?
                                    <img src={URL.createObjectURL(image)} alt='' className='h-full max-h-96 object-fill' />
                                    :
                                    <img src={image} alt='' className='h-full max-h-96 object-fill' />}
                                <label for="addImage" className='h-full w-full block cursor-pointer absolute top-0 left-0 z-20 '></label>
                            </div>
                            <button onClick={
                                () => handleSubmit()
                            }
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
