import React from 'react';


type PropsType = {
    id:string, colors:string[]
}

export const AvatarEffect:React.FC<PropsType> = ({id, colors}) => {

    switch (id) {
        case 'Polygon1':
            return <svg  width="167" height="168" viewBox="0 0 167 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon1_1" opacity="0.928571" d="M60.9656 0.998632L150.918 20.5211C154.904 21.3864 157.853 24.7624 158.174 28.8304L165.29 118.837C165.603 122.804 163.345 126.528 159.683 128.084L73.9355 164.499C70.2728 166.055 66.0266 165.093 63.392 162.111L3.62187 94.4668C0.920452 91.4094 0.541262 86.9423 2.68859 83.472L51.1383 5.17214C53.2003 1.83974 57.1372 0.167763 60.9656 0.998632Z" stroke="url(#paint0_linear_1_14)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_14" x1="39.9108" y1="101.737" x2="140.105" y2="59.2287" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon2':
            return <svg width="167" height="168" viewBox="0 0 167 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon1_2" opacity="0.857143" d="M22.6259 18.9102L113.049 1.73263C117.057 0.971311 121.089 2.9271 122.975 6.54632L164.69 86.6231C166.529 90.1528 165.905 94.4634 163.142 97.3265L98.4446 164.356C95.681 167.219 91.3969 167.993 87.807 166.278L6.363 127.362C2.682 125.603 0.587627 121.638 1.20824 117.605L15.2111 26.5922C15.807 22.7188 18.7775 19.6412 22.6259 18.9102Z" stroke="url(#paint0_linear_1_13)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_13" x1="42.6055" y1="119.875" x2="118.231" y2="41.6014" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon3':
            return <svg width="162" height="171" viewBox="0 0 162 171" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon1_4" opacity="0.714286" d="M2.9996 82.2196L53.4758 5.22732C55.7129 1.81497 59.9216 0.271419 63.8343 1.42829L150.406 27.0243C154.222 28.1525 156.889 31.5949 157.028 35.5717L160.277 128.674C160.416 132.651 157.996 136.271 154.268 137.663L69.6915 169.239C65.8689 170.666 61.5629 169.42 59.0933 166.172L3.37202 92.8899C1.00055 89.771 0.851352 85.4963 2.9996 82.2196Z" stroke="url(#paint0_linear_1_12)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_12" x1="89.4899" y1="137.961" x2="85.6896" y2="29.189" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon4':
            return <svg width="166" height="167" viewBox="0 0 166 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon1_5" opacity="0.642857" d="M1.23854 109.53L17.6267 18.9221C18.3531 14.9062 21.624 11.8402 25.6772 11.3757L115.357 1.09923C119.31 0.64626 123.109 2.77286 124.79 6.37965L164.145 90.8181C165.826 94.4249 165.013 98.7035 162.125 101.442L96.6111 163.57C93.6501 166.378 89.2 166.914 85.6584 164.889L5.7489 119.208C2.34798 117.263 0.541061 113.387 1.23854 109.53Z" stroke="url(#paint0_linear_1_11)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_11" x1="102.618" y1="127.037" x2="56.6019" y2="28.4048" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon5':
            return <svg width="168" height="166" viewBox="0 0 168 166" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon1_6" opacity="0.571429" d="M21.3386 146.675L1.02118 56.8611C0.120702 52.8805 1.93344 48.7799 5.4828 46.7685L84.0138 2.26606C87.4754 0.30445 91.803 0.777676 94.7596 3.44108L163.975 65.7939C166.931 68.4573 167.854 72.714 166.266 76.3633L130.238 159.155C128.61 162.897 124.723 165.129 120.672 164.649L29.2712 153.821C25.3812 153.36 22.2033 150.497 21.3386 146.675Z" stroke="url(#paint0_linear_1_10)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_10" x1="121.494" y1="123.178" x2="40.5926" y2="50.3703" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon6':
            return <svg width="164" height="167" viewBox="0 0 164 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon1_7" opacity="0.5" d="M57.1099 161.875L3.31696 87.148C0.932826 83.836 0.999564 79.3533 3.48125 76.115L58.3895 4.46588C60.8098 1.30769 64.9786 0.0521081 68.7409 1.34822L156.82 31.6914C160.582 32.9875 163.095 36.5448 163.059 40.5243L162.237 130.806C162.2 134.887 159.494 138.46 155.578 139.602L67.2045 165.353C63.4433 166.449 59.3993 165.055 57.1099 161.875Z" stroke="url(#paint0_linear_1_9)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_9" x1="140.131" y1="101.109" x2="37.2168" y2="65.6907" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon7':
            return <svg width="171" height="163" viewBox="0 0 171 163" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon1_8" opacity="0.428571" d="M84.0014 160.522L5.29746 112.768C1.80925 110.651 0.119983 106.499 1.13979 102.548L23.7032 15.1337C24.6978 11.2806 28.0451 8.49525 32.0147 8.21754L124.947 1.71585C128.916 1.43813 132.619 3.73033 134.139 7.40743L168.643 90.8292C170.202 94.5996 169.107 98.9466 165.947 101.528L94.6521 159.777C91.6178 162.256 87.351 162.555 84.0014 160.522Z" stroke="url(#paint0_linear_1_8)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_8" x1="136.695" y1="72.1359" x2="28.1211" y2="79.7243" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon8':
            return <svg width="169" height="166" viewBox="0 0 169 166" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon 1_9" opacity="0.357143" d="M113.919 164.495L22.8256 151.296C18.7883 150.711 15.6117 147.548 15.0072 143.513L1.63201 54.2204C1.04245 50.2846 3.03544 46.412 6.58065 44.6047L89.5776 2.29458C93.1229 0.487298 97.4257 1.15038 100.262 3.94102L164.603 67.2518C167.511 70.1132 168.201 74.5431 166.301 78.1549L123.431 159.646C121.606 163.114 117.795 165.056 113.919 164.495Z" stroke="url(#paint0_linear_1_7)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_7" x1="127.896" y1="62.5306" x2="30.9101" y2="111.923" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon9':
            return <svg width="165" height="169" viewBox="0 0 165 169" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon 1_10" opacity="0.285714" d="M149.135 144.188L60.1306 167.631C56.1858 168.67 52.0263 167 49.8931 163.521L2.69339 86.55C0.612889 83.1572 0.934266 78.8136 3.49136 75.7646L63.3555 4.38582C65.9126 1.33687 70.1323 0.265971 73.8331 1.72672L157.794 34.8665C161.588 36.3644 163.954 40.1728 163.616 44.24L155.996 136.007C155.672 139.913 152.923 143.19 149.135 144.188Z" stroke="url(#paint0_linear_1_6)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_6" x1="122.162" y1="44.8634" x2="52.181" y2="128.221" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon10':
            return <svg width="167" height="165" viewBox="0 0 167 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon 1_11" opacity="0.214286" d="M162.152 105.452L89.3735 161.812C86.1479 164.31 81.6664 164.399 78.3434 162.03L4.82097 109.63C1.58022 107.32 0.179123 103.196 1.34203 99.3907L28.5668 10.2983C29.7297 6.49269 33.1959 3.858 37.1736 3.75625L127.414 1.44784C131.493 1.3435 135.158 3.9243 136.436 7.79978L165.272 95.2417C166.5 98.9631 165.25 103.054 162.152 105.452Z" stroke="url(#paint0_linear_1_5)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_5" x1="98.5168" y1="24.5737" x2="66.681" y2="128.652" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon11':
            return <svg width="164" height="170" viewBox="0 0 164 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon 1_12" opacity="0.2529" d="M161.373 83.799L116.388 164.127C114.394 167.687 110.303 169.521 106.319 168.64L18.1741 149.148C14.2888 148.289 11.3886 145.041 10.9729 141.083L1.2399 48.4337C0.824152 44.4762 2.98603 40.696 6.60788 39.0474L88.7763 1.64597C92.4901 -0.0444534 96.8725 0.898056 99.5625 3.96571L160.257 73.1807C162.84 76.1264 163.287 80.3803 161.373 83.799Z" stroke="url(#paint0_linear_1_4)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_4" x1="71.207" y1="34.229" x2="82.5893" y2="142.471" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon12':
            return <svg width="165" height="170" viewBox="0 0 165 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon 1_13" opacity="0.2" d="M164.035 51.9818L154.007 143.514C153.562 147.571 150.513 150.858 146.502 151.604L57.7588 168.112C53.8471 168.84 49.9091 166.984 47.9806 163.503L2.83332 82.0144C0.904854 78.5336 1.41813 74.2086 4.10779 71.2753L65.1277 4.72711C67.8856 1.71935 72.2874 0.8741 75.9616 2.64674L158.861 42.6426C162.389 44.3448 164.462 48.0862 164.035 51.9818Z" stroke="url(#paint0_linear_1_3)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_3" x1="61.6836" y1="41.5901" x2="114.47" y2="136.771" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        case 'Polygon13':
            return <svg width="170" height="164" viewBox="0 0 170 164" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Polygon 1_14" opacity="0.18" d="M141.36 12.3354L167.893 100.513C169.069 104.421 167.546 108.638 164.146 110.892L88.91 160.764C85.5937 162.962 81.2436 162.792 78.1085 160.341L4.7118 102.969C1.57666 100.518 0.35923 96.3363 1.68886 92.5851L31.854 7.48253C33.2174 3.63617 36.9389 1.13815 41.0135 1.3343L132.948 5.76002C136.861 5.94838 140.23 8.58256 141.36 12.3354Z" stroke="url(#paint0_linear_1_2)" strokeWidth="1.5"/>
                <defs>
                    <linearGradient id="paint0_linear_1_2" x1="43.0872" y1="42.762" x2="128.869" y2="109.749" gradientUnits="userSpaceOnUse">
                        <stop offset="0.166667" stopColor={colors[0]} stopOpacity="0"/>
                        <stop offset="0.520833" stopColor={colors[1]} stopOpacity="0.6"/>
                        <stop offset="1" stopColor={colors[0]} stopOpacity="0.36"/>
                    </linearGradient>
                </defs>
            </svg>
        default:
            return <svg></svg>
    }
};
