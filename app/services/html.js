import { Folder } from "../models/folder.js";
import { saveFolderId } from "./localStorage.js";




/**
 * 
 * @param {string} name 
 * @param {string} id
 */
export function createHtmlFolder(name, id) {
    const btnFolder = document.createElement('button');
    btnFolder.textContent = name
    btnFolder.id = id;

    const folder = document.createElement('a');
    folder.href = "app/views/folder";
    folder.id = id;
    folder.insertAdjacentElement("afterbegin", btnFolder);

    document.body.appendChild(folder);

    btnFolder.addEventListener('click', (e) => {
        saveFolderId(folder.id);
    })
}

/**
 * 
 * @param {Folder} folder 
 */
export function createView(folder) {

}