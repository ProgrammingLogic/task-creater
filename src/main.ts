import { App, Editor, MarkdownView, Modal, Notice, Plugin, Menu } from 'obsidian';
import { PersonalPluginSettingsTab, PersonalPluginSettings, DEFAULT_SETTINGS } from "settings";
import { Purchase } from 'src/PurchaseTracking/Purchase';


export default class PersonalPlugin extends Plugin {
	settings: PersonalPluginSettings;

	async onload() {
		await this.loadSettings();


	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}