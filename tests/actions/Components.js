const {expect} = require('@playwright/test')

export class Popup {

    constructor(page) {
        this.page = page
    }

    async haveText(message) {
        const dialog = this.page.locator('.swal2-html-container')

        await expect(dialog).toHaveText(message)
    }
}