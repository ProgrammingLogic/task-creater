import { App, Editor, MarkdownView, Modal, Notice, Plugin, Menu } from 'obsidian';
import { PersonalPluginSettings, PersonalPluginSettingsTab, DEFAULT_SETTINGS } from './settings';
import { Purchase } from 'src/PurchaseTracking/Purchase';
import { ShoppingCart } from './PurchaseTracking/ShoppingCart';
import { PurchaseTracking } from './PurchaseTracking/PurchaseTracking';


export default class PersonalPlugin extends Plugin {
	settings: PersonalPluginSettings;
	shoppingCart: ShoppingCart;
	purchaseTracking: PurchaseTracking;
	

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new PersonalPluginSettingsTab(this.app, this));
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
