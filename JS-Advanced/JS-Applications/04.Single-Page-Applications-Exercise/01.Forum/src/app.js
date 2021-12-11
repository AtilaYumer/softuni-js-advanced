import {setUpHome, showHome} from "./home.js";
import {setUpDetails} from "./details.js";

function start() {
    const main = document.querySelector('main');
    setUpHome(main, document.getElementById('home'));
    setUpDetails(main, document.getElementById('details'));

    showHome();
}

start();