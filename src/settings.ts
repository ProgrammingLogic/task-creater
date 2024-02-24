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
		const {containerEl} = this;

		containerEl.empty();


		new Setting(containerEl)
			.setName("Shopping Cart Files")
			.setDesc("The files that contain the shopping cart data")
			.addTextArea(text => text
				.setPlaceholder("Enter the file paths")
				.setValue(this.plugin.settings.ShoppingCartFiles.join("\n"))
				.onChange(async (value) => {
					this.plugin.settings.ShoppingCartFiles = value.split("\n");
					await this.plugin.saveSettings();
				}));


		new Setting(containerEl)
			.setName("Purchase Tracking Files")
			.setDesc("The files containing the purchase tracking data")
			.addTextArea(text => text
				.setPlaceholder("Enter the file paths")
				.setValue(this.plugin.settings.PurchaseTrackingFiles.join("\n"))
				.onChange(async (value) => {
					this.plugin.settings.PurchaseTrackingFiles = value.split("\n");
					await this.plugin.saveSettings();
				}));
		
	}
}