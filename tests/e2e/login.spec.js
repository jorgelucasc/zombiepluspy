const { test } = require("../support");

test("deve logar como administrador", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.login.loggedIn()
});

test("não deve logar com senha incorreta", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "wrongpassword");

  const message =
    "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await page.popup.haveText(message);
});

test("não deve logar com email não preenchido", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("", "pwd123");

  await page.login.alertHaveText('Campo obrigatório')
});

test("não deve logar com senha não preenchida", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("zombieplus@gmail.com", "");

  await page.login.alertHaveText('Campo obrigatório')
});

test("não deve logar sem email e senha preenchidos", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("", "");

  await page.login.alertHaveText(["Campo obrigatório","Campo obrigatório"])
});