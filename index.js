import { createHtmlFolder } from "./app/services/html.js";
import { Folder } from "./app/models/folder.js";
import { createFolder, findCreatedFolderID, initDB, findCurrentFolderById, saveFolder } from "./app/services/indexedDb.js";

initDB();

const btnCreateSession = document.getElementById("creatSession");
const btnCreateFolder = document.getElementById("createFolder");

let currentFolderId = "home";

btnCreateSession.addEventListener("click", (e) => {

})

btnCreateFolder.addEventListener("click", (e) => {
    //testData
    const testName = "testFolder"

    const folder = new Folder(testName);
    createFolder(folder);
    findCurrentFolderById(currentFolderId).then((/** @type {Folder} */ foundFolder) => {
        foundFolder.folders.push(folder);
        saveFolder(foundFolder);
    });
    createHtmlFolder(testName, folder.id);

})

