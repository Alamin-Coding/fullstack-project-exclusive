import { useEffect, useState } from 'react'
import Container from './Container';
import SecHead from './SecHead';
import PlaystationImg from '../assets/playstation.png';
import WomenImg from '../assets/women.png';
import SpeekersImg from '../assets/speeker.png';
import PerfumeImg from '../assets/perfume.png';
import axios from 'axios';
import { useNavigate } from 'react-router';

const fallbackItems = [
    { title: 'PlayStation 5', description: 'Black and White version of the PS5 coming out on sale.', imageUrl: PlaystationImg, linkUrl: '/shop' },
    { title: "Women’s Collections", description: 'Featured woman collections that give you another vibe.', imageUrl: WomenImg, linkUrl: '/shop' },
    { title: 'Speakers', description: 'Amazon wireless speakers', imageUrl: SpeekersImg, linkUrl: '/shop' },
    { title: 'Perfume', description: 'GUCCI INTENSE OUD EDP', imageUrl: PerfumeImg, linkUrl: '/shop' },
]

const NewArival = () => {
    const navigate = useNavigate()
    const [section, setSection] = useState({ title: 'Featured', heading: 'New Arrival', items: fallbackItems })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_AUTH_URL}/site`).then(({ data }) => {
            const arrival = data.site?.newArrival
            if (!arrival) return
            const items = (arrival.items || []).map((item, index) => ({
                ...fallbackItems[index],
                ...item,
                imageUrl: item.imageUrl || fallbackItems[index]?.imageUrl,
            }))
            setSection({
                title: arrival.title || 'Featured',
                heading: arrival.heading || 'New Arrival',
                items: items.length ? items : fallbackItems,
            })
        }).catch(console.log)
    }, [])

    const items = section.items.length ? section.items : fallbackItems

    return (
        <>
            <Container className='lg:mt-25'>
                <SecHead
                    title={section.title}
                    heading={section.heading}
                />
                <div className='lg:flex justify-between lg:gap-7.5 lg:mt-15 mt-5 mx-auto'>
                    <div className='lg:flex justify-between items-center bg-black lg:w-142.5 relative'>
                        <img src={items[0]?.imageUrl} alt="" />
                        <div className='text-white absolute left-8 bottom-8 w-60.5'>
                            <h2 className='text-2xl font-inter font-semibold'>{items[0]?.title}</h2>
                            <p className='py-4 text-sm text-[#FAFAFA]'>{items[0]?.description}</p>
                            <button onClick={() => navigate(items[0]?.linkUrl || '/shop')} className='border-b border-secondary font-poppins cursor-pointer '>Shop Now</button>
                        </div>
                    </div>
                    <div>
                        <div className='w-full relative lg:mt-0 mt-3'>
                            <img className='mx-auto lg:w-full' src={items[1]?.imageUrl} alt="" />
                            <div className='text-white absolute left-8 bottom-8 w-60.5'>
                                <h2 className='text-2xl font-inter font-semibold'>{items[1]?.title}</h2>
                                <p className='py-4 text-sm text-[#FAFAFA]'>{items[1]?.description}</p>
                                <button onClick={() => navigate(items[1]?.linkUrl || '/shop')} className='border-b border-secondary font-poppins cursor-pointer '>Shop Now</button>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 lg:gap-7.5 gap-3 lg:mt-7.5 mt-3 text-center'>
                            <img className='mx-auto' src={items[2]?.imageUrl} alt="" />
                            <img className='mx-auto' src={items[3]?.imageUrl} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default NewArival;
