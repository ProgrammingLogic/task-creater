import { 
	App, 
	Editor, 
	MarkdownView, 
	Modal, 
	Notice, 
	Plugin, 
	PluginSettingTab, 
	Setting,
	Menu
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
			new CreateTaskModal(this.app, (task) => {

			}).open();
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
	task: {
		name: string;
		description: string;
		dueDate: string;
		createdDate: string;
	};

	
	onSubmit: (task: object) => void;

	// returns task object when submitted???
	constructor(app: App, onSubmit: (task: object) => void) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		
		contentEl.createEl("h1", {text: "Create your task!" });


		// Get the name of the task
		new Setting(contentEl)
			.setName("Task Name")
			.addText((text) => 
				text.onChange((value) => {
					this.task.name = value;
				}));

		// Get the description of the task
		new Setting(contentEl)
			.setName("Task Description")
			.addText((text) =>
				text.onChange((value) => {
					this.task.description = value;
				}));

		// Get the due date of the task
		new Setting(contentEl)
			.setName("Due Date")
			.addText((text) =>
				text.onChange((value) => {
					this.task.dueDate = value;
				}));

		// Get the created date of the task
		new Setting(contentEl)
			.setName("Created Date")
			.addText((text) =>
				text.onChange((value) => {
					this.task.createdDate = value;
				}));

		new Setting(contentEl)
			.setName("Submit")
			.addButton((button) => 
				button.setButtonText("Submit")
				.onClick(() => {
					this.close();
					this.onSubmit(this.task);
				}));
	}


	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}