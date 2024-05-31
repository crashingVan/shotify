import { Session } from "./app/models/session.js";
import { Folder } from "./app/models/folder.js";
import { btnsView, createFolderView, createSideBar, createTitle } from "./app/services/htmlView.js";
import { removeTextField, addEventListenerReadInput, createHtmlFolder, createHtmlSession, createTextField} from "./app/services/htmlElement.js";
import { createFolder, createSession, findFolderById, initDB, saveFolderinCurrentFolder, saveSessioninCurrentFolder } from "./app/services/indexedDb.js";
import { initLocalStorage, saveSessionId } from "./app/services/localStorage.js";

/** @type {IDBDatabase} */
let db;
/**@type {string} */
let currentFolderId = initLocalStorage();
/**@type {Folder} */
let currentFolder;

const createSessionBtn = document.getElementById("creatSession");
const createFolderBtn = document.getElementById("createFolder");
const backBtn = document.getElementById("goBack");

initDB().then((/**@type {IDBDatabase}*/ database) => {
    db = database
    findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        currentFolder = foundFolder;
        createFolderView(currentFolder.folders, currentFolder.sessions)
        console.log(currentFolder.name);
        createTitle(currentFolder.name);
        btnsView(currentFolder.id, backBtn);
        createSideBar(currentFolder);
    })
})
console.log("this folder:", currentFolderId);



createSessionBtn.addEventListener("click", (e) => {
    const textField = createTextField();
    addEventListenerReadInput(textField).then((input) => {
        const name = input
        const session = new Session(name)
        removeTextField(textField);
        createSession(session);
        saveSessionId(session.id);
        saveSessioninCurrentFolder(currentFolder, session);
        createHtmlSession(name, session.id);
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
    });
})

backBtn.addEventListener("click", (e) => {
    localStorage.setItem("folderId", currentFolder.folderLocation)
})
