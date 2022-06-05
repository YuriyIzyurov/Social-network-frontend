
import React from "react";

export const WithLazyLoading = (Container) =>  {
    return (props) => <React.Suspense fallback={<div>Загрузка...</div>}><Container {...props}/></React.Suspense>
}








