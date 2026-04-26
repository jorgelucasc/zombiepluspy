const { test, expect } = require('../support')

const { faker } = require('@faker-js/faker')

test('deve cadastrar novo lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName,leadEmail)
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.toast.containText(message)


  //aqui é um exemplo com href
  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
  //await page.locator('#name').fill('Jorge Lucas');
  //exemplo com propriedade
  //await page.locator('input[name="name"]').fill('Jorge Lucas');
  /*await page.getByText('seus dados conosco').click();
  const content = await page.content()
  console.log(content);*/
});

test('deve validar um email já existente no sistema e não cadastrar', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead =await request.post('http://localhost:3333/leads',{
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName,leadEmail)
  
  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.toast.containText(message)
});

test('não deve cadastrar com email inválido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Jorge Lucas','lucashotmail.com')

  await page.leads.alertHaveText('Email incorreto')

});

test('não deve cadastrar sem email', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Jorge Lucas','')

    
  await page.leads.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar sem nome', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('','lucas@hotmail.com')
 
  await page.leads.alertHaveText('Campo obrigatório')
});