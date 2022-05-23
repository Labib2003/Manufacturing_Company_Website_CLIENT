import React from 'react';

const BusinessSummary = () => {
    return (
        <div id='business' className='mb-32'>
            <div className="divider"></div>
            <h1 className='text-5xl font-bold text-center'>Why should you choose us?</h1>
            <div className="divider mb-10"></div>
            <div className='grid grid-cols-1 md:grid-cols-3 mb-20'>
                <div className='text-center text-6xl mb-10'>
                    <svg className="w-36 h-36 mx-auto mb-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>
                    <p className='font-bold mb-5'>5</p>
                    <p className='text-xl'>Regional Offices</p>
                </div>
                <div className='text-center text-6xl mb-10'>
                    <svg className="w-36 h-36 mx-auto mb-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>
                    <p className='font-bold mb-5'>137</p>
                    <p className='text-xl'>Dealers Across the Globe</p>
                </div>
                <div className='text-center text-6xl mb-10'>
                    <svg className="w-36 h-36 mx-auto mb-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                    <p className='font-bold mb-5'>200K+</p>
                    <p className='text-xl'>Happy Clients</p>
                </div>
            </div>
            <div className='flex justify-around'>
                <div className='text-2xl'>
                    <p className='font-bold'>Have any questions?</p>
                    <p className='font-thin'>Dont hesitate to contact us.</p>
                </div>
                <a className="btn btn-primary my-auto" href='#contact'>Contact Us</a>
            </div>
        </div>
    );
};

export default BusinessSummary;