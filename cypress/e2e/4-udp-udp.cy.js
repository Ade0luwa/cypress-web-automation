/// <reference types= "cypress" />
const data=require('../fixtures/'+Cypress.env("environment")+'/jsonData.config.json')
const url = Cypress.env('url')
const username = data.Username_Password.username
const password = data.Username_Password.password

describe( "UDP source - UDP destination Test",
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
        
      it('View table list of destination', function(){
        cy.login(username,password)
        cy.viewDestinations()
      })

      it('Create destination', function(){
        cy.login(username,password)
        cy.createUDPDestination()
        cy.startDestination('UDP')
      })
      
      it('Verify UDP-UDP connection', function(){
        cy.login(username,password)
        cy.verifyUDPSourceConnection()
        cy.verifyUDPDestinationConnection()
      })
})