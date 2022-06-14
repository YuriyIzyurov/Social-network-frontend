
import React from "react";

export function WithLazyLoading<P>(Container: React.ComponentType<P>) {
    return (props: P) => <React.Suspense fallback={<div>Загрузка...</div>}><Container {...props}/></React.Suspense>
}








