import React, { useState } from 'react';
import {svgList} from "../../../common/constants/ListSVG";
import AvatarEffect from "./AvatarEffect";
import {animated, easings, useSprings} from 'react-spring'


export const ContainerAvatarEffect = ({colors, toggle}:{colors:string[], toggle: boolean}) => {

    const figures = svgList.map(item => <AvatarEffect key={item} id={item} colors={colors}/>)


    const springs = useSprings(svgList.length, figures.map((_, index) => {
        switch (index) {
            case 0:
            case 3:
            case 6:
                return {
                    transform: toggle ?  'rotate(360deg)':'rotate(0deg)',
                    config: { duration: 4000, easing: easings.easeInOutCubic},
                    delay: index*20
                }
            case 1:
            case 4:
            case 7:
                return {
                    transform: toggle ? 'rotate(0deg)':'rotate(360deg)',
                    config: {duration: 3800, easing: easings.easeInOutCubic},
                    delay: index*30
                }

            case 2:
            case 5:
            case 8:
                return {
                    transform: toggle ? 'rotate(360deg)':'rotate(0deg)',
                    config: {duration: 3600, easing: easings.easeInOutCubic}
                }
            default: return {
                transform: toggle ? 'rotate(0deg)':'rotate(360deg)',
                config: {duration: 3500, easing: easings.easeInOutCubic}
            }
        }
    }))

    const animatedFigures = springs.map((animatedStyle, index) => {
        return <animated.svg style={{
            transformOrigin: "center",
            transformBox: "fill-box",
            ...animatedStyle
        }
        }>{figures[index]}</animated.svg>
    })

    return (
        <>
            {animatedFigures}
        </>
    )
}
