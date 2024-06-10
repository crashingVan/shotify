
/**
 *
 * @param {HTMLElement} obj1
 * @param {HTMLElement} obj2
 * @param {HTMLElement} parent
 */
export function createDivWith2ObjectsInParent(obj1, obj2, parent) {
    const div = document.createElement("div");
    div.appendChild(obj1);
    div.appendChild(obj2);
    parent.appendChild(div);

    return div;
}
/**
 *
 * @param {HTMLElement} obj1
 * @param {HTMLElement} parent
 */
function createDivWithObjectinParent(obj1, parent) {
    const div = document.createElement("div");
    div.appendChild(obj1);
    parent.appendChild(div);
    return div;
}

/**
 *
 * @param {HTMLElement} obj1
 * @param {HTMLElement} obj2
 */
export function createDivWith2Objects(obj1, obj2) {
    const div = document.createElement("div");
    div.appendChild(obj1);
    div.appendChild(obj2);
    return div;
}
/**
 *
 * @param {HTMLElement} obj
 * @param {HTMLElement} parent
 */
export function putObjectInParent(obj, parent) {
    parent.appendChild(obj);
}
