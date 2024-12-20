/// <reference types= "cypress" />

class microservicesPage{
    getMicroserviceTab(){
        return cy.get('.MuiTabs-flexContainer > :nth-child(3)')
    }
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
    getVideoControls(){
        return cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiAccordionSummary-content > .title-5')
    }
    getVideoPID(){
        return cy.get('input[name="videoPid"]')
    }
}
export default microservicesPage
