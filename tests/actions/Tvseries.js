const { expect } = require("@playwright/test");

class Tvseries {
  constructor(page) {
    this.page = page;
  }

  async goForm() {
    await this.page.locator('a[href$="register"]').click()
  }

  async submit(){
    await this.page.getByRole('button', {name: "Cadastrar"}).click()
  }

  async create(tvseries) {
    await this.goForm()

    await this.page.getByLabel('Titulo do filme').fill(tvseries.title) //titulo do filme
    await this.page.getByLabel('Sinopse').fill(tvseries.overview) // sinopse do filme

    //seleciona a empresa do filme
    await this.page
      .locator("#select_company_id .react-select__indicator").click()

    await this.page
      .locator('.react-select__option')
      .filter({ hasText: tvseries.company }).click()

    //seleciona o ano do filme
    await this.page
      .locator("#select_year .react-select__indicator").click()

    await this.page
      .locator('.react-select__option')
      .filter({ hasText: tvseries.release_year }).click()

    await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + tvseries.cover)

    if(tvseries.featured) {
      await this.page.locator('.featured .react-switch').click()
    }
    
    await this.submit()
  }

  async search(target){
    await this.page.getByPlaceholder('Busque pelo nome').fill(target)
    await this.page.click('.actions button')
  }

  async tableHave(content){
    const rows = this.page.getByRole('row')
    await expect(rows).toContainText(content)
  }

  async alertHaveText(target){
    await expect(this.page.locator('.alert')).toHaveText(target)
  }

  async remove(title){
    await this.page.getByRole('row', {name: title}).getByRole('button').click()
    await this.page.click('.confirm-removal')
  }
}

export { Tvseries }