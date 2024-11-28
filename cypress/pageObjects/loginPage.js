/// <reference types= "cypress" />

class loginPage{
    getUsername(){
        return cy.get('#username')
    }
    getPassword(){
        return cy.get('#password')
    }
    getSubmit(){
        return cy.get('.MuiButton-root')
    }
    getLogout(){
        return cy.get('.logout')
    }
    getError(){
        return cy.get('.MuiAlert-message')
    }
}
export default loginPage
