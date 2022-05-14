
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderAllTree = (state) => {

    root.render(
            <React.StrictMode>
                <App state={state}
                     store={store}
                />
            </React.StrictMode>
    );
}
rerenderAllTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderAllTree(state)
})
reportWebVitals();
