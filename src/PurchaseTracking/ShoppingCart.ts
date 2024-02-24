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
        this.app = app;
        this.plugin = plugin;
        this.settings = this.plugin.settings;
        this.PurchasedItems = [];
    }


    addPurchase(purchase: Purchase) {
        this.PurchasedItems.push(purchase);
    }


    removePurchase(purchase: Purchase) {
        this.PurchasedItems = this.PurchasedItems.filter(p => p.ID !== purchase.ID);
    }


    getPurchaseByID(ID: string) {
        return this.PurchasedItems.find(p => p.ID === ID);
    }


    getPurchaseByName(name: string) {
        return this.PurchasedItems.find(p => p.Name === name);
    }


    getPurchaseByURL(url: string) {
        return this.PurchasedItems.find(p => p.URL === url);
    }


    getPurchaseByTag(tag: string) {
        return this.PurchasedItems.filter(p => p.Tags.includes(tag));
    }
}
