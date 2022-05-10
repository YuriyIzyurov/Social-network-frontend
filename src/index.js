
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {addPost} from "./redux/state";
import {rerenderAllTree} from "./render";

rerenderAllTree(state, addPost)

reportWebVitals();
