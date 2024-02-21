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
				new Notice(`Creating new task ${task.Name}`);
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


class Task {
	name: string;
	description: string;
	dueDate: string;
	createdDate: string;

	constructor(name: string, description: string, dueDate: string, createdDate: string) {
		this.name = name;
		this.description = description;
		this.dueDate = dueDate;
		this.createdDate = createdDate
	}
}


class CreateTaskModal extends Modal {
	task: Task;

	taskName: string;
	taskDesc: string;
	taskDueDate: string;
	taskCreatedDate: string;

	
	onSubmit: (task: object) => void;

	// returns task object when submitted???
	constructor(app: App, onSubmit: (task: Task) => void) {
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
					this.taskName = value;
				}));

		// Get the description of the task
		new Setting(contentEl)
			.setName("Task Description")
			.addText((text) =>
				text.onChange((value) => {
					this.taskDesc = value;
				}));

		// Get the due date of the task
		new Setting(contentEl)
			.setName("Due Date")
			.addText((text) =>
				text.onChange((value) => {
					this.taskDueDate = value;
				}));

		// Get the created date of the task
		new Setting(contentEl)
			.setName("Created Date")
			.addText((text) =>
				text.onChange((value) => {
					this.taskCreatedDate = value;
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