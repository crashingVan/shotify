import { Session } from "../models/session.js";

/** @type {IDBDatabase} */
let db;

export function initDB() {
    //open returns IDBopenRequest which results in failure or success
    //if success or failure, "success" event or "failure"event gets fired with requestDatabse as the target
    //request.onsuccess or request.onerror gets activated
    const requestDb = indexedDB.open("shotify", 1);

    //requestDatabase.onsuccess Funktion wird ausgeführt wenn event eintritt und in {} steht was ausgeführt wird
    requestDb.onsuccess = (event) => {
        // @ts-ignore
        db = event.target.result;
    }

    //open objectstore through request.onupgradeneeded
    // THROUGH request.onupgradeneeded is the ONLY way to alter the structure of the database
    requestDb.onupgradeneeded = (event) => {
        // @ts-ignore
        const db = event.target.result;

        if (!db.objectStoreNames.contains('session')) {
            db.createObjectStore("session", { keyPath: 'id', autoIncrement: false });
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
export function create(session) {
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
export function save(session) {
    let tx = db.transaction('session', 'readwrite');
    let txObjectStore = tx.objectStore('session');
    let txRequest = txObjectStore.put(session);

    txRequest.onerror = (e) => {
        console.error(`Error on save session: ${e}`);
    };
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
