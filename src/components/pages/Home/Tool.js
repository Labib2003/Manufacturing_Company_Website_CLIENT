import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tool = ({ tool }) => {
    // props
    const { _id, name, image, description, min_order_quantity, available_quantity, per_unit_price } = tool;
    const navigate = useNavigate();

    const navigateToUpdate = (id) => {
        navigate(`/tools/${id}`);
    };

    return (
        <div id='tools' className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="tool" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl mb-5">{name}</h2>
                <div className='text-left text-xl mb-5'>
                    <p className='mb-3 leading-relaxed'>{description}</p>
                    <p className='mb-1'>Minimum Order Quantity: {min_order_quantity}</p>
                    <p className='mb-1'>Available Quantity: {available_quantity}</p>
                    <p className='mb-1'>Price (per unit): ${per_unit_price}</p>
                </div>
                <div className="card-actions">
                    <button
                        onClick={() => navigateToUpdate(_id)}
                        className="btn btn-secondary"
                    >Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;