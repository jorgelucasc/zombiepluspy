import {expect} from '@playwright/test'

class Dialog {

    constructor(page) {
        this.page = page
    }

    async containText(message) {
        const dialog = this.page.locator('[role="dialog"]')

        await expect(dialog).toContainText(message)
        await expect(dialog).not.toBeVisible({ timeout: 6000 })
    }
}

export { Dialog }