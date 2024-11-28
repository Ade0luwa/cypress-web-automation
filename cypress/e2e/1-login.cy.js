/// <reference types= "cypress" />
const data=require('../fixtures/'+Cypress.env("environment")+'/jsonData.config.json')
const url = Cypress.env('url')
const username = data.Username_Password.username
const password = data.Username_Password.password
const invalidPassword = data.Username_Password.invalidPassword
const invalidUsername = data.Username_Password.invalidUsername


describe( "Login Module",
    {
        viewportWidth: 1536,
        viewportHeight: 960
    },
    function() {
        before('Intialize Test Data', function(){

        })
        beforeEach(()=>{
            cy.visit(url);
          })
        
      it('Login with a valid username and password', function(){
        cy.login(username,password)
        cy.logout()
      })

      it('Login with valid username and invalid password', function(){
        cy.invalidPassword(username,invalidPassword)
      })

      it('Login with invalid username and valid password', function(){
        cy.invalidUsername(invalidUsername,password)
      })
})