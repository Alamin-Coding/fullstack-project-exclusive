import { useEffect, useState } from 'react';
import Container from './Container';
import JblCounter from './JblCounter';
import axios from 'axios';
import { useNavigate } from 'react-router';
import JblImg from '../assets/jbl.png';

const Jbl = () => {
    const navigate = useNavigate()
    const [promo, setPromo] = useState({
        badge: 'Categories',
        heading: 'Enhance Your Music Experience',
        buttonText: 'Buy Now!',
        buttonUrl: '/shop',
        imageUrl: '',
        endDate: '2026-12-31 23:59:00',
    })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_AUTH_URL}/site`).then(({ data }) => {
            if (data.site?.musicPromo) setPromo((prev) => ({ ...prev, ...data.site.musicPromo }))
        }).catch(console.log)
    }, [])

    return (
        <>
            <Container>
                <div
                    className='relative lg:mt-35 mt-15 bg-center bg-no-repeat bg-cover lg:h-125 h-60 w-full'
                    style={{
                        backgroundImage: `url(${promo.imageUrl || JblImg})`,
                    }}
                >
                    <div className='absolute lg:w-110.75 lg:left-14 lg:top-17.25 left-8 top-7.25'>
                        <h2 className='text-[12px] lg:text-[16px] font-poppins font-semibold text-[#00FF66] '>{promo.badge}</h2>
                        <h2 className='font-inter font-semibold text-white lg:text-[48px] lg:py-8 py-4'>{promo.heading}</h2>
                        <JblCounter className="text-black pb-8" endDate={promo.endDate}/>
                        <button
                            onClick={() => navigate(promo.buttonUrl || '/shop')}
                            className='lg:px-12 lg:py-4 px-3 py-2 bg-[#00FF66] text-white hover:text-[#00ff66] lg:text-2xl text-xs hover:bg-transparent border-1 border-[#00FF66] duration-300 rounded-sm'
                        >
                            {promo.buttonText}
                        </button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Jbl;
