

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

