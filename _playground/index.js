import { Session } from "../domain/models/session.js";
import { Folder } from "../domain/models/folder.js";
import { loadBtns } from "../ui/interface.js";
import { loadTitle } from "application/services/htmlElement.js";
import { loadSidebar } from "application/services/htmlElement.js";
import { loadFoldersAndSessions } from "application/services/htmlElement.js";
import { removeTextField, addEventListenerReadInput, createTextField, loadFolder, loadSession, createSessionFolderBtns, rmCreateFolderSessionBtn } from "../application/services/htmlElement.js";
import { initDB } from "../infrastructure/db/initIndexedDb.js";
import { saveSession, saveSessioninCurrentFolder } from "infrastructure/db/saveSession.js";
import { findFolderById, saveFolder, saveFolderinCurrentFolder } from "infrastructure/db/folder/folderDb.js";
import { initLocalStorage as getCurrentFolderId, saveFolderId, saveSessionId } from "../application/services/localStorage.js";
import { HomeFolder } from "../domain/models/homeFolder.js";
import { goBack, goToFolder, goToSession } from "../application/services/navigator.js";

/** @type {IDBDatabase} */
let db;
/**@type {string} */
let currentFolderId;
/**@type {Folder} */
let currentFolder;
/** @type {HomeFolder} */
let homeFolder;

const folderPfad = "/";
const sessionPfad = "/app/views/session/session.html";
const iconSpaceStyle = "iconSpace"
const sidebarStyle = "sidebar"

const backBtn = document.getElementById("goBack");
const addBtn = document.getElementById("addBtn");
const iconSpace = document.getElementById("iconSpace");

window.onpageshow = () => {
    currentFolderId = getCurrentFolderId();

    initDB().then((/**@type {IDBDatabase}*/ database) => {
        db = database
        findFolderById("home").then((/** @type {HomeFolder} */foundHomeFolder) => {
            homeFolder = foundHomeFolder;
            loadSidebar(homeFolder);
        })
        findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
            currentFolder = foundFolder;
            console.log("current Folder ", currentFolder);
            loadFoldersAndSessions(currentFolder.folders, currentFolder.sessions, folderPfad, sessionPfad);
            loadTitle(currentFolder.name);
            loadBtns(currentFolder.id, backBtn, addBtn);
        })
    })
}

function createNewSession() {
    const textField = createTextField();
    addEventListenerReadInput(textField).then((input) => {
        const name = input
        const session = new Session(name, currentFolderId)
        removeTextField(textField);
        rmCreateFolderSessionBtn();
        saveSession(session);
        saveSessioninCurrentFolder(currentFolder, session);

        findFolderById("home").then((folder) => loadSidebar(folder));
    })
}

function createNewFolder() {
    
    const textField = createTextField();
    addEventListenerReadInput(textField).then((input) => {
        const name = input
        const folder = new Folder(name, currentFolderId);
        removeTextField(textField);
        rmCreateFolderSessionBtn();
        saveFolder(folder);
        saveFolderinCurrentFolder(currentFolder, folder);
        console.log("folder",folder)
        console.log("e+folderID", "#e"+folder.id)
       const createdFolder = loadFolder(name, folder.id, folderPfad, document.getElementById("iconSpace"), folder.objectType, iconSpaceStyle);
console.log("created F", loadFolder);
const element = createdFolder.querySelector("#e" + folder.id)
console.log("element",element);

    });
}