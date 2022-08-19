import React from 'react';
import {Skeleton, Space} from 'antd';

const PublicationShortSkeleton = () => {
    return (
        <div className="publication">
            <div className='publication__skeleton'>
                <Skeleton.Image active className='publication__skeleton-img'/>
                <Skeleton className='publication__skeleton-text' active title={{width:'200px'}} paragraph={{ rows: 2,width: ["100%","100%"]}}/>
            </div>
        </div>
    );
};

export default PublicationShortSkeleton;