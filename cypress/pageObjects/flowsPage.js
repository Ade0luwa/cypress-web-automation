/// <reference types= "cypress" />

class flowsPage{
    getFlowField(){
        return cy.get('.MuiListItemIcon-root [data-testid= "AccountTreeIcon"]')
    }
    getCreateBtn(){
        return cy.get('.MuiButtonGroup-root > .MuiButton-sizeMedium')
     }
     getSingleCreateFlow(){
        return cy.contains('By Modal Inputs')
     }
    getFlowID(){
        return cy.get('input[name="flowId"]')
    }
    getFlowName(){
        return cy.get('input[name="flowAliasName"]')
    }
    getFlowIDRow() {
        return cy.get('.MuiDataGrid-cell[data-field="flowAliasName"] .service-container .service-btn')
    }
    getRestartBtn(value){
        return cy.get(`.restart_button[aria-label="Restart: ${value}"]`)
    }
    getAlertDialog(){
        return cy.get('#alert-dialog-title')
    }
    getYesConfirmation(){
        return cy.get('.MuiDialogActions-root > div > :nth-child(2)')
    }
    
}
export default flowsPage
