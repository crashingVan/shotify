import { Session } from "./app/models/session.js";
import { Folder } from "./app/models/folder.js";
import { btnsView, createFolderView, createSidebar, createTitle } from "./app/services/htmlView.js";
import { removeTextField, addEventListenerReadInput, createHtmlFolder, createHtmlSession, createTextField, createSidebarElement} from "./app/services/htmlElement.js";
import { createFolder, createSession, findFolderById, initDB, saveFolderinCurrentFolder, saveSessioninCurrentFolder } from "./app/services/indexedDb.js";
import { initLocalStorage, saveSessionId } from "./app/services/localStorage.js";
import { HomeFolder } from "./app/models/homeFolder.js";

/** @type {IDBDatabase} */
let db;
/**@type {string} */
let currentFolderId = initLocalStorage();
/**@type {Folder} */
let currentFolder;
/** @type {HomeFolder} */
let homeFolder;

const createSessionBtn = document.getElementById("creatSession");
const createFolderBtn = document.getElementById("createFolder");
const backBtn = document.getElementById("goBack");

initDB().then((/**@type {IDBDatabase}*/ database) => {
    db = database
    findFolderById("home").then((/** @type {HomeFolder} */foundHomeFolder) => {
        homeFolder = foundHomeFolder
        createSidebar(homeFolder)
 })
    findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        currentFolder = foundFolder;
        createFolderView(currentFolder.folders, currentFolder.sessions)
        createTitle(currentFolder.name);
        btnsView(currentFolder.id, backBtn);
    })
})


createSessionBtn.addEventListener("click", (e) => {
    const textField = createTextField();
    addEventListenerReadInput(textField).then((input) => {
        const name = input
        const session = new Session(name, currentFolderId)
        removeTextField(textField);
        createSession(session);
        saveSessioninCurrentFolder(currentFolder, session);
        createHtmlSession(name, session.id);
        findFolderById("home").then((folder)=>createSidebar(folder));
    })
})

createFolderBtn.addEventListener("click", (e) => {
    const textField = createTextField();
    addEventListenerReadInput(textField).then((input) => {
        const name = input
        const folder = new Folder(name, currentFolderId);
        removeTextField(textField);
        createFolder(folder);
        saveFolderinCurrentFolder(currentFolder, folder);
        createHtmlFolder(name, folder.id);
        findFolderById("home").then((folder)=>createSidebar(folder));
    });
})

backBtn.addEventListener("click", (e) => {
    localStorage.setItem("folderId", currentFolder.parentFolder)
})
