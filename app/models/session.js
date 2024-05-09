import { Screenshot } from "./screenshot.js";

export class Session {
    /** @type {string} */
    id;
    /** @type {string} */
    name;
    /** @type {Date} */
    date;
    /** @type {Screenshot[]} */
    screenshots;

    /**
     * @param {string} name 
     */
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.date = new Date();
        this.screenshots = [];
    }
}