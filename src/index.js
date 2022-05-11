
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/state";
import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderAllTree = (state) =>{
    root.render(
        <React.StrictMode>
            <App state={state}
                 addPost={store.addPost.bind(store)}
                 addNewSymbol={store.addNewSymbol.bind(store)}
                 addMessage={store.addMessage.bind(store)}
                 addNewSymbolMessage={store.addNewSymbolMessage.bind(store)}
            />
        </React.StrictMode>
    );
}
rerenderAllTree(store.getState())
store.subscribe(rerenderAllTree)

reportWebVitals();
