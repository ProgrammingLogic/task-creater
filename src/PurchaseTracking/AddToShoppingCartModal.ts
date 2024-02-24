import { App, Modal, Notice, Setting } from "obsidian";
import { Purchase } from "./Purchase";



export class AddToShoppingCartModal extends Modal {
    constructor(app: App) {
        super(app);
    }
}