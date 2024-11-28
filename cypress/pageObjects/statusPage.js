/// <reference types= "cypress" />

class statusPage{
    getStatusField(){
        return cy.get('[data-testid="StorageIcon"]');
    }
    getSearchBtn(){
        return cy.get('input[placeholder="Search..."]')
    }
    getName(){
        return cy.get('.btn-content > .MuiTypography-root')
    }
    getHeaderName(){
        return cy.get('.header')
    }
    getUDPstatisticsTitle(){
        return cy.get('.accordion-streamStats > .MuiPaper-root > .MuiButtonBase-root > .MuiAccordionSummary-content > .MuiTypography-root')
    }
    getSourcePresent() {
        return cy.get('.accordion-streamStats > .MuiPaper-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > .MuiGrid-container > .MuiGrid-root > .grid-view > .box-root > .box-container > .box-item-container > :nth-child(2)')
    }
    getDestinationTab(){
        return cy.xpath('/html/body/div[1]/div/div/div[2]/div[2]/div[3]/div[1]/div/div/div/button[2]')
    }
    getTSstatistics(){
        return cy.get('.accordion-tsStats > .MuiPaper-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > .MuiGrid-container > .MuiGrid-root')
    }
    getTR101(){
        return cy.get('.css-b0qzyu')
    }
    getConnectionStatus(){
        return cy.get('.box-container > :nth-child(1) > :nth-child(2)')
    }
    
}
export default statusPage
