const { expect } = require("@playwright/test");

class MoviesPage {
  constructor(page) {
    this.page = page;
  }

  async loggedIn() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/.*admin/);
  }

  async create(title, overview, company, release_year) {
    await this.page.locator('a[href$="register"]').click();

    await this.page.locator("input[name=title]").fill(title); //titulo do filme
    await this.page.getByLabel("Sinopse").fill(overview); // sinopse do filme

    //seleciona a empresa do filme
    await this.page
      .locator("#select_company_id .react-select__indicator").click();

    await this.page
      .locator('.react-select__option')
      .filter({ hasText: company }).click();

    //seleciona o ano do filme
    await this.page
      .locator("#select_year .react-select__indicator").click();

    await this.page
      .locator('.react-select__option')
      .filter({ hasText: release_year }).click();

    await this.page.getByRole('button', {name: "Cadastrar"}).click();
  }
}

export { MoviesPage}