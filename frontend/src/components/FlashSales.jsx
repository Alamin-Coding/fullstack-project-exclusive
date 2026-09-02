import { useEffect, useState } from 'react';
import Container from './Container';
import Counter from './Counter';
import SecHead from './SecHead';
import Card from './Card';
import Button from './Button';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router';

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className='absolute -top-20 right-2 text-2xl bg-[#F5F5F5] hover:bg-primary shadow-lg duration-300 p-2.75 rounded-full cursor-pointer'
            onClick={onClick}
        >
            <FaArrowRight />
        </div>
    );
}
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className='absolute -top-20 right-16 text-2xl bg-[#F5F5F5] hover:bg-primary shadow-lg duration-300 p-2.75 rounded-full cursor-pointer'
            onClick={onClick}
        >
            <FaArrowLeftLong />
        </div>
    );
}

const productCardProps = (item) => {
    const id = item._id || item.id
    const discount = item.discountPercentage
    return {
        productDetails: { ...item, id },
        id,
        img: item.images?.[0]?.url,
        heading: item.title,
        price: item.price,
        pastprice: discount ? Math.floor(item.price / (1 - discount / 100)) : undefined,
        rating: item.review,
        discount: discount ? `-${discount}%` : undefined,
        reviews: item.review,
    }
}

const FlashSales = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [section, setSection] = useState({ title: "Today's", heading: "Flash Sales", endDate: "2026-12-31 23:59:00" })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_AUTH_URL}/product`).then(({ data }) => {
            const list = data.products || []
            const flash = list.filter((item) => item.isFlashSale)
            setProducts(flash.length ? flash : list)
        }).catch(console.log)

        axios.get(`${import.meta.env.VITE_AUTH_URL}/site`).then(({ data }) => {
            if (data.site?.flashSale) setSection((prev) => ({ ...prev, ...data.site.flashSale }))
        }).catch(console.log)
    }, [])

    const settings = {
        dots: false,
        infinite: products.length > 4,
        speed: 500,
        slidesToShow: Math.min(4, Math.max(products.length, 1)),
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            { breakpoint: 990, settings: { slidesToShow: Math.min(4, Math.max(products.length, 1)), slidesToScroll: 1 } },
            { breakpoint: 776, settings: { slidesToShow: Math.min(2, Math.max(products.length, 1)), slidesToScroll: 1 } },
            { breakpoint: 570, settings: { slidesToShow: Math.min(2, Math.max(products.length, 1)), slidesToScroll: 1 } }
        ]
    };

    return (
        <>
            <Container className='lg:pt-38.5 pt-10'>
                <div>
                    <SecHead
                        title={section.title}
                        heading={section.heading}
                    />
                    <Counter endDate={section.endDate} />
                </div>

                {products.length === 0 ? (
                    <p className='mt-10 text-center text-slate-500'>No flash sale products yet. Mark products from the admin dashboard.</p>
                ) : (
                <Slider {...settings} className='mt-10'>
                    {products.map((item) => (
                        <div key={item._id}>
                            <Card {...productCardProps(item)} />
                        </div>
                    ))}
                </Slider>
                )}
                <div className='text-center pt-13.25'>
                    <Button onClick={() => navigate('/shop')} className='lg:h-14 lg:w-58.5 h-8 w-40 bg-primary hover:bg-[#db4444d2] rounded-sm'> View All Products </Button>
                </div>
                <div className='border-secondary border-b-2 w-full pt-15'></div>
            </Container>
        </>
    )
}

export default FlashSales;
