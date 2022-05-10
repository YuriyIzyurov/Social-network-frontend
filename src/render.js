import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom/client';
import {addNewSymbol, addPost} from "./redux/state";

const root = ReactDOM.createRoot(document.getElementById('root'));
export let rerenderAllTree = (state) =>{
    root.render(
        <React.StrictMode>
            <App state={state}
                 addPost={addPost}
                 addNewSymbol={addNewSymbol}/>
        </React.StrictMode>
    );
}