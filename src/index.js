
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/state";
import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderAllTree = () =>{
    root.render(
        <React.StrictMode>
            <App state={store.getState()}
                 store={store}
            />
        </React.StrictMode>
    );
}
rerenderAllTree()
store.subscribe(rerenderAllTree)

reportWebVitals();
