import { App, Editor, MarkdownView, Modal, Notice, Plugin, Menu } from 'obsidian';
import { PersonalPluginSettings, PersonalPluginSettingsTab, DEFAULT_SETTINGS } from './settings';
import { Purchase } from 'src/PurchaseTracking/Purchase';
import { ShoppingCart } from './PurchaseTracking/ShoppingCart';
import { PurchaseTracking } from './PurchaseTracking/PurchaseTracking';
import { AddToShoppingCartModal } from './PurchaseTracking/AddToShoppingCartModal';


export default class PersonalPlugin extends Plugin {
	settings: PersonalPluginSettings;
	shoppingCart: ShoppingCart;
	

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new PersonalPluginSettingsTab(this.app, this));

		this.shoppingCart = new ShoppingCart(this.app, this);


		this.addCommand({
			id: "add-item-to-cart",
			name: "Add item to cart",
			callback: this.openAddToShoppingCartModal,
		});


		this.addRibbonIcon(
			"shopping-cart",
			"Add item to shopping cart",
			(evt: MouseEvent) => {
				this.openAddToShoppingCartModal();
			}
		);
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}


	openAddToShoppingCartModal() {
		new AddToShoppingCartModal(this.app).open();
	}
}
