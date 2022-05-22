import React from "react"
import preloader from '../../assets/images/preloader-black.gif'

const Preloader = (props) => {
    return <div>
        <img src={preloader} width='40px' height='40px' />
    </div>
}

export default Preloader