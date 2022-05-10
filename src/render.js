import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom/client';

export let rerenderAllTree = (state, addPost) =>{
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App state={state} addPost={addPost}/>
        </React.StrictMode>
    );
}