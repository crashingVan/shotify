import { Session } from "../models/session.js";
import { Folder } from "../models/folder.js";
import { saveFolderId } from "./localStorage.js";




/**
 * 
 * @param {string} name 
 * @param {string} id
 */
export function createHtmlFolder(name, id) {
    const folderPfad = "/";

    const btnFolder = document.createElement('button');
    btnFolder.textContent = name
    btnFolder.id = id;

    const folder = document.createElement('a');
    folder.href = folderPfad;
    folder.id = id;
    folder.insertAdjacentElement("afterbegin", btnFolder);

    document.body.appendChild(folder);
    return folder;
}

/**
 * 
 * @param {string} name 
 * @param {string} id 
 */
export function createHtmlSession(name, id) {
    const folderPfad = "/app/views/session/session.html";

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
 * @param {Folder} folder
 */
export function addEventListenerSavefolderId(folder) {
    const btnFolder = document.getElementById(folder.id);
    btnFolder.addEventListener('click', (e) => {
        saveFolderId(folder.id);
    })
}

/**
 * 
 * @param {Folder[]} folders
 * @param {Session[]} sessions
 */
export function createFolderSessionView(folders, sessions) {
    folders.map((folder) => createHtmlFolder(folder.name, folder.id));
    sessions.map((session) => createHtmlSession(session.name, session.id));
}

export function createTextField() {
    const textField = document.createElement('input');
    textField.type = "text";
    textField.id = "textField";
    textField.placeholder = "name";
    document.body.appendChild(textField);
    return textField;

}

/**
 * 
 * @param {HTMLInputElement} textField 
 */
export function addEventListenerReadInput(textField) {
    return new Promise((resolve) => {
        textField.addEventListener("change", (e) => {
            //@ts-ignore
            console.log(document.getElementById(textField.id).value);
            //@ts-ignore
            resolve(document.getElementById(textField.id).value);
        }
        )
    })
}

/**
 * 
 * @param {HTMLInputElement} textField 
 */
export function removeTextField(textField) {
    textField.remove();
}

/**
 * 
 * @param {string} folderTitle 
 */
export function createTitle(folderTitle) {
    const title = document.createElement('h1')
    title.textContent = folderTitle;
    document.body.appendChild(title);
}

/**
 * 
 * @param {String} folderId 
 * @param {HTMLElement} button 
 */
export function rmBackBtnIfHome(folderId, button) {
    if (folderId == "home") {
        button.remove()
    }
}