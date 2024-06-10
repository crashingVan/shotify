import { Folder } from "../../domain/models/folder.js";
import { saveFolder, saveFolderinCurrentFolder } from "../../infrastructure/db/folderDb.js";

/**
 * 
 * @param {string} input 
 * @param {Folder} currentFolder
 */
export function createNewFolder(input, currentFolder) {
        const name = input;
        const folder = new Folder(name, currentFolder.id);
        saveFolder(folder);
        saveFolderinCurrentFolder(currentFolder, folder);
        return folder;
    };
