import { appComponent } from "./appcomponent.js";
import { itemcomponent } from "./components/firstcomponent.js";

export class AppModule {
    static defineElements() {
        window.customElements.define("app-root", appComponent);
        window.customElements.define("todo-item", itemcomponent);
    }
}