import React from 'react';
import {Skeleton} from 'antd';

export const TopWriterSkeleton = ({index}:{index:number}) => {
    return (
    <div  className="members__list-item list-item-card rank-animation">
        <div className="skeleton-avatar">
            <Skeleton.Avatar active size='large' shape='circle' />
        </div>
        <div className="members__list-item-name">
            <Skeleton.Input active size='small'/>
        </div>
        <div className="rank-number">
            <span><small>#</small>{index}</span>
        </div>
    </div>
    );
};
