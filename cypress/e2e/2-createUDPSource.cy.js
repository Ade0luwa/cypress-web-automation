/// <reference types= "cypress" />
const data=require('../fixtures/'+Cypress.env("environment")+'/jsonData.config.json')
const url = Cypress.env('url')
const username = data.Username_Password.username
const password = data.Username_Password.password

describe( "Sources Module",
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
        
      it('View table list of sources', function(){
        cy.login(username,password)
        cy.viewSources()
        cy.logout()
      })

      it('Create Source', function(){
        cy.login(username,password)
        cy.createUDPSource()
        cy.startSource('UDP')
        cy.verifyUDPSourceConnection()
        cy.logout()
      })      
})