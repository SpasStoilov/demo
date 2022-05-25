import page from "./node_modules/page/page.mjs";
import {useHandlerFor} from "./handlers.js";
import { useGlobalMiddleware } from "./globalmiddleware.js";

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
};

// Global Middleware:

page(useGlobalMiddleware.cleanWallfromErrors);


// Router:

page("/", useHandlerFor.home);
page("/register/", useHandlerFor.register);
page("/login", useHandlerFor.login);
page("/about", useHandlerFor.about);

page.start();