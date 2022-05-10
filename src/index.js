
import './index.css';
import reportWebVitals from './reportWebVitals';
import state from "./redux/state";
import {rerenderAllTree} from "./render";

rerenderAllTree(state)

reportWebVitals();
