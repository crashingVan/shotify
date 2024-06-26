import { Session } from "../../domain/models/session.js";
import { Folder } from "../../domain/models/folder.js";
import { saveSessionId, saveFolderId } from "./localStorage.js";
import { putObjectInParent, createDivWith2Objects, createDivWith2ObjectsInParent } from "./htmlDivCreator.js";
import { goToFolder, goToSession } from "./navigator.js";
import { findFolderById } from "../../infrastructure/db/folderDb.js";

export var smallVideoWidth = "200px";
export var smallVideoHeight = "200px";
export var bigVideoWidth = "800px";
export var bigVideoHeight = "800px";

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
 * @param {string} name 
 * @param {string} id 
 * @param {string} pfad
 * @param {HTMLElement} parentElement 
 * @param {string} styleObject
 * @param {string} style
 */
export function loadSession(name, id, pfad, parentElement, styleObject, style) {
    const session = createHtmlFolderOrSession(name, id, pfad)
    session.querySelector("#e"+id).addEventListener("click", () => goToSession(session.id))
    putObjectInParent(session, parentElement)
    styleFolder(session, styleObject, style)
    return session;
}

//folder contains:
//folderBtn inside folderLinkWithBtn ("e" + id; "e"lementBtn + id)
//nameBtn ("n" + id; "n"ameBtn + id)
/**
 *
 * @param {string} name
 * @param {string} id
 */
function createHtmlFolderOrSession(name, id, pfad) {
    // const folderPfad = "/";

    const elementBtn = document.createElement('button');
    elementBtn.id = "e" + id;

    const folderLinkWithBtn = document.createElement('a');
    folderLinkWithBtn.href = pfad;
    folderLinkWithBtn.appendChild(elementBtn);

    const nameBtn = document.createElement('button');
    nameBtn.textContent = name;
    nameBtn.id = "n" + id;

    const element = createDivWith2Objects(folderLinkWithBtn, nameBtn)
    element.id = id;

    return element;
}

/**
 * 
 * @param {string} name 
 * @param {string} id 
 * @param {string} pfad
 * @param {HTMLElement} parentElement 
 * @param {string} styleObject
 * @param {string} style
 */
export function loadFolder(name, id, pfad, parentElement, styleObject, style) {
    const folder = createHtmlFolderOrSession(name, id, pfad)
    const btn = folder.querySelector("#e"+id);
    btn.addEventListener("click", () => goToFolder(folder.id))
    putObjectInParent(folder, parentElement)
    styleFolder(folder, styleObject, style)
    return folder;
}

/**
 * 
 * @param {HTMLElement} folder 
 * @param {string} styleObject
 * @param {string} style
 */
function styleFolder(folder, styleObject, style) {
    folder.querySelector("#n" + folder.id).classList.add(`${styleObject}` + `${style}` + "NameBtn");
    //nameBtn.classList.add("nameBtn");

    //folder.querySelector("#e" + folder.id).classList.add("fa-regular", "fa-folder", `${styleObject}`+`${style}`  + "Icon");
    // folderBtn.classList.add("fa-regular", "fa-folder", "iconSpaceIcon")

    folder.classList.add(`${styleObject}` + `${style}` + 'FolderAndName')
    // divFolderName.classList.add(`${style}`+'iconName')
    if (styleObject == "folder") {
        folder.querySelector("#e" + folder.id).classList.add("fa-solid", "fa-folder", `${styleObject}` + `${style}` + "Icon");
        // folderBtn.classList.add("fa-regular", "fa-folder", "iconSpaceIcon")
    }
    else if (styleObject == "session") {
        folder.querySelector("#e" + folder.id).classList.add("fa-solid", "fa-file", `${styleObject}` + `${style}` + "Icon");
    }
}



/**
 *
 * @param {HTMLInputElement} textField
 */
export function addEventListenerReadInput(textField) {
    return new Promise((resolve) => {
        textField.addEventListener("change", (e) => {
            //@ts-ignore
            resolve(document.getElementById(textField.id).value);
        }
        );
    });
}


/**
 *
 * @param {String} folderId
 */
