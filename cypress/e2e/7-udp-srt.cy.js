/// <reference types= "cypress" />
const data=require('../fixtures/'+Cypress.env("environment")+'/jsonData.config.json')
const url = Cypress.env('url')
const url1 = Cypress.env('url1')
const username = data.Username_Password.username
const password = data.Username_Password.password
const mainRFKip = data.Create.mainRFKip
const secondRFKip = data.Create.secondRFKip


describe( "UDP source - SRT destination - SRT source",
    {
        viewportWidth: 1536,
        viewportHeight: 960
    },
    function() {
        before('Intialize Test Data', function(){
        })
        beforeEach(()=>{
            
          })

      it('Create CALLER SRT destination in main rfk', function(){
        cy.visit(url)
        cy.login(username,password)
      //   cy.createSRTDestination('CALLER', secondRFKip)
      //   cy.startDestination('SRT')
      // })  

      // it('Create LISTENER SRT Source in second reflektor', function(){
      //   cy.visit(url1)
      //   cy.login(username,password)
      //   cy.createSRTSource('LISTENER')
      //   cy.startSource('SRT')
      // })
      // it('Verify SRT Destination in RFK 1 and RIST Source in RFK2', function(){
      //   cy.verifyConnections(url, url1, 'SRT', username, password)
      }) 
})