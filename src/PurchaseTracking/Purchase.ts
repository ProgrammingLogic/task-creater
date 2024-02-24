import { App } from "obsidian";
import { IsValidURL } from "src/Utlities/ValidURL";


export class Purchase {
    app: App;

    ID: string;
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
        this.ID = this.DateCreated.getTime().toString();

        this.Want = false;
        this.Need = false;

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
        if (this.Need && want) {
            throw `Want and Need cannot both be true!`;
        }
        else {
            this.Want = want;
        }
    }


    setNeed(need: boolean) {
        if (this.Want && need) {
            throw `Want and Need cannot both be true!`;
        }
        else {
            this.Need = need;
        }
    }


    setPurchased(purchased: boolean) {
        if (purchased && this.DatePurchased === undefined) {
            throw `DatePurchased must be set before setting Purchased to true!`;
        }
        else {
            this.Purchased = purchased;
        }
    }


    setDatePurchased(datePurchased: Date) {
        if (datePurchased > new Date()) {
            throw `DatePurchased ${datePurchased} cannot be in the future!`;
        }
        else if (datePurchased < this.DateCreated) { // we might want to remove this in the future
            throw `DatePurchased ${datePurchased} cannot be before DateCreated ${this.DateCreated}!`;
        }
        else {
            this.DatePurchased = datePurchased;
        }
    }


    setDateCreated(dateCreated: Date) {
        if (dateCreated > new Date()) {
            throw `DateCreated ${dateCreated} cannot be in the future!`;
        }
        else {
            this.DateCreated = dateCreated;
        }
    }


    setDueDate(dueDate: Date) {
        if (dueDate < new Date()) {
            throw `DueDate ${dueDate} cannot be in the past!`;
        }
        else {
            this.DueDate = dueDate;
        }
    }
}