import { Session } from "./session";

export class folder {
    /** @type {string} */
    id;
    /** @type {Date} */
    date;
    /** @type {string} */
    name;
    /** @type {Session[]} */
    session;
    /** @type {folder[]} */
    folder;

    /**
     * 
     * @param {string} name 
     */
    constructor (name) {
        this.id = crypto.randomUUID();
        this.date = new Date();
        this.name = name;
        this.session = [];
        this.folde = [];
    }
}