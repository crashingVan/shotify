
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
/**
 * 
 * @param {string} parentFolderId 
 */
export function goBack(parentFolderId) {
    localStorage.setItem("folderId", parentFolderId)
}