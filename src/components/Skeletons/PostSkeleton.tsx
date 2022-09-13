import React from 'react';
import {Skeleton, Space} from 'antd';

export const PostSkeleton = () => {
    return (
        <div className='post__skeleton'>
            <div className="post__skeleton-content">
                <Skeleton.Image active className='post__skeleton-content-IMG'/>
                <Space>
                    <Skeleton.Avatar active size='large' shape='circle' />
                    <Skeleton.Input active size='small'/>
                </Space>
                <Skeleton className='post__skeleton-content-title' active title={{width:'600px'}} paragraph={{ rows: 12}}/>
            </div>
        </div>
    );
};
