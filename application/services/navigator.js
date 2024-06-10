import { currentFolder } from "../../init.js";



/**
 * 
 * @param {string} folderDestination 
 */
export function goToFolder(folderDestination) {
    localStorage.setItem("folderId", folderDestination);
}
/**
 * 
 * @param {string} sessionDestination 
 */
export function goToSession(sessionDestination) {
    localStorage.setItem("sessionId", sessionDestination);
}

export function goBack() {
    localStorage.setItem("folderId", currentFolder.parentFolder)
}