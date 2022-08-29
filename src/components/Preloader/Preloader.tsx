import React from "react"
import preloader from 'assets/images/preloader-black.gif'

const Preloader:React.FC = () => {
    return <div>
        <img src={preloader} width='40px' height='40px'  alt={"preloader"}/>
    </div>
}

export default Preloader