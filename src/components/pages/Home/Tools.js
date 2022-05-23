import React from 'react';
import { useQuery } from 'react-query';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Tool from './Tool';

const Tools = () => {
    const { isLoading, error, data: tools } = useQuery('tools', () =>
        fetch('https://tools-manufacturer.herokuapp.com/tools').then(res =>
            res.json()
        )
    )
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if (error){
        return <FailedToFetch></FailedToFetch>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-32'>
            {
                tools.map(tool => <Tool key={tool._id} tool={tool}></Tool>)
            }
        </div>
    );
};

export default Tools;