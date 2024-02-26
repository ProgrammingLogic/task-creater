import { App, ButtonComponent, Component, Modal, Notice, Setting } from "obsidian";
import { Purchase } from "./Purchase";
import { ShoppingCart } from "./ShoppingCart";



export class AddToShoppingCartModal extends Modal {
    purchase: Purchase;
    shoppingCart: ShoppingCart;


    constructor(app: App, shoppingCart: ShoppingCart) {
        super(app);
        this.shoppingCart = shoppingCart;
    }


    onOpen() {
        this.purchase = new Purchase(this.app);
        const {contentEl} = this;
        contentEl.setText("Add Item to Cart");


        new Setting(contentEl)
            .setName("Item Name")
            .setDesc("The name of the item you want to add to the shopping cart")
            .addText(text => text
                .setPlaceholder("Enter the item name")
                .onChange(value => {
                    this.purchase.setName(value);
            }));


        new Setting(contentEl)
            .setName("Item Description")
            .setDesc("A description of the item you want to add to the shopping cart")
            .addTextArea(text => text
                .setPlaceholder("Enter the item description")
                .onChange(value => {
                    this.purchase.setDescription(value);
            }));


        new Setting(contentEl)
            .setName("Item Price")
            .setDesc("The price of the item you want to add to the shopping cart")
            .addText(text => text
                .setPlaceholder("Enter the item price")
                .onChange(value => {
                    this.purchase.setPrice(Number(value));
            }));


        new Setting(contentEl)
            .setName("Item Rating")
            .setDesc("The rating of how much you want the item you want to add to the shopping cart")
            .addText(text => text
                .setPlaceholder("Enter the item rating")
                .onChange(value => {
                    this.purchase.setRating(Number(value));
            }));


        new Setting(contentEl)
            .setName("Want or Need?")
            .setDesc("Do you want the item or do you need it?")
            .addDropdown(dropdown => {
                dropdown.addOption("Want", "want");
                dropdown.addOption("Need", "need");

                dropdown.onChange(value => {
                    if (value === "want") {
                        this.purchase.setWant(true);
                        this.purchase.setNeed(false);
                    }
                    else if (value === "need") {
                        this.purchase.setNeed(true);
                        this.purchase.setWant(false);
                    }
                })
            });


        new Setting(contentEl)
            .setName("Due Date")
            .setDesc("When the item should be bought by")
            .addText(text => text
                .setPlaceholder("Enter the due date")
                .onChange(value => {
                    this.purchase.setDueDate(new Date(value));
            }));


        new Setting(contentEl)
            .setName("Item URL")
            .setDesc("The URL of the item you want to add to the shopping cart")
            .addText(text => text
                .setPlaceholder("Enter the item URL")
                .onChange(value => {
                    this.purchase.setURL(value);
            }));


        new Setting(contentEl)
            .setName("Item Note Path")
            .setDesc("The path to the note containing the item you want to add to the shopping cart")
            .addText(text => text
                .setPlaceholder("Enter the item note path")
                .onChange(value => {
                    this.purchase.setNotePath(value);
            }));


        new Setting(contentEl)
            .setName("Item Tags")
            .setDesc("The tags associated with the item you want to add to the shopping cart")
            .addTextArea(text => text
                .setPlaceholder("Enter the item tags")
                .onChange(value => {
                    const tags = value.split(",");
                    for (let tag of tags) {
                        this.purchase.addTag(tag);
                    }
            }));
        

        new Setting(contentEl)
            .addButton(button => {
                button.setButtonText("Add to Cart")
                    .onClick(async () => {
                        await this.addItemToCart();
                });
            });
    }


    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }


    async addItemToCart() {
        await this.shoppingCart.addItem(this.purchase);
        console.log(`Adding ${this.purchase.Name} to the shopping cart`);
    }
}