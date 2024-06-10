import { addEventListenerReadInput, createSessionFolderBtns, createTextField, loadFolder, loadFoldersAndSessions, loadSession, loadSidebar, loadTitle, removeTextField, rmBackBtnIfHome, rmCreateFolderSessionBtn } from "../application/services/htmlElement.js";
import { createNewFolder } from "../application/services/folder.js";
import { createNewSession } from "../application/services/session.js";
import { goBack } from "../application/services/navigator.js";
import { getCurrentFolderId } from "../application/services/localStorage.js";
import { initDB } from "../infrastructure/db/initIndexedDb.js";
import { findFolderById } from "../infrastructure/db/folderDb.js";
import { HomeFolder } from "../domain/models/homeFolder.js";
import { Folder } from "../domain/models/folder.js";


/** @type {IDBDatabase} */
let db;
/**@type {string} */
 let currentFolderId;
/**@type {Folder} */
 let currentFolder;
/** @type {HomeFolder} */
 let homeFolder;

 const folderPfad = "/";
 const sessionPfad = "/application/views/session/session.html";
 const iconSpaceStyle = "iconSpace"
 const sidebarStyle = "sidebar"
 var bigScreenshotWidth;
 var bigScreenshotHeight;
 var smallVideoWidth = "200px";
 var smallVideoHeight = "200px";
 var bigVideoWidth = "800px";
 var bigVideoHeight = "800px";



window.onpageshow = () => {
    currentFolderId = getCurrentFolderId();

    initDB().then((/**@type {IDBDatabase}*/ database) => {
        db = database
        findFolderById("home").then((/** @type {HomeFolder} */foundHomeFolder) => {
            homeFolder = foundHomeFolder;
            loadSidebar();
        })
        findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
            currentFolder = foundFolder;
            console.log("current Folder ", currentFolder);
            initInterface();
        })
    })
}

 function initInterface() {
    rmBackBtnIfHome(currentFolder.id, backBtn);
    loadTitle(currentFolder.name);
    loadFoldersAndSessions(currentFolder, folderPfad, sessionPfad);
    loadSidebar();
}


export const backBtn = document.getElementById("goBack");
const addBtn = document.getElementById("addBtn");
const iconSpace = document.getElementById("iconSpace");
const addBtnParent = document.getElementById("addBtnDiv");



addBtn.addEventListener("click", (e) => {
    if (addBtnParent.querySelector("#createSessionBtn") == null) {
        createSessionFolderBtns()

        /** @type {HTMLButtonElement} */
        // @ts-ignore
        const createSessionBtn = document.getElementById("createSessionBtn");
        /** @type {HTMLButtonElement} */
        // @ts-ignore
        const createFolderBtn = document.getElementById("createFolderBtn");


        addBtnParent.querySelector("#createSessionBtn").addEventListener("click", (e) => {
            /** @type {HTMLInputElement} */
            const textField = createTextField();
            addEventListenerReadInput(textField).then((input) => {
                const session = createNewSession(input, currentFolder)
                removeTextField(textField);
                rmCreateFolderSessionBtn(createSessionBtn, createFolderBtn);
                loadSidebar()
                loadSession(input, session.id, folderPfad, iconSpace, session.objectType, iconSpaceStyle)

            })
        });
        addBtnParent.querySelector("#createFolderBtn").addEventListener("click", (e) => {
            /** @type {HTMLInputElement} */
            const textField = createTextField();
            addEventListenerReadInput(textField).then((input) => {
                const folder = createNewFolder(input,currentFolder)
                removeTextField(textField);
                rmCreateFolderSessionBtn(createSessionBtn, createFolderBtn);
                loadSidebar()
                loadFolder(input, folder.id, folderPfad, iconSpace, folder.objectType, iconSpaceStyle)

            });
        }
        )
    }
});

backBtn.addEventListener("click", (e) => {
    goBack(currentFolder);
})




