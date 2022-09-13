import React from "react";

export function WithLazyLoading<P>(Container: React.ComponentType<P>) {
    return (props: P) => <React.Suspense fallback={<div className='lazyload-preloader'>Загрузка...</div>}><Container {...props}/></React.Suspense>
}








