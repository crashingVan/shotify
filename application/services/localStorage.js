
export function getCurrentFolderId() {
    if (localStorage.getItem("folderId") == null) {
        localStorage.setItem("folderId", "home");
        return "home";
    }
    else return localStorage.getItem("folderId")
}

/**
 * 
 * @param {string} id 
 */
export function saveFolderId(id) {
    localStorage.setItem("folderId", id)
}

/**
 * 
 * @param {string} id 
 */
export function saveSessionId(id) {
    localStorage.setItem("sessionId", id)
}
