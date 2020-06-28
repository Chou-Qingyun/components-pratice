import "./main.css";

import popup from "./components/popup/popup";

popup({
    width: '200px',
    mask: false,
    content(element) {
        console.log(element);
    }
});