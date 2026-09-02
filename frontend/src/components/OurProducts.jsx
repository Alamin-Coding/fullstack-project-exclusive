import { useEffect, useState } from 'react'
import Container from './Container';
import SecHead from './SecHead';
import Card from './Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router';

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

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className='absolute -top-20 right-0 text-2xl bg-[#F5F5F5] hover:bg-primary shadow-lg duration-300 p-2.75 rounded-full cursor-pointer'
            onClick={onClick}
        >
            <FaArrowRight />
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

const OurProducts = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [section, setSection] = useState({ title: 'Our Products', heading: 'Explore Our Products' })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_AUTH_URL}/product`).then(({ data }) => {
            const list = data.products || []
            const featured = list.filter((item) => item.isNewArrival)
            setProducts(featured.length ? featured : list)
        }).catch(console.log)

        axios.get(`${import.meta.env.VITE_AUTH_URL}/site`).then(({ data }) => {
            if (data.site?.ourProducts) setSection((prev) => ({ ...prev, ...data.site.ourProducts }))
        }).catch(console.log)
    }, [])

    const settings = {
        dots: false,
        infinite: products.length > 4,
        speed: 500,
        slidesToShow: Math.min(4, Math.max(products.length, 1)),
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 990, settings: { slidesToShow: Math.min(4, Math.max(products.length, 1)), slidesToScroll: 1 } },
            { breakpoint: 776, settings: { slidesToShow: Math.min(2, Math.max(products.length, 1)), slidesToScroll: 1 } },
            { breakpoint: 570, settings: { slidesToShow: Math.min(2, Math.max(products.length, 1)), slidesToScroll: 1 } }
        ]
    };
    return (
        <>
            <Container className='lg:mt-17.75 mt-10'>
                <SecHead
                    title={section.title}
                    heading={section.heading}
                />
                {products.length === 0 ? (
                    <p className='mt-10 text-center text-slate-500'>No products yet. Add products from the admin dashboard.</p>
                ) : (
                <Slider {...settings} className='lg:mt-15 mt-5 gap-2.5'>
                    {products.map((item) => (
                        <Card key={item._id} {...productCardProps(item)} />
                    ))}
                </Slider>
                )}
                <div className='text-center pt-13.25'>
                    <Button onClick={() => navigate('/shop')} className='lg:h-14 lg:w-58.5 h-8 w-40 bg-primary hover:bg-[#db4444d2] rounded-sm'> View All Products </Button>
                </div>

            </Container>
        </>
    )
}

export default OurProducts;
