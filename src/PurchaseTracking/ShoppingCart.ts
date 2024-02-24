import { App } from "obsidian";
import { Purchase } from "./Purchase";
import PersonalPlugin from "../main";
import { PersonalPluginSettings } from "src/settings";


export class PurchaseTracking {
    app: App;
    plugin: PersonalPlugin;
    settings: PersonalPluginSettings;
    PurchasedItems: Purchase[];


    constructor(app: App, plugin: PersonalPlugin) {

    }
}
