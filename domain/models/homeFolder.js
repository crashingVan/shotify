import { Folder } from "./folder.js";
import { Session } from "./session.js";

export class HomeFolder {
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
    /** @type {string} */
    objectType;

    constructor () {
        this.id = "home"
        this.date = new Date();
        this.name = "home";
        this.sessions = [];
        this.folders = [];
        this.parentFolder = "home";
        this.objectType = "folder"
    }
}