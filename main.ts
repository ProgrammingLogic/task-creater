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
		await this.loadSettings();

		const createTaskRibbonIcon = this.addRibbonIcon("list-checks","Create Task", (evt: MouseEvent) => {
			new Notice("Create task button has been pressed!");
		});
	}

	onunload() {

	}

	async loadSettings() {
		
	}

	async saveSettings() {
		
	}
}


class CreateTaskModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText("Hello world!");
	}


	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}