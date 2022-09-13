import React, { useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {PostType} from "typings/types";
import DefaultImage from 'assets/images/defaultPostImage.jpg'
import { useSpring, animated, config} from '@react-spring/web'


const calc = (x:number, y:number, rect: DOMRect) => [
    -(y - rect.top - rect.height / 2) / 12,
    (x - rect.left - rect.width / 2) / 12,
    1.08
];
const trans = (x:number, y:number, s:number) =>
    `perspective(1100px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export const PublicationShort = ({item}:{item: PostType}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [xys, set] = useState([0, 0, 1]);

    const props = useSpring({ xys, config: config.slow });

    return (
        <animated.div
            ref={ref}
            className="publication"
            style={{ transform: props.xys.to(trans) }}
            onMouseLeave={() => set([0, 0, 1])}
            onMouseMove={(e) => {
                const rect = ref.current?.getBoundingClientRect();
                if(rect) {
                    set(calc(e.clientX, e.clientY, rect));
                }
            }}>
            <Link to={`/posts/${item._id}`}>
                <img src={item.imageUrl ? item.imageUrl : DefaultImage} alt='image'/>
                <div className="publication__glass">
                    <h2>{item.title}</h2>
                    <p>{item.tags.map((item,index)=><Tag key={'tag-' + index} item={item}/>)}</p>
                </div>
            </Link>
        </animated.div>

    );
};

export const Tag = ({item}:{item:string}) => {
    return (
        <span>#{item}</span>
    );
};
