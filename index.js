import { Session } from "./app/models/session.js";
import { Folder } from "./app/models/folder.js";
import { loadBtns, loadFoldersAndSessions, loadSidebar, loadTitle } from "./app/services/htmlView.js";
import { removeTextField, addEventListenerReadInput, createTextField, createFolder, createSession, createSessionFolderBtns } from "./app/services/htmlElement.js";
import { rmCreateFolderSessionBtn } from "./app/services/htmlElement.js";
import { saveSession, findFolderById, initDB, saveFolder, saveFolderinCurrentFolder, saveSessioninCurrentFolder } from "./app/services/indexedDb.js";
import { initLocalStorage as getCurrentFolderId, saveFolderId, saveSessionId } from "./app/services/localStorage.js";
import { HomeFolder } from "./app/models/homeFolder.js";
import { goBack, goToFolder, goToSession } from "./app/services/navigator.js";

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

    backBtn.addEventListener("click", (e) => {
        goBack(currentFolder.parentFolder)
    })
    
    addBtn.addEventListener("click", (e) => {
        const addBtnParent = document.getElementById("addBtnDiv");
        if (addBtnParent.querySelector("#createSessionBtn") == null) {
            createSessionFolderBtns();
            addBtnParent.querySelector("#createSessionBtn").addEventListener("click", (e) => createNewSession());
            addBtnParent.querySelector("#createFolderBtn").addEventListener("click", (e) => createNewFolder());
        }
    });

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
       const createdFolder = createFolder(name, folder.id, folderPfad, document.getElementById("iconSpace"), folder.objectType, iconSpaceStyle);
console.log("created F", createFolder);
const element = createdFolder.querySelector("#e" + folder.id)
console.log("element",element);

    });
}