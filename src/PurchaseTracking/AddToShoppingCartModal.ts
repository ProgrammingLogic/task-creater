import { App, Modal, Notice, Setting } from "obsidian";
import { Purchase } from "./Purchase";



export class AddToShoppingCartModal extends Modal {
    constructor(app: App) {
        super(app);
    }


    onOpen() {
        const {contentEl} = this;
        contentEl.setText("Shopping Cart Menu!");
    }


    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}