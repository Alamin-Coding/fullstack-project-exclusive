import { useEffect, useState } from 'react';
import SecHead from './SecHead';
import Container from './Container';
import ThirdHead from './ThirdHead';
import { BiCategory } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import axios from 'axios';

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

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_AUTH_URL}/category`)
            .then(({ data }) => setCategories(data.category || []))
            .catch(console.log)
    }, [])

    const settings = {
        dots: false,
        infinite: categories.length > 6,
        speed: 500,
        slidesToShow: Math.min(6, Math.max(categories.length, 1)),
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 990, settings: { slidesToShow: Math.min(6, Math.max(categories.length, 1)), slidesToScroll: 1 } },
            { breakpoint: 776, settings: { slidesToShow: Math.min(2, Math.max(categories.length, 1)), slidesToScroll: 1 } },
            { breakpoint: 570, settings: { slidesToShow: Math.min(2, Math.max(categories.length, 1)), slidesToScroll: 1 } }
        ]
    };

    return (
        <>
            <Container>
                <div className='lg:pt-20 pt-10 lg:pb-15 pb-7'>
                    <SecHead
                        title="Categories"
                        heading="Browse By Category"
                    />
                </div>

                <Slider {...settings}>
                    {categories.map((item) => (
                        <ThirdHead
                            key={item._id}
                            items={<BiCategory />}
                            heading={item.categoryName}
                        />
                    ))}
                </Slider>
            </Container>
        </>
    )
}

export default Category;
