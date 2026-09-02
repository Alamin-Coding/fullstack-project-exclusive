import Container from './Container';
import Flex from './Flex';
import { IoIosArrowDown } from "react-icons/io";
import ListUi from './ListUl'
import ListLi from './ListLi'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router'
import axios from 'axios';

const Header = () => {
    const [show, setShow] = useState(false);
    const [promo, setPromo] = useState({
        text: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
        linkText: "Shop Now",
        linkUrl: "/shop",
    });

    function handleClcik() {
        setShow(!show);
    }

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_AUTH_URL}/site`);
                if (data.site?.headerPromo) setPromo(data.site.headerPromo);
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, []);

    return (
        <>
            <header className='bg-black py-3 px-2 lg:px-0'>
                <Container>
                    <Flex className='justify-between items-center'>
                        <div className='text-white lg:text-sm text-[10px] text-center w-full lg:w-[90%] mx-auto'>
                            <h5 className='font-poppins'>{promo.text} <NavLink to={promo.linkUrl || '/shop'} className='underline font-bold' >{promo.linkText}</NavLink> </h5>
                        </div>
                        <div className='text-white flex items-center text-sm relative'>
                            <button className='flex cursor-pointer' onClick={handleClcik}>English <IoIosArrowDown className='text-2xl' /></button>
                            {
                                show ?
                                    <ListUi className='absolute top-9 right-0 px-5 z-20 bg-black text-white leading-9.25'>
                                        <ListLi className='cursor-pointer'> English</ListLi>
                                        <ListLi className='cursor-pointer'> Bangla</ListLi>
                                    </ListUi> : null
                            }
                        </div>
                    </Flex>
                </Container>
            </header>
        </>
    )
}

export default Header;
