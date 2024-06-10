import { addEventListenerReadInput, createSessionFolderBtns, createTextField, loadFolder, loadSession, loadSidebar, removeTextField, rmCreateFolderSessionBtn } from "../application/services/htmlElement.js";
import { createNewFolder } from "../application/services/folder.js";
import { createNewSession } from "../application/services/session.js";
import { goBack } from "../application/services/navigator.js";
import { folderPfad, iconSpaceStyle } from "../init.js";


export const backBtn = document.getElementById("goBack");
const addBtn = document.getElementById("addBtn");
const iconSpace = document.getElementById("iconSpace");
const addBtnParent = document.getElementById("addBtnDiv");

export var bigScreenshotWidth;
export var bigScreenshotHeight;

export var smallVideoWidth = "200px";
export var smallVideoHeight = "200px";
export var bigVideoWidth = "800px";
export var bigVideoHeight = "800px";

addBtn.addEventListener("click", (e) => {
    if (addBtnParent.querySelector("#createSessionBtn") == null) {
        createSessionFolderBtns()

        /** @type {HTMLButtonElement} */
        // @ts-ignore
        const createSessionBtn = document.getElementById("createSessionBtn");
        /** @type {HTMLButtonElement} */
        // @ts-ignore
        const createFolderBtn = document.getElementById("createFolderBtn");


        addBtnParent.querySelector("#createSessionBtn").addEventListener("click", (e) => {
            /** @type {HTMLInputElement} */
            const textField = createTextField();
            addEventListenerReadInput(textField).then((input) => {
                const session = createNewSession(input)
                removeTextField(textField);
                rmCreateFolderSessionBtn(createSessionBtn, createFolderBtn);
                loadSidebar()
                loadSession(input, session.id, folderPfad, iconSpace, session.objectType, iconSpaceStyle)

            })
        });
        addBtnParent.querySelector("#createFolderBtn").addEventListener("click", (e) => {
            /** @type {HTMLInputElement} */
            const textField = createTextField();
            addEventListenerReadInput(textField).then((input) => {
                const folder = createNewFolder(input)
                removeTextField(textField);
                rmCreateFolderSessionBtn(createSessionBtn, createFolderBtn);
                loadSidebar()
                loadFolder(input, folder.id, folderPfad, iconSpace, folder.objectType, iconSpaceStyle)

            });
        }
        )
    }
});

backBtn.addEventListener("click", (e) => {
    goBack();
})




