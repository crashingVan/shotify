export class Screenshot {
    /** @type {Date} */
    date;
    /** @type {ImageBitmap} */
    bitmap;
    /** @type {string} */
    id;
    constructor(bitmap) {
        this.date = new Date();
        this.bitmap = bitmap;
        this.id = crypto.randomUUID();
        this.id = "c" + this.id;
        console.log(this.id)
    }
}