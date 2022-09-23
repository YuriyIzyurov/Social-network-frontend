import React from 'react';
import {Spin} from "antd";

export const Preloader = () => {
    return (
        <div className='main-spin'>
            <Spin  size="large" />
        </div>
    );
};
