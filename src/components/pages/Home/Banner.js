import React from 'react';
import bannerImage from '../../../images/banner.jpg'

const Banner = () => {
    return (
        <div class="hero mb-32">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img className='rounded-lg' src={bannerImage} alt='tools' />
                <div className='text-left mr-10'>
                    <h1 class="text-5xl font-bold">IronWorks</h1>
                    <p class="my-10 text-xl">IronWorks is one of the largest manufacturers of professional hand tools in the world, serving the woodworking, vehicle service and assembly, electronics, construction and DIY markets.</p>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;