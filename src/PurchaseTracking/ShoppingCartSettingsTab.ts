import 	{ App, PluginSettingTab, Setting } from "obsidian";
import PersonalPlugin from "../main";


export class ShoppingCartSettingsTab extends PluginSettingTab {
	plugin: PersonalPlugin;

	constructor(app: App, plugin: PersonalPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}


	display(): void {
		// todo
		// add settings fields for shoppingcart settings
	}
}