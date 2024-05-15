import { addEventListenerSavefolderId, createHtmlFolder } from "../app/services/html.js";
import { Folder } from "../app/models/folder.js";
import { createFolder, initDB, findFolderById, saveFolder } from "../app/services/indexedDb.js";
import { Session } from "../app/models/session.js";

initDB();

const btnCreateSession = document.getElementById("creatSession");
const btnCreateFolder = document.getElementById("createFolder");

let currentFolderId = "home";

btnCreateSession.addEventListener("click", (e) => {

})

btnCreateFolder.addEventListener("click", (e) => {
    //testData
    const testName = "testFolder"
    const session = new Session("Augenheilkunde1");
    const folder2 = new Folder ("Doktorarbeit");

    const folder = new Folder(testName);
    folder.folders.push(folder2);
    folder.sessions.push(session);

    createFolder(folder);
    findFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        foundFolder.folders.push(folder);
        saveFolder(foundFolder);
    });
    createHtmlFolder(testName, folder.id);
    addEventListenerSavefolderId(folder.id);
})

