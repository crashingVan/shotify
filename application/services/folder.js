import { currentFolderId, currentFolder, folderPfad, iconSpaceStyle } from "../../init.js";

import { Folder } from "../../domain/models/folder.js";
import { saveFolder, saveFolderinCurrentFolder } from "../../infrastructure/db/folderDb.js";
import { createTextField, addEventListenerReadInput, removeTextField, rmCreateFolderSessionBtn, loadFolder } from "./htmlElement.js";

/**
 * 
 * @param {string} input 
 */
export function createNewFolder(input) {
        const name = input;
        const folder = new Folder(name, currentFolderId);
        saveFolder(folder);
        saveFolderinCurrentFolder(currentFolder, folder);
        return folder;
    };
