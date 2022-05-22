import React from 'react';

const ContactUs = () => {
    return (
        <div className='grid place-content-center mb-32 mr-10'>
            <div>
                <p className='text-5xl font-bold text-center mb-5'>Contact us!</p>
            </div>
            <div className='flex my-auto mb-5 mx-auto'>
                <svg className="w-9 h-9 mr-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                <p className='text-xl my-auto'>labib.salimi30@gmail.com</p>
            </div>
            <div className='flex my-auto mb-5 mx-auto'>
                <svg className="w-9 h-9 mr-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                <p className='text-xl my-auto'>Dhaka, Bangladesh</p>
            </div>
            <div className='flex my-auto mb-5 mx-auto'>
                <svg className="w-9 h-9 mr-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                <p className='text-xl my-auto'>0123456789</p>
            </div>
        </div>
    );
};

export default ContactUs;