export class Screenshot {
    /** @type {Date} */
    date;
    /** @type {ImageBitmap} */
    bitmap;

    constructor(bitmap){
        this.date = new Date();
        this.bitmap = bitmap;
    }
}