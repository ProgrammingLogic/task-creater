import { App } from "obsidian";
import { Purchase } from "./Purchase";
import PersonalPlugin from "../main";
import { PersonalPluginSettings } from "src/settings";


export class ShoppingCart {
    app: App;
    plugin: PersonalPlugin;
    settings: PersonalPluginSettings;
    ItemsInCart: Purchase[];


    constructor(app: App, plugin: PersonalPlugin) {
        this.app = app;
        this.plugin = plugin;
        this.settings = this.plugin.settings;
        this.ItemsInCart = [];
    }


    addPurchase(purchase: Purchase) {
        this.ItemsInCart.push(purchase);
    }


    removePurchase(purchase: Purchase) {
        this.ItemsInCart = this.ItemsInCart.filter(p => p.ID !== purchase.ID);
    }


    getPurchaseByID(ID: string) {
        return this.ItemsInCart.find(p => p.ID === ID);
    }


    getPurchaseByName(name: string) {
        return this.ItemsInCart.find(p => p.Name === name);
    }


    getPurchaseByURL(url: string) {
        return this.ItemsInCart.find(p => p.URL === url);
    }


    getPurchaseByTag(tag: string) {
        return this.ItemsInCart.filter(p => p.Tags.includes(tag));
    }
}
