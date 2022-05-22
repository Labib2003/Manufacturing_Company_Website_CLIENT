import React from 'react';
import { useQuery } from 'react-query';
import Tool from './Tool';

const Tools = () => {
    const { isLoading, error, data: tools } = useQuery('tools', () =>
        fetch('http://localhost:5000/tools').then(res =>
            res.json()
        )
    )
    if(isLoading){
        return <p>isLoading</p>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            {
                tools.map(tool => <Tool key={tool._id} tool={tool}></Tool>)
            }
        </div>
    );
};

export default Tools;