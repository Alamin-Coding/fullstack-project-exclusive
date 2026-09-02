import { useEffect, useState } from "react";
import Container from "./Container";
import ListUl from "./ListUl";
import ListLi from "./ListLi";
import { BiCategory } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Banner from "../assets/Banner.jpg";
import axios from "axios";

const defaultSlides = [Banner, Banner, Banner, Banner, Banner];

const BannerImg = () => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [slides, setSlides] = useState(defaultSlides);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [categoryRes, siteRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_AUTH_URL}/category`),
          axios.get(`${import.meta.env.VITE_AUTH_URL}/site`),
        ]);

        setCategory(categoryRes.data.category || []);

        const urls = (siteRes.data.site?.banners || [])
          .map((item) => item.imageUrl?.trim())
          .filter(Boolean);

        setSlides(urls.length ? urls : defaultSlides);
      } catch (error) {
        console.log(error);
        setSlides(defaultSlides);
      } finally {
        setReady(true);
      }
    };

    load();
  }, []);

  const settings = {
    dots: slides.length > 1,
    infinite: slides.length > 1,
    autoplay: slides.length > 1,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots) => (
      <div className="banner-slider-dots">
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button type="button" className="banner-slider-dot" aria-label="banner slide" />
    ),
  };

  return (
    <Container>
      <div className="lg:flex">
        <div className="flex lg:hidden items-center gap-2 text-2xl font-bold pl-2.5 mt-5">
          <BiCategory onClick={() => setShow(!show)} className="lg:hidden cursor-pointer" />
          <h2>Category</h2>
        </div>

        <div className={`${show ? "block" : "hidden"} lg:flex w-[217px] sm:w-1/4 lg:border-r border-solid border-secondary`}>
          <ListUl className="lg:mt-6 mt-3 px-4 sm:px-0 sm:pr-4 lg:leading-9.5 font-poppins w-full">
            {category.map((item) => (
              <ListLi key={item._id}>{item.categoryName}</ListLi>
            ))}
          </ListUl>
        </div>

        <div className="banner-slider w-full lg:w-3/4 mt-6 lg:mt-10 lg:pl-10">
          {ready ? (
            <Slider key={slides.join("|")} {...settings}>
              {slides.map((src, index) => (
                <div key={`${src}-${index}`}>
                  <div className="overflow-hidden rounded-sm bg-[#F5F5F5]">
                    <img
                      src={src}
                      alt={`Banner ${index + 1}`}
                      className="h-auto w-full max-h-[420px] object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="overflow-hidden rounded-sm bg-[#F5F5F5]">
              <img src={Banner} alt="Banner" className="h-auto w-full max-h-[420px] object-cover" />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BannerImg;
