import { useEffect, useState } from 'react'
import Container from './Container';
import { TbTruckDelivery } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BiSolidCheckShield } from "react-icons/bi";
import axios from 'axios';

const icons = [TbTruckDelivery, TfiHeadphoneAlt, BiSolidCheckShield]

const fallback = [
    { title: 'FREE AND FAST DELIVERY', subtitle: 'Free delivery for all orders over $140' },
    { title: '24/7 CUSTOMER SERVICE', subtitle: 'Friendly 24/7 customer support' },
    { title: 'MONEY BACK GUARANTEE', subtitle: 'We reurn money within 30 days' },
]

const Services = () => {
    const [services, setServices] = useState(fallback)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_AUTH_URL}/site`).then(({ data }) => {
            if (data.site?.services?.length) setServices(data.site.services)
        }).catch(console.log)
    }, [])

    return (
        <>
            <Container>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3.5 mt-25'>
                    {services.map((item, index) => {
                        const Icon = icons[index] || TbTruckDelivery
                        return (
                    <div key={item.title || index} className='flex flex-col text-center items-center'>
                        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center border-10 border-gray-300">
                            <Icon className="text-white text-2xl" />
                        </div>
                        <div className='font-poppins pt-6'>
                            <h5 className='text-xl font-semibold'>{item.title}</h5>
                            <h6 className='text-sm'>{item.subtitle}</h6>
                        </div>
                    </div>
                        )
                    })}
                </div>
            </Container>
        </>
    )
}

export default Services;
