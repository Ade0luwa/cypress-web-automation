/// <reference types= "cypress" />

class sourcesPage{
    getHeader(){
        return cy.get('#tableTitle')
    }
    getColumnBtn(){
        return cy.contains('Columns')
    }
    getColumns(){
        return cy.get('.MuiDataGrid-columnsManagement .Mui-checked input[type="checkbox"]')
    }
    getTableHeaders(){
        return cy.get('.MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader')
    }
    getFilterBtn(){
        return cy.get('button[aria-label="Show filters"]')
    }
    getDropdown(){
        return cy.get('div[role="combobox"]')
    }
    getFilterOptions(value){
        return cy.get(`li[data-value="${value}"]`);
    }
    getFilterText(){
        return cy.get('input[placeholder="Filter value"]')
    }
    getModeRow() {
        return cy.get('.MuiDataGrid-row > [data-field="inputInfo.InputMode"]')
    }
    getStatusRow() {
        return cy.get('.MuiDataGrid-row--firstVisible > [data-field="statusIndicator"] > .status-cell')
    }
    getTableCell(row, field) {
        return cy.wrap(row).find(`div[data-field="${field}"]`)
    }
    getCreateBtn(){
       return cy.get('.MuiButtonGroup-root > .MuiButton-sizeMedium')
    }
    getSingleCreate(){
        return cy.contains('Single')
    }
    getSourceIDRow() {
        return cy.get('.service-container > .MuiButtonBase-root')
    }
    getInputID(){
        return cy.get('input[name="inputId"]')
    }
    getInputName(){
        return cy.get('input[name="inputAliasName"]')
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
