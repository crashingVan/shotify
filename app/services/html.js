import { Session } from "../models/session.js";
import { Folder } from "../models/folder.js";
import { saveFolderId } from "./localStorage.js";




/**
 * 
 * @param {string} name 
 * @param {string} id
 */
export function createHtmlFolder(name, id) {
    const folderPfad = "/app/views/folder/folder.html";

    const btnFolder = document.createElement('button');
    btnFolder.textContent = name
    btnFolder.id = id;

    const folder = document.createElement('a');
    folder.href = folderPfad;
    folder.id = id;
    folder.insertAdjacentElement("afterbegin", btnFolder);

    document.body.appendChild(folder);
}

export function createHtmlSession(name, id) {
    const folderPfad = "/app/views/folder/folder.html";

    const btnSession = document.createElement('button');
    btnSession.textContent = name
    btnSession.id = id;

    const session = document.createElement('a');
    session.href = folderPfad;
    session.id = id;
    session.insertAdjacentElement("afterbegin", btnSession);

    document.body.appendChild(session);
}

/**
 * 
 * @param {string} folderId 
 */
export function addEventListenerSavefolderId(folderId){
    const btnFolder = document.getElementById(folderId);
    btnFolder.addEventListener('click', (e) => {
        console.log("hallo");
        saveFolderId(folderId);
    })
}

/**
 * 
 * @param {Folder[]} folders
 * @param {Session[]} sessions
 */
export function createFolderSessionView(folders, sessions) {
    folders.map((folder) => createHtmlFolder(folder.name, folder.id));
    sessions.map((session) => createHtmlSession (session.name, session.id));
}