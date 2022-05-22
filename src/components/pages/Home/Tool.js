import React from 'react';

const Tool = ({ tool }) => {
    const { name, image, description, min_order_quantity, available_quantity, per_unit_price } = tool;
    return (
        <div id='tools' class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src={image} alt="tool" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title text-3xl mb-5">{name}</h2>
                <div className='text-left text-xl mb-5'>
                    <p className='mb-3 leading-relaxed'>{description}</p>
                    <p className='mb-1'>Minimum Order Quantity: {min_order_quantity}</p>
                    <p className='mb-1'>Available Quantity: {available_quantity}</p>
                    <p className='mb-1'>Price (per unit): ${per_unit_price}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;