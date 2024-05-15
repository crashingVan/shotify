

/**
 * 
 * @param {string} id 
 */
export function saveFolderId(id) {
    localStorage.setItem("folderId", id)
}

export function rmFolderIdFromLocalStorage() {
    localStorage.removeItem("folderId");
}

export function initLocalStorage() {
    if (localStorage.getItem("folderId") == 'undefined') {
        localStorage.setItem("folderId", "home");
        return "home";
    }
    else return localStorage.getItem("folderId")
}