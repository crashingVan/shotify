import { Session } from "./session.js";

export class Folder {
    /** @type {string} */
    id;
    /** @type {Date} */
    date;
    /** @type {string} */
    name;
    /** @type {Session[]} */
    sessions;
    /** @type {Folder[]} */
    folders;
     /** @type {string} */
     folderLocation;

    /**
     * 
     * @param {string} name 
     * @param {string} location
     */
    constructor (name, location) {
        this.id = crypto.randomUUID();
        this.date = new Date();
        this.name = name;
        this.sessions = [];
        this.folders = [];
        this.folderLocation = location;
    }
}