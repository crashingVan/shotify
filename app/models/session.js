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
    /** @type {string} */
    parentFolderId;
    /** @type {string} */
    objectType;

    /**
     * @param {string} name 
     * @param {string} parentId
     */
    constructor(name, parentId) {
        this.id = "s" + crypto.randomUUID();
        this.name = name;
        this.date = new Date();
        this.screenshots = [];
        this.parentFolder = parentId;
        this.objectType = "session";
    }
}
