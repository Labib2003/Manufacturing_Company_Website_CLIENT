import React from 'react';
import bannerImage from '../../../images/banner.jpg'

const Banner = () => {
    return (
        <div class="hero mb-32">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img className='rounded-lg w-full' src={bannerImage} alt='tools' />
                <div className='text-left mr-10'>
                    <h1 class="text-5xl font-bold">IronWorks</h1>
                    <p class="my-10 text-xl leading-relaxed">IronWorks is one of the largest manufacturers of professional hand tools in the south asian region, serving the woodworking, vehicle service and assembly, electronics, construction and DIY markets.</p>
                    <a class="btn btn-primary" href='#tools'>Get Started</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;