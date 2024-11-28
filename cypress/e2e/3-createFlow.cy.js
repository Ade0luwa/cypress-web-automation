/// <reference types= "cypress" />
const data=require('../fixtures/'+Cypress.env("environment")+'/jsonData.config.json')
const url = Cypress.env('url')
const username = data.Username_Password.username
const password = data.Username_Password.password

describe( "Flows Module",
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
        
      it('View table list of flow', function(){
        cy.login(username,password)
        cy.viewFlows()
        cy.logout()
      })

      it('Create flow', function(){
        cy.login(username,password)
        cy.createFlow()
        cy.startFlow()
      })      
})