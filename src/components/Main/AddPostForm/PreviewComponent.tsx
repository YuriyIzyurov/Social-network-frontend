import React from 'react';

export const PreviewComponent = ({imageUrl} : {imageUrl:string}) => {
    if(imageUrl)
    return (
        <div>
            <img src={imageUrl}/>
        </div>
    )
    else return <div></div>
};
