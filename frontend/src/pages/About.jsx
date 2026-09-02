import { useEffect, useState } from 'react';
import Container from '../components/Container';
import BreadCrumb from '../components/BreadCrumb';
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { TiSocialLinkedin } from "react-icons/ti";
import Services from '../components/Services';
import ThirdHead from '../components/ThirdHead';
import { AiOutlineShop } from "react-icons/ai";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import axios from 'axios';

const statIcons = [AiOutlineShop, HiMiniCurrencyDollar, HiMiniShoppingBag, FaSackDollar];

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_AUTH_URL}/site`)
      .then(({ data }) => {
        if (data.site?.about) setAbout(data.site.about);
      })
      .catch(console.log);
  }, []);

  if (!about) {
    return (
      <Container>
        <div className='mt-5 lg:mt-20 mb-5 lg:mb-10.5'>
          <BreadCrumb />
        </div>
        <p className="py-20 text-center text-slate-500">Loading about content...</p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className='mt-5 lg:mt-20 mb-5 lg:mb-10.5'>
          <BreadCrumb />
        </div>
        <div className='lg:flex flex-col gap-12 pb-35'>
          <div className='mt-8 font-poppins w-100 pl-5 lg:pl-0 pr-5 lg:pr-0 lg:w-131.25'>
            <h2 className='font-inter font-bold text-[54px]'>{about.title}</h2>
            <p className='my-8'>{about.paragraph1}</p>
            <p>{about.paragraph2}</p>
          </div>
          {about.imageUrl && (
            <div className='absolute mt-5 lg:mt-0 right-0'>
              <img src={about.imageUrl} alt={about.title || "About"} className='w-162.5 h-153 pb-35' />
            </div>
          )}
        </div>

        {about.stats?.length > 0 && (
          <div className='flex flex-col lg:flex-row gap-3.5 justify-between items-center mt-100 lg:mt-35'>
            {about.stats.map((stat, index) => {
              const Icon = statIcons[index] || AiOutlineShop;
              return (
                <ThirdHead
                  key={stat.heading || index}
                  items={
                    <div className='px-3 py-3 bg-black rounded-full flex justify-center items-center border-10 border-gray-300'>
                      <Icon className='text-white text-3xl' />
                    </div>}
                  count={stat.count}
                  heading={stat.heading}
                  className='w-67.5 h-57.5 hover:border-primary'
                />
              );
            })}
          </div>
        )}

        {about.team?.length > 0 && (
          <div className='mt-15 flex flex-col lg:flex-row gap-3.5 justify-between items-center'>
            {about.team.map((member) => (
              <div key={member.name}>
                <div>
                  {member.imageUrl && <img src={member.imageUrl} alt={member.name} />}
                  <h3 className='font-bold text-[32px] mt-8'>{member.name}</h3>
                  <p className='mt-2'>{member.role}</p>
                </div>
                <div className='flex gap-3 mt-2'>
                  <CiTwitter />
                  <CiInstagram />
                  <TiSocialLinkedin />
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <Services />
        </div>

      </Container>
    </>
  );
};

export default About;
