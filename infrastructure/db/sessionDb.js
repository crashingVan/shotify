import { Session } from "../../domain/models/session.js";
import { saveFolder } from "./folderDb.js";
import { db } from "./initIndexedDb.js";
import { Folder } from "../../domain/models/folder.js";

/**
 * @param {Session} session
 */


export function saveSession(session) {
    let tx = db.transaction('session', 'readwrite');
    let txObjectStore = tx.objectStore('session');
    let txRequest = txObjectStore.put(session);

    txRequest.onerror = (e) => {
        console.error(`Error on save session: ${e}`);
    };
}
/**
 *
 * @param {Folder} currentFolder
 * @param {Session} session
 */

export function saveSessioninCurrentFolder(currentFolder, session) {
    currentFolder.sessions.push(session);
    saveFolder(currentFolder);
}
/**
 *
 * @param {string} id
 * @returns {Promise<Session>}
 */



export function findSessionById(id) {
    let tx = db.transaction('session', 'readonly');
    let txObjectStore = tx.objectStore('session');
    let txRequest = txObjectStore.get(id); //get() gives Object, getAll() gives Array -> has to get mapped before access attributes of ones objects

    return new Promise((resolve, reject) => {
        txRequest.onsuccess = (e) => {
            // @ts-ignore
            resolve(e.target.result);
        };
        txRequest.onerror = (e) => {
            reject(e);
        };
    });
}
