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

      it('UDP-DECODER-H264ENCODER-DESTINATION', function(){
        cy.visit(url)
        cy.login(username,password)
        cy.CreateConnectionFlow()
      })
      
      // it('UDP-DECODER-hevcENCODER-DESTINATION', function(){
      //   cy.visit(url)
      //   cy.login(username,password)
      //   cy.UDPSourceToDecoderToEncoderToDestination('HEVC')
      // })
})