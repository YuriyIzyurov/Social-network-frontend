import React from "react";
import {Preloader} from "components/Preloader/Preloader";

export function WithLazyLoading<P extends JSX.IntrinsicAttributes>(Container: React.ComponentType<P>) {
    return (props: P) => <React.Suspense fallback={<Preloader/>}><Container {...props}/></React.Suspense>
}








