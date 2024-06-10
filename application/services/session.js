import { Session } from "../../domain/models/session.js";
import { saveSession, saveSessioninCurrentFolder } from "../../infrastructure/db/sessionDb.js";
import { loadSidebar } from "./htmlElement.js";
import { addEventListenerReadInput, removeTextField, rmCreateFolderSessionBtn } from "./htmlElement.js";
import { Folder } from "../../domain/models/folder.js";


/**
 * 
 * @param {string} input 
 * @param {Folder} currentFolder
 */
export function createNewSession(input, currentFolder) {
        const name = input;
        const session = new Session(name, currentFolder.id);
        saveSession(session);
        saveSessioninCurrentFolder(currentFolder, session);

        return session;
}
