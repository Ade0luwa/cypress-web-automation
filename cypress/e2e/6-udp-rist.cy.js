/// <reference types= "cypress" />
const data=require('../fixtures/'+Cypress.env("environment")+'/jsonData.config.json')
const url = Cypress.env('url')
const url1 = Cypress.env('url1')
const username = data.Username_Password.username
const password = data.Username_Password.password
const mainRFKip = data.Create.mainRFKip
const secondRFKip = data.Create.secondRFKip

describe( "UDP source - RIST destination - RIST source",
    {
        viewportWidth: 1536,
        viewportHeight: 960
    },
    function() {
        before('Intialize Test Data', function(){

        })
        beforeEach(()=>{
            
          })

      it('Create SIMPLE RIST destination in main reflektor', function(){
        cy.visit(url)
        cy.login(username,password)
        cy.createRISTDestination('SIMPLE', secondRFKip)
        cy.startDestination('RIST')
      })

      it('Create SIMPLE RIST Source in second reflektor', function(){
        cy.visit(url1)
        cy.login(username,password)
        cy.createRISTSource('SIMPLE')
        cy.startSource('RIST')
      })

      it('Verify RIST Destination in RFK 1 and RIST Source in RFK2', function(){
        cy.verifyConnections(url, url1, 'RIST', username, password)
      }) 

      it('Create MAIN RIST destination in main reflektor', function(){
        cy.visit(url)
        cy.login(username,password)
        cy.createRISTDestination('MAIN', secondRFKip)
        cy.startDestination('RIST')
      })

      it('Create MAIN RIST Source in second reflektor', function(){
        cy.visit(url1)
        cy.login(username,password)
        cy.createRISTSource('MAIN')
        cy.startSource('RIST')
      })

      it('Verify RIST Destination in RFK 1 and RIST Source in RFK2', function(){
        cy.verifyConnections(url, url1, 'RIST', username, password)
      })   
})