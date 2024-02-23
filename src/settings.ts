import 	{ App, PluginSettingTab, Setting } from "obsidian";
import PersonalPlugin from "./main";


export interface PersonalPluginSettings {
	
}


export const DEFAULT_SETTINGS: PersonalPluginSettings = {
	
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