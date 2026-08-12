import { useEffect, useState } from 'react';
import Container from '../components/Container';
import { FiHeart } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import BreadCrumb from '../components/BreadCrumb';
import Size from '../components/Size';
import axios from 'axios';
import { useParams } from "react-router";
import { Rate } from 'antd';


const ProductDetails = () => {
    const [products, setProducts] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColour, setSelectedColour] = useState("");

    const { id } = useParams();

    async function getProduct() {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_AUTH_URL}/product/${id}`)
            const product = data.product || {}
            const images = (product.images || []).map((img) => img.url).filter(Boolean)

            setProducts(product);
            setProductImages(images);
            setSelectedImage(images[0] || "");
            setSelectedSize(product.size?.[0] || "");
            setSelectedColour(product.colours?.[0] || "");
        } catch (error) {
            console.log(error);
            setProducts({});
            setProductImages([]);
        }
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    return (
        <>
            <Container>
                <div className='mt-5 mb-20'>
                    <BreadCrumb />
                </div>

                <div className='flex gap-7.5'>
                    <div className='space-y-4'>
                        {
                            productImages.map((image, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className={`bg-[#f5f5f5] rounded-sm cursor-pointer ${selectedImage === image ? "ring-2 ring-primary" : ""}`}
                                    >
                                        <img className='w-42.5 h-34.5 object-cover' src={image} alt={products.title || "product"} />
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className='bg-[#f5f5f5] flex justify-between items-center'>
                        <img className='w-125 h-150 object-contain' src={selectedImage} alt={products.title || "product"} />
                    </div>

                    <div className='w-99.75'>
                        <div>
                            <h2 className='font-inter font-semibold text-2xl'>{products.title}</h2>
                        </div>

                        <div className='mt-4 flex gap-6'>
                            <div className='flex gap-2 text-[#FFAD33]'>
                                <Rate value={products.review || 0} />
                            </div>
                            <div>
                                <h4 className='text-[#807b7b] font-Poppins text-sm'>
                                    ( {products.review || 0} Reviews )
                                </h4>
                            </div>
                            <div className='border-[#807b7b] border-r-2'></div>
                            <div>
                                <h4 className={`font-Poppins text-sm ${products.stock > 0 ? "text-[#00FF66]" : "text-primary"}`}>
                                    {products.stock > 0 ? "In Stock" : "Out of Stock"}
                                </h4>
                            </div>
                        </div>

                        <div className='border-b-2 border-secondary mt-4'>
                            <h4 className='text-2xl font-inter'>${products.price}</h4>
                            <p className='text-sm font-poppins py-6'>{products.description}</p>
                        </div>

                        {products.colours?.length > 0 && (
                            <div className="flex items-center gap-4 py-6">
                                <h2 className="text-[20px]">Colours:</h2>
                                {products.colours.map((colour) => (
                                    <button
                                        key={colour}
                                        type="button"
                                        onClick={() => setSelectedColour(colour)}
                                        className={`w-6 h-6 rounded-full border-2 ${selectedColour === colour ? "border-black" : "border-transparent"} flex items-center justify-center`}
                                        title={colour}
                                    >
                                        <span
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: colour }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {products.size?.length > 0 && (
                            <div className='flex gap-6 items-center flex-wrap'>
                                <h2 className='text-xl font-inter'>Size:</h2>
                                {products.size.map((size) => (
                                    <div key={size} onClick={() => setSelectedSize(size)}>
                                        <Size heading={size} />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='flex mt-6 gap-4'>
                            <div className="flex items-center justify-between border border-gray-300 rounded-md overflow-hidden w-max text-lg font-medium">
                                <button className="w-10 h-10 border-r border-secondary hover:bg-primary">−</button>
                                <h2 className="w-10 h-10 flex items-center justify-center hover:bg-primary">
                                    2
                                </h2 >
                                <button className="w-10 h-10 border-l border-secondary hover:bg-primary rounded-r-md">
                                    +
                                </button>

                            </div>

                            <button className="w-[165px] h-[44px] bg-primary hover:bg-[#9d0606] text-white rounded-md  ">Buy Now</button>

                            <div className='flex justify-center items-center w-10 h-10 border-2 border-secondary hover:bg-primary hover:text-white rounded-md '>
                                <FiHeart />
                            </div>
                        </div>

                        <div>
                            <div className='border-2 border-secondary mt-6'>
                                <div className='flex gap-6 mt-4  border-b-2 border-secondary pb-4'>
                                    <div className='mt-2.5 text-2xl pl-4'>
                                        <TbTruckDelivery />
                                    </div>
                                    <div>
                                        <h4 className='font-medium'>Free Delivery</h4>
                                        <p className='text-[12px] border-b'>Enter your postal code for Delivery Availability</p>
                                    </div>
                                </div>

                                <div className='flex gap-6 pt-4 pb-6 '>
                                    <div className='mt-2.5 text-2xl pl-4'>
                                        <HiOutlineArrowPathRoundedSquare />
                                    </div>
                                    <div>
                                        <h4 className='font-medium'>Return Delivery</h4>
                                        <p className='text-[12px]'>Free 30 Days Delivery Returns. Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-6 '>
                    <div className='w-[20px] h-[40px] bg-primary mt-[170px] rounded-[4px]'>
                    </div>
                    <div className='text-primary font-semibold text-[16px] mt-[180px]'>Related Item</div>
                </div>
            </Container>
        </>
    )
}

export default ProductDetails;
