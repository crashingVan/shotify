import { HomeFolder } from "../../domain/models/homeFolder.js";
import { Folder } from "../../domain/models/folder.js";
import { Session } from "../../domain/models/session.js";
import { saveFolder } from "./folderDb.js";

/** @type {IDBDatabase} */
export let db;

export function initDB() {
    //open returns IDBopenRequest which results in failure or success
    //if success or failure, "success" event or "failure"event gets fired with requestDatabse as the target
    //request.onsuccess or request.onerror gets activated
    const requestDb = indexedDB.open("shotify", 4);

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

    return new Promise((resolve) => {
        requestDb.onsuccess = (event) => {
            // @ts-ignore
            db = event.target.result;
            resolve(db);
            const tx = db.transaction('folder', 'readonly');
            const txObjectStore = tx.objectStore('folder');
            const txRequest = txObjectStore.get("home");

            txRequest.onsuccess = (e) => {
                //@ts-ignore
                if (e.target.result == null) {
                    const homeFolder = new HomeFolder()
                    saveFolder(homeFolder);
                }
            }
        }
    })
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

