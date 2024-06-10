import { currentFolderId, currentFolder } from "../../init.js";

import { Session } from "../../domain/models/session.js";
import { saveSession, saveSessioninCurrentFolder } from "../../infrastructure/db/sessionDb.js";
import { loadSidebar } from "./htmlElement.js";
import { addEventListenerReadInput, removeTextField, rmCreateFolderSessionBtn } from "./htmlElement.js";


/**
 * 
 * @param {string} input 
 */
export function createNewSession(input) {
        const name = input;
        const session = new Session(name, currentFolderId);
        saveSession(session);
        saveSessioninCurrentFolder(currentFolder, session);

        return session;
}
