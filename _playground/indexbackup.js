console.log("index first");

import { Session } from "./app/models/session.js";
import { Folder } from "./app/models/folder.js";
import { btnsView, createFolderView, createSidebar, createTitle } from "./app/services/htmlView.js";
import { removeTextField, addEventListenerReadInput, createTextField, rmCreateFolderSessionBtn, createFolder, createSession} from "./app/services/htmlElement.js";
import {  saveSession, findFolderById, initDB, saveFolder, saveFolderinCurrentFolder, saveSessioninCurrentFolder } from "./app/services/indexedDb.js";
import { initLocalStorage } from "./app/services/localStorage.js";
import { HomeFolder } from "./app/models/homeFolder.js";

/** @type {IDBDatabase} */
let db;
/**@type {string} */
let currentFolderId = initLocalStorage();
/**@type {Folder} */
let currentFolder;
/** @type {HomeFolder} */
let homeFolder;

const backBtn = document.getElementById("goBack");
const folderPfad = "/app/views/session/session.html";
const sessionPfad = "/app/views/session/session.html";
const iconSpaceStyle = "iconSpace"
const sidebarStyle = "sidebar"

initDB().then((/**@type {IDBDatabase}*/ database) => {
    db = database
    findFolderById("home").then((/** @type {HomeFolder} */foundHomeFolder) => {
        homeFolder = foundHomeFolder
        createSidebar(homeFolder)
 })
    findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        currentFolder = foundFolder;
        console.log("current Folder ",currentFolder);
        createFolderView(currentFolder.folders, currentFolder.sessions, folderPfad, sessionPfad);
        createTitle(currentFolder.name);
        btnsView(currentFolder.id, backBtn);
    })
})




backBtn.addEventListener("click", (e) => {
    localStorage.setItem("folderId", currentFolder.parentFolder)
})


export function createNewSession() {
    const textField = createTextField();
    addEventListenerReadInput(textField).then((input) => {
        const name = input
        const session = new Session(name, currentFolderId)
        removeTextField(textField);
        rmCreateFolderSessionBtn();
        saveSession(session);
        saveSessioninCurrentFolder(currentFolder, session);
        createSession(name, session.id, sessionPfad, document.getElementById("iconSpace"), session.objectType, iconSpaceStyle);
        findFolderById("home").then((folder)=>createSidebar(folder));
    })
}

export function createNewFolder() {
    const textField = createTextField();
    addEventListenerReadInput(textField).then((input) => {
        const name = input
        const folder = new Folder(name, currentFolderId);
        removeTextField(textField);
        rmCreateFolderSessionBtn();
        saveFolder(folder);
        saveFolderinCurrentFolder(currentFolder, folder);
        createFolder(name, folder.id, folderPfad, document.getElementById("iconSpace"), folder.objectType, iconSpaceStyle);
        findFolderById("home").then((folder)=>createSidebar(folder));
    });
}