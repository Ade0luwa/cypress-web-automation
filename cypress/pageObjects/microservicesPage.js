/// <reference types= "cypress" />

class sourcesPage{
    getID(){
        return cy.get('input[name="processingUnitId"]')
    }
    getName(){
        return cy.get('input[name="processingUnitAliasName"]')
    }
    getIP(){
        return cy.get('input[name="ipAddress"]')
    }
    getPort(){
        return cy.get('input[name="port"]')
    }
    getSubmitBtn(){
        return cy.get('form > .MuiButtonGroup-root > .MuiButtonGroup-firstButton')
    }
    getSuccess(){
        return cy.get('.MuiAlert-message')
    }
}
export default sourcesPage