export function rmBackBtnIfHome(folderId, btn) {
    if (folderId == "home") {
        btn.remove();
    }
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
 * @param {Folder|Session} element 
 */
export function createSidebarElement(element) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.querySelector("#" + element.id) == null) {
        var padding = 20;

        const div = document.createElement('div');
        // const toggelBtn = document.createElement('button');
        const elementBtn = document.createElement('button');
        const folderLink = document.createElement('a');
        const nameBtn = document.createElement('button');


        if (element.id.charAt(0) == "f" || element.id.charAt(0) == "h") {
            folderLink.href = "/";
            elementBtn.classList.add("fa-regular", "fa-folder", "foldersidebarIcon")

        }
        else {
            folderLink.href = "/app/views/session/session.html"
            elementBtn.classList.add("fa-solid", "fa-file", "sessionsidebarIcon");
            elementBtn.addEventListener('click', (e) => {
                saveSessionId(element.id);
            });
        }

        nameBtn.textContent = element.name;
        nameBtn.classList.add("sidebarNameBtn")

        elementBtn.id = element.id;

        // toggelBtn.id = element.id
        div.id = element.id
        div.style.paddingLeft = `${padding}` + "px";

        elementBtn.addEventListener("click", (e) => saveFolderId(element.id))

        folderLink.appendChild(elementBtn)
        // div.appendChild(toggelBtn);
        div.appendChild(folderLink);
        div.appendChild(nameBtn);

        const parent = sidebar.querySelector("#" + element.parentFolder);
        sidebar.appendChild(div);

        if (parent != null) {
            parent.appendChild(div);
        }
    }
}



export function createSessionFolderBtns() {
    const addBtnParentDiv = document.getElementById("addBtnDiv");
    const createSessionBtn = createHTMLCreateSessionBtn();
    const createFolderBtn =createHTMLCreateFolderBtn();
    createDivWith2ObjectsInParent(createHTMLCreateSessionBtn(),
    createHTMLCreateFolderBtn(), addBtnParentDiv);
    return {createSessionBtn: createSessionBtn, createFolderBtn: createFolderBtn}
}


 function createHTMLCreateSessionBtn() {
    const createSessionBtn = document.createElement("button");
    createSessionBtn.id = "createSessionBtn"
    createSessionBtn.textContent = "create Session";
    return createSessionBtn;
}


 function createHTMLCreateFolderBtn() {
    const createFolderBtn = document.createElement("button");
    createFolderBtn.id = "createFolderBtn"
    createFolderBtn.textContent = "create Folder"
    return createFolderBtn;
}

/**
 * 
 * @param {HTMLButtonElement} createSessionBtn 
 * @param {HTMLButtonElement} createFolderBtn 
 */
export function rmCreateFolderSessionBtn(createSessionBtn, createFolderBtn) {
    document.getElementById("createSessionBtn")
    document.getElementById("createFolderBtn")
  // createSessionBtn.remove();
   //createFolderBtn.remove();
}
/**
 *
 * @param {Folder} folder
 * @param {string} pfadFolder
 * @param {string} pfadSession
 *
 */
export function loadFoldersAndSessions(folder, pfadFolder, pfadSession) {
    folder.folders.map((folder) => loadFolder(folder.name, folder.id, pfadFolder, document.getElementById("iconSpace"), folder.objectType, "iconSpace"));
    folder.sessions.map((session) => loadSession(session.name, session.id, pfadSession, document.getElementById("iconSpace"), session.objectType, "iconSpace"));
}

export function loadSidebar() {
    findFolderById("home").then((folder) => {createSidebarElement(folder)
        loadItemsOf(folder);
    });
}
/**
 *
 * @param {Folder} folder
 */

export function loadItemsOf(folder) {
    findFolderById(folder.id).then((folder) => {
        ;
        folder.folders.map((folder) => {
            createSidebarElement(folder);
            loadItemsOf(folder);
        });
        folder.sessions.map((session) => {
            createSidebarElement(session);
        });
    });
}
/**
 *
 * @param {string} title
 */

export function loadTitle(title) {
    const titleElement = document.createElement('h1');
    const header = document.getElementById("header");
    titleElement.textContent = title;

    titleElement.classList.add("title");
    header.appendChild(titleElement);
}


