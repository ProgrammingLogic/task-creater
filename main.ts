import { 
	App, 
	Editor, 
	MarkdownView, 
	Modal, 
	Notice, 
	Plugin, 
	PluginSettingTab, 
	Setting 
} from 'obsidian';


interface TaskCreaterSettings {
	mySetting: string;
}


const DEFAULT_SETTINGS: TaskCreaterSettings = {
	mySetting: 'default'
}


export default class TaskCreater extends Plugin {
	settings: TaskCreaterSettings;

	async onload() {
		
	}

	onunload() {

	}

	async loadSettings() {
		
	}

	async saveSettings() {
		
	}
}
