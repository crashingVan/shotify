import { Session } from "./app/models/session.js";
import { Folder } from "./app/models/folder.js";
import { createFolderSessionView, createHtmlFolder } from "./app/services/html.js";
import { createFolder, findFolderById, findFolderLocation, initDB, saveFolder } from "./app/services/indexedDb.js";
import { initLocalStorage, rmFolderIdFromLocalStorage } from "./app/services/localStorage.js";

let currentFolderId = initLocalStorage();
initDB().then((e) => initFolderView(currentFolderId));
console.log("this folder:", currentFolderId);
const btnCreateSession = document.getElementById("creatSession");
const btnCreateFolder = document.getElementById("createFolder");
const btnBack = document.getElementById("goBack");

/**
 * 
 * @param {string} currentFolderId 
 */
function initFolderView(currentFolderId) {
    findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        createFolderSessionView(foundFolder.folders, foundFolder.sessions)
    })
}


btnCreateSession.addEventListener("click", (e) => {

})

btnCreateFolder.addEventListener("click", (e) => {
    //testData
    const testName = "testFolder"
    const session = new Session("Augenheilkunde1");
    const folder2 = new Folder ("Doktorarbeit", currentFolderId);

    const folder = new Folder(testName, currentFolderId);
    folder.folders.push(folder2);
    folder.sessions.push(session);

    createFolder(folder);
    findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        foundFolder.folders.push(folder);
        saveFolder(foundFolder);
    });
    createHtmlFolder(testName, folder.id);
})


btnBack.addEventListener("click", (e) => {
findFolderById(currentFolderId).then ((/** @type {Folder} */ foundFolder) => localStorage.setItem("folderId", foundFolder.folderLocation));
})
