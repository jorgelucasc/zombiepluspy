const { expect } = require("@playwright/test");

class Movies {
  constructor(page) {
    this.page = page;
  }

  async goForm() {
    await this.page.locator('a[href$="register"]').click()
  }

  async submit(){
    await this.page.getByRole('button', {name: "Cadastrar"}).click()
  }

  async create(movie) {
    await this.goForm()

    await this.page.getByLabel('Titulo do filme').fill(movie.title) //titulo do filme
    await this.page.getByLabel('Sinopse').fill(movie.overview) // sinopse do filme

    //seleciona a empresa do filme
    await this.page
      .locator("#select_company_id .react-select__indicator").click()

    await this.page
      .locator('.react-select__option')
      .filter({ hasText: movie.company }).click()

    //seleciona o ano do filme
    await this.page
      .locator("#select_year .react-select__indicator").click()

    await this.page
      .locator('.react-select__option')
      .filter({ hasText: movie.release_year }).click()

    await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + movie.cover)

    if(movie.featured) {
      await this.page.locator('.featured .react-switch').click()
    }
    
    await this.submit()
  }

  async alertHaveText(target){
    await expect(this.page.locator('.alert')).toHaveText(target)
  }

  async remove(title){
    await this.page.getByRole('row', {name: title}).getByRole('button').click()
    await this.page.click('.confirm-removal')
  }
}

export { Movies}