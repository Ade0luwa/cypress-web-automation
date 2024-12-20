/// <reference types= "cypress" />

class destinationPage{
    getDestField(){
        return cy.get('.MuiListItemIcon-root [data-testid="OutputIcon"]');
    }
    getModeRow() {
        return cy.get('.MuiDataGrid-row > [data-field="outputInfo.OutputMode"]')
    }
    getNoResultsFound() {
        return cy.get('.MuiDataGrid-overlay.css-14349d1');
    }
    getOutputID(){
        return cy.get('input[name="outputId"]')
    }
    getOutputName(){
        return cy.get('input[name="outputAliasName"]')
    }
    getIP(){
        return cy.get('input[name="ipAddress"]')
    }
    getEncapsConfigBtn(){
        return cy.get(':nth-child(3) > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > :nth-child(2)')
    }
    getSubmitBtn(){
        return cy.get('form > .MuiButtonGroup-root > .MuiButtonGroup-firstButton')
    }
    getSuccess(){
        return cy.get('.MuiAlert-message')
    }
    getOutputIDRow() {
        return cy.get('.service-container > .MuiButtonBase-root')
    }
    getInterface(){
        return cy.xpath('/html/body/div[2]/div[3]/form/div[1]/div[7]/div/div/div[2]/div/div[3]/div/div')
    }
    getMode(){
        return cy.xpath('/html/body/div[2]/div[3]/form/div[1]/div[7]/div/div/div[2]/div/div[1]/div/div')
    }
    getCloseDropdown(){
        return cy.get('svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiSelect-icon.MuiSelect-iconFilled.MuiSelect-iconOpen.css-gofjbs')
    }
    
}
export default destinationPage
