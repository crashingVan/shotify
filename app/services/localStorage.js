

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
    localStorage.setItem("SessionId", id)
}

export function initLocalStorage() {
    if (localStorage.getItem("folderId") == null) {
        localStorage.setItem("folderId", "home");
        return "home";
    }
    else return localStorage.getItem("folderId")
}