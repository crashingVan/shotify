import { Folder } from "./folder.js";
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
    /** @type {Folder} */
    parentFolder

    /**
     * @param {string} name 
     */
    constructor(name, parent) {
        this.id = "s" + crypto.randomUUID();
        this.name = name;
        this.date = new Date();
        this.screenshots = [];
        this.parentFolder = parent
    }
}