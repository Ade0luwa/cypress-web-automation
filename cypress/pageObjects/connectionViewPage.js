/// <reference types= "cypress" />

class connectionViewPage{
    getConnectionViewPage(){
        return cy.get('.tab-content > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > [tabindex="-1"]')
    }
    getConnectionsCreateBtn(){
        return cy.get('.tab-group-actions > .MuiButtonBase-root')
    }
    getFlowId(){
        return cy.get('#flow-id')
    }
    getFlowName(){
        return cy.get('#flow-alias-name')
    }
    getSourceField(){
        return cy.xpath('/html/body/div/div/div/div[2]/div[2]/div[3]/div[2]/div/div[1]/div/div')
    }
    getDestinationField(){
        return cy.xpath('/html/body/div/div/div/div[2]/div[2]/div[3]/div[2]/div/div[2]/div/div')
    }
    getCreateResourceBtn(){
        return cy.get('.typeahead-create-btn')
    }
    getSourcesNumber(){
        return cy.get('input[type=number]')
    }
    getBulkAddBtn(){
        return cy.get('.add-submit-btn')
    }
    getSourceAliasName(){
        return cy.get('[data-field="inputAliasName"] > .cinput__root > .MuiFormControl-root')
    }
    getDestinationAliasName(){
        return cy.get('[data-field="outputAliasName"] > .cinput__root > .MuiFormControl-root')
    }
    getSourceID(){
        return cy.get('[data-field="inputId"] > .cinput__root > .MuiFormControl-root')
    }
    getDestinationID(){
        return cy.get('[data-field="outputId"] > .cinput__root > .MuiFormControl-root')
    }
    getSourceIP(){
        return cy.get('#key_IP')
    }
    getPort(){
        return cy.get('#key_Port')
    }
    getSettingsBtn(){
        return cy.get('.action-renderer__root > .action-btn')
    }
    getConnectionResourceCreate(){
        return cy.get('.action__container > .MuiButtonBase-root')
    }
    getCloseBtn(){
        return cy.get('.MuiButtonGroup-root > .MuiButtonBase-root')
    }
    getCloseModalBtn(){
        return cy.get('.modal-header__root > .MuiButtonBase-root')
    }
    getApplyBtn(){
        return cy.get('.selection__body > .MuiButton-root')
    }
    getCreateBtn(){
        return cy.get('.actions > .create-btn')
    }
    getViewConnectionDashboardBtn(){
        return cy.get('.MuiButtonGroup-root > .fulfilled')
    }
    getConfirmation(){
        return cy.get('.body-header-container > .fulfilled')
    }
}
export default connectionViewPage
