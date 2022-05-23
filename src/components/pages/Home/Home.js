import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import ContactUs from './ContactUs';
import CustomerReviews from './CustomerReviews';
import Map from './Map';
import NewsLetter from './NewsLetter';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Tools></Tools>
            <BusinessSummary></BusinessSummary>
            <Map></Map>
            <CustomerReviews></CustomerReviews>
            <div id='contact' className='flex flex-col md:flex-row md:justify-around'>
                <div className='my-auto'>
                    <ContactUs></ContactUs> 
                </div>
                <div className=''>
                    <NewsLetter></NewsLetter>
                </div>
            </div>
        </div>
    );
};

export default Home;