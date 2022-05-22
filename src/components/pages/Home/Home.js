import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import CustomerReviews from './CustomerReviews';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Tools></Tools>
            <BusinessSummary></BusinessSummary>
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default Home;