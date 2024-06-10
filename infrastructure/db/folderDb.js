import { Folder } from "../../domain/models/folder.js";
import { db } from "./initIndexedDb.js";


/**
 *
 * @param {Folder} currentFolder
 * @param {Folder} folder
 */


export function saveFolderinCurrentFolder(currentFolder, folder) {
    currentFolder.folders.push(folder);
    saveFolder(currentFolder);;
}
/**
 * @param {Folder} folder
 */

export function saveFolder(folder) {
    let tx = db.transaction('folder', 'readwrite');
    let txObjectStore = tx.objectStore('folder');
    let txRequest = txObjectStore.put(folder);
    txRequest.onerror = (e) => {
        console.error(`Error on save session: ${e}`);
    };
}
/**
 *
 * @param {string} folderId
 */

export function findFolderById(folderId) {
    const tx = db.transaction('folder', 'readonly');
    const txObjectStore = tx.objectStore('folder');
    const txRequest = txObjectStore.get(folderId);

    return new Promise((resolve, reject) => {
        //@ts-ignore
        txRequest.onsuccess = (e) => resolve(e.target.result);
        txRequest.onerror = (e) => reject(e);
    });
}
/**
 *
 * @param {string} folder
 */

export function findFolderLocation(folder) {
    const tx = db.transaction('folder', 'readonly');
    const txObjectStore = tx.objectStore('folder');
    const txIndex = txObjectStore.index('folderFoldersId');

    const keyRequest = txIndex.getKey(folder);
}
