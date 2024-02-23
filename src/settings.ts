import 	{ App, PluginSettingTab, Setting } from "obsidian";
import PersonalPlugin from "./main";


export interface PersonalPluginSettings {
	ShoppingCartFiles: string[];
	PurchaseTrackingFiles: string[];
}


export const DEFAULT_SETTINGS: PersonalPluginSettings = {
	ShoppingCartFiles: [
		"/Purchases/shopping_cart.json"
	],

	PurchaseTrackingFiles: [
		"/Purchases/purchases.json"
	]
}


export class PersonalPluginSettingsTab extends PluginSettingTab {
	plugin: PersonalPlugin;

	constructor(app: App, plugin: PersonalPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}


	display(): void {
		
	}
}