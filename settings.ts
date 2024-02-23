import 	{ PluginSettingTab, Setting } from "obsidian";


export interface PersonalPluginSettings {
	TasksDirectory: string;
}


export const DEFAULT_SETTINGS: PersonalPluginSettings = {
	TasksDirectory: "/Tasks"
}


export class PersonalPluginSettingsTab extends PluginSettingTab {
	plugin: PersonalPlugin;

	constructor(app: App, plugin: PersonalPlugin) {
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