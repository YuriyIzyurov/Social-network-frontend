import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let privateMessageData = [
    {message: "Hi are you?", id: "1"},
    {message: "Whats is going on?", id: "2"},
    {message: "Nice 2 meet u", id: "3"}]
let DialogData = [
    {name: "Anton", id: "1"},
    {name: "Vasya", id: "2"},
    {name: "Egor", id: "3"},
    {name: "Anna", id: "4"},
    {name: "Dmitriy", id: "5"}]
let messagesData = [
    {post: "Hi are you?", id: "1",likesCount: '5'},
    {post: "Whats is going on?", id: "2",likesCount: '22'},
    {post: "Nice 2 meet u", postid: "3",likesCount: '14'}]



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App privateMessageData={privateMessageData} DialogData={DialogData} messagesData={messagesData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
