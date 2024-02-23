import { App, PluginSettingTab, Setting } from "obsidian";
import { PurchaseTracking } from "./ShoppingCart";
import PersonalPlugin from "../main";


export class PurchaseTrackingSettingsTab extends PluginSettingTab {
    plugin: PersonalPlugin;

    constructor(app: App, plugin: PersonalPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }


    display(): void {
        // todo
        // add settings options for PurchaseTracking
    }
}