import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Card from './Card';
import { useSelector } from 'react-redux';

const Pagination = ({ itemsPerPage }) => {

    const getAllProducts = useSelector((state) => state.allProduct.value)

    const items = getAllProducts || [];

    function Items({ currentItems }) {
        return (
            <>
                <div className='flex flex-wrap justify-between gap-6'>
                    {currentItems &&
                        currentItems.map((item) => {
                            const productId = item._id || item.id
                            return (
                            <Card
                                productDetails={{ ...item, id: productId }}
                                id={productId}
                                key={productId}
                                img={item.images?.[0]?.url || item.thumbnail}
                                heading={item.title}
                                price={item.price}
                                pastprice={item.discountPercentage
                                    ? Math.floor(item.price / (1 - item.discountPercentage / 100))
                                    : undefined}
                                rating={item.review ?? item.rating}
                                discount={item.discountPercentage}
                                reviews={item.review ?? item.reviews?.length}
                            />
                            )
                        })}
                </div>
            </>
        );
    }

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + Number(itemsPerPage);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / Number(itemsPerPage)) || 0;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * Number(itemsPerPage)) % items.length;

        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=""
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel=""
                renderOnZeroPageCount={null}
                className='flex gap-2 mt-4'
                pageClassName='px-6 py-0.5 text-white bg-black cursor-pointer'
            />
        </>
    )
}

export default Pagination;
