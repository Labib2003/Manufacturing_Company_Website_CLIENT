import React from 'react';
import bannerImage from '../../../images/banner.jpg'

const Banner = () => {
    return (
        <div className="hero mb-32">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img className='rounded-lg w-full' src={bannerImage} alt='tools' />
                <div className='text-left mr-10'>
                    <h1 className="text-5xl font-bold">IronWorks</h1>
                    <p className="my-10 text-xl leading-relaxed">IronWorks is one of the largest manufacturers of professional hand tools in the South Asian region, serving the woodworking, vehicle service and assembly, electronics, construction and DIY markets.</p>
                    <a
                        className="btn btn-secondary"
                        href='#business'
                    >Learn More</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;