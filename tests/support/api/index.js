const { expect } = require("@playwright/test");

export class Api {
  constructor(request) {
    this.request = request;
    this.token = undefined;
  }

  async setToken() {
    const response = await this.request.post("http://localhost:3333/sessions", {
      data: {
        email: "admin@zombieplus.com",
        password: "pwd123",
      },
    });

    expect(response.ok()).toBeTruthy();
    //Pego o response e converto para json, depois pego o token e guardo em uma variável para usar no próximo request
    const body = JSON.parse(await response.text());
    this.token = 'Bearer ' + body.token;

  }

  async postMovie(movie) {

    await this.setToken()

    const response = await this.request.post("http://localhost:3333/movies", {
      headers: {
        Authorization: this.token,
        ContentType: "multipart/form-data",
        Accept: "application/json, text/plain, */*",
      },
      multipart: {
        title: movie.title,
        overview: movie.overview,
        company_id: "259aec37-a52f-4058-9c4d-05bb1dad66c9",
        release_year: movie.release_year,
        featured: movie.featured,
      }
    })

    expect(response.ok()).toBeTruthy()
  }
}
