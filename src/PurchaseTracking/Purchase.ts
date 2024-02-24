import { App } from "obsidian";
import { IsValidURL } from "src/Utlities/ValidURL";


export class Purchase {
    app: App;

    Name: string;
    Description: String;

    // URL to where to purchase FuturePurchase
    // Required: false
    URL: String;
    
    // Path to the note containing info about the FuturePurchase
    // Required: false
    NotePath: String;

    // Tags containing information about the purchase
    // Required: True
    Tags: string[];

    Price: number;

    // The rating of how much the FuturePurchase is wanted.
    // Number from 1-10.
    // Higher means you want it more, lower means you want it less.
    Rating: number;
    

    Want: boolean;
    Need: boolean;
    Purchased: boolean;

    DatePurchased: Date;
    DateCreated: Date;

    // When the item should be bought by. 
    // Used when sorting the items based on need, rating, and duedate. 
    // Use to indicate urgency of the item. This will make it appear higher on the list. 
    // Required: False
    DueDate: Date;


    constructor(app: App) {
        this.app = app;
        this.DateCreated = new Date();

        this.Tags = [];
    }


    purchase() {
        this.Purchased = true;
        this.DatePurchased = new Date();
    }


    setName(name: string) {
        this.Name = name;
    }


    setDescription(description: string) {
        this.Description = description;
    }


    setURL(url: string) {
        if (IsValidURL(url)) {
            this.URL = url;
        }
        else {
            throw `URL ${url} is invalid!`;
        }
    }


    setNotePath(notePath: string) {
        this.NotePath = notePath;

        // TODO
        // ensure path exists in vault
        // create note if it doesn't 
    }


    addTag(tag: string) {
        this.Tags.push(tag);
    }


    removeTag(tag: string) {
        let tagIndex = this.Tags.findIndex(value => value === tag);

        if (tagIndex !== -1) {
            this.Tags.splice(tagIndex, 1);
        }
        else {
            throw `Tag ${tag} does not exist in Purchase ${this.Name}!`
        }
    }


    setPrice(price: number) {
        if (price < 0) {
            throw `Price ${price} is invalid!`;
        }
        else {
            this.Price = price;
        }
    }


    setRating(rating: number) {
        if (rating < 1 || rating > 10) {
            throw `Rating ${rating} is invalid!`;
        }
        else {
            this.Rating = rating;
        }
    }


    setWant(want: boolean) {
        // make sure need is not true
    }


    setNeed(need: boolean) {
        // make sure want is not true
    }


    setPurchased(purchased: boolean) {
        // make sure purchased is not true
    }


    setDatePurchased(datePurchased: Date) {
        // make sure datePurchased is not in the future
    }


    setDateCreated(dateCreated: Date) {
        // make sure dateCreated is not in the future
    }


    setDueDate(dueDate: Date) {
        // make sure dueDate is not in the past
    }
}