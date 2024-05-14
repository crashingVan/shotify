import { HomeFolder } from "../models/homeFolder.js";
import { Folder } from "../models/folder.js";
import { Session } from "../models/session.js";

/** @type {IDBDatabase} */
let db;

export function initDB() {
    //open returns IDBopenRequest which results in failure or success
    //if success or failure, "success" event or "failure"event gets fired with requestDatabse as the target
    //request.onsuccess or request.onerror gets activated
    const requestDb = indexedDB.open("shotify", 3);

    //requestDatabase.onsuccess Funktion wird ausgeführt wenn event eintritt und in {} steht was ausgeführt wird
    requestDb.onsuccess = (event) => {
        // @ts-ignore
        db = event.target.result;

        const tx = db.transaction('folder', 'readonly');
        const txObjectStore = tx.objectStore('folder');
        const txRequest = txObjectStore.get("home");

        txRequest.onsuccess = (e) => {
            //@ts-ignore
            if (e.target.result == null) {
                const homeFolder = new HomeFolder()
                createFolder(homeFolder);
            }
        }
    }

    //open objectstore through request.onupgradeneeded
    // THROUGH request.onupgradeneeded is the ONLY way to alter the structure of the database
    requestDb.onupgradeneeded = (event) => {
        // @ts-ignore
        const db = event.target.result;

        if (!db.objectStoreNames.contains('folder')) {
            /** @type {IDBObjectStore} */
            const folderObjectStore = db.createObjectStore("folder", { keyPath: 'id', autoIncrement: false });
            folderObjectStore.createIndex("folderName", "name", { unique: false });
        }

        if (!db.objectStoreNames.contains('session')) {
            /** @type {IDBObjectStore} */
            const sessionObjectStore = db.createObjectStore("session", { keyPath: 'id', autoIncrement: false });
            sessionObjectStore.createIndex("sessionName", "name", { unique: false });
        }

        if (!db.objectStoreNames.contains("screenshots")) {
            db.createObjectStore("screenshots", { keyPath: 'id', autoIncrement: false });
        }

        if (!db.objectStoreNames.contains("txtSearch")) {
            db.createObjectStore("txtSearch", { keyPath: 'id', autoIncrement: false });
        }

        if (!db.objectStoreNames.contains("notes")) {
            db.createObjectStore("notes", { keyPath: 'id', autoIncrement: false })
        }
    }



}

/**
 * @param {Session} session 
 */
export function createSession(session) {
    let tx = db.transaction('session', 'readwrite');
    let txObjectStore = tx.objectStore('session');
    let txRequest = txObjectStore.add(session);

    txRequest.onerror = (e) => {
        console.error(`Error on save session: ${e}`);
    };
}

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
 * @param {Folder} folder 
 */
export function createFolder(folder) {
    let tx = db.transaction('folder', 'readwrite');
    let txObjectStore = tx.objectStore('folder');
    let txRequest = txObjectStore.put(folder);

    txRequest.onerror = (e) => {
        console.error(`Error on save session: ${e}`);
    };
}

export function findCreatedFolderID() {
    const tx = db.transaction('folder', 'readwrite');
    const txObjectStore = tx.objectStore('folder');
    const index = txObjectStore.index('folderName');
    const cursorRequest = index.openCursor(null, 'prev');

    cursorRequest.onsuccess = (e) => {
        //@ts-ignore
        console.log(e.target.result);
        // @ts-ignore
        return e.target.result.id
    }
}

/**
 * 
 * @param {string} currentFolderId
 */
export function findCurrentFolderById(currentFolderId){
    const tx = db.transaction('folder', 'readonly');
    const txObjectStore = tx.objectStore('folder');
    const txRequest = txObjectStore.get(currentFolderId)

    return new Promise ((resolve, reject) => {
        //@ts-ignore
        txRequest.onsuccess = (e) => resolve(e.target.result);
        txRequest.onerror = (e) => reject(e);
    })




}

/**
 * 
 * @param {string} id 
 * @returns {Promise<Session>}
 */
export function findById(id) {
    let tx = db.transaction('session', 'readonly');

    tx.onerror = (err) => console.error(err);

    let txObjectStore = tx.objectStore('session');
    //get() gives Object, getAll() gives Array -> has to get mapped before access attributes of ones objects
    let txRequest = txObjectStore.get(id);

    return new Promise((resolve, reject) => {
        txRequest.onsuccess = (e) => {
            // @ts-ignore
            resolve(e.target.result);
        }

        txRequest.onerror = (e) => {
            reject(e);
        }
    });
}

/**
 * @returns {Promise<Session[]>}
 */
export function getAll() {

    let tx = db.transaction('session', 'readonly');

    tx.onerror = (err) => console.error(err);

    let txObjectStore = tx.objectStore('session');
    //get() gives Object, getAll() gives Array -> has to get mapped before access attributes of ones objects
    let txRequest = txObjectStore.getAll();

    return new Promise((resolve, reject) => {
        txRequest.onsuccess = (e) => {
            // @ts-ignore
            resolve(e.target.result);
        }

        txRequest.onerror = (e) => {
            reject(e);
        }
    });
}
