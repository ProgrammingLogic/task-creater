import { App } from "obsidian";
import PersonalPlugin from "src/main";
import { PersonalPluginSettings } from "src/settings";
import { Purchase } from "./Purchase";

export class PurchaseTracking {
    app: App;
    plugin: PersonalPlugin;
    settings: PersonalPluginSettings
    PurchasedItems: Purchase[];


    constructor(app: App, plugin: PersonalPlugin) {
        this.app = app;
        this.plugin = plugin;
        this.settings = this.plugin.settings;
        this.PurchasedItems = [];
    }
}
