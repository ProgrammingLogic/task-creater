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
	TasksDirectory: string;
}


const DEFAULT_SETTINGS: TaskCreaterSettings = {
	TasksDirectory: "/Tasks"
}


export default class TaskCreater extends Plugin {
	settings: TaskCreaterSettings;

	async onload() {
		await this.loadSettings();

		const createTaskRibbonIcon = this.addRibbonIcon("list-checks","Create Task", (evt: MouseEvent) => {
			new CreateTaskModal(this.app, (task) => {

			}).open();
		});

		this.addSettingTab(new TaskCreaterSettingsTab(this.app, this));
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


class TaskCreaterSettingsTab extends PluginSettingTab {
	plugin: TaskCreater;

	constructor(app: App, plugin: TaskCreater) {
		super(app, plugin);
		this.plugin = plugin;
	}


	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Tasks Directory")
			.setDesc("Where created tasks will be stored")
			.addText(text => text
				.setPlaceholder("Enter the tasks directory")
				.setValue(this.plugin.settings.TasksDirectory)
				.onChange(async (value) => {
					this.plugin.settings.TasksDirectory = value;
					await this.plugin.saveSettings();
				})
			)
	}
}