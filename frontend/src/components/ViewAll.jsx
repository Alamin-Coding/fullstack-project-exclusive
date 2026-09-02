import { useEffect, useState } from 'react';
import Container from './Container';
import SecHead from './SecHead';
import Card from './Card';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router';

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

const ViewAll = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [section, setSection] = useState({ title: "This Month", heading: "Best Selling Products" })

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_AUTH_URL}/product`).then(({ data }) => {
      const list = data.products || []
      const best = list.filter((item) => item.isBestSelling)
      setProducts((best.length ? best : list).slice(0, 4))
    }).catch(console.log)

    axios.get(`${import.meta.env.VITE_AUTH_URL}/site`).then(({ data }) => {
      if (data.site?.bestSelling) setSection((prev) => ({ ...prev, ...data.site.bestSelling }))
    }).catch(console.log)
  }, [])

  return (
    <>
      <Container className='pt-20'>
        <SecHead
          title={section.title}
          heading={section.heading}
        />
        <div className='relative lg:-right-108 lg:-top-15 -right-26 -top-7.5'>
          <Button onClick={() => navigate('/shop')} className='absolute lg:px-12 lg:py-4 px-3 py-1 bg-primary hover:bg-[#db4444d2] rounded-sm'>View All</Button>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-7.5 lg:mt-15 mt-10'>
          {products.map((item) => (
            <div key={item._id}>
              <Card {...productCardProps(item)} />
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default ViewAll;
