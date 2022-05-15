
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderAllTree = () => {

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
}
rerenderAllTree()

store.subscribe(() => {
    rerenderAllTree()
})
reportWebVitals();
