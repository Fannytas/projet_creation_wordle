describe('Make sure our app is working well', () => {

    // test 1
    it('Test that we can open a browser and load our app', () => {
        cy.visit("http://localhost:4001/");
    })

    // test 2
    it('Should can add a new word after playing a game', () => {
        cy.visit("http://localhost:4001/");
        cy.get('#btn-lancer-partie').click();
        cy.get('.keyboard button.lettre').contains('J').click();
     })
    
     // test 3
     it('Should reject the world ZZZZZ', () => {
        cy.visit("http://localhost:4001/");
        cy.get('#btn-lancer-partie').click();
        cy.get('.keyboard button.lettre').contains('Z').click();
        cy.get('.keyboard button.lettre').contains('Z').click();
        cy.get('.keyboard button.lettre').contains('Z').click();
        cy.get('.keyboard button.lettre').contains('Z').click();
        cy.get('.keyboard button.lettre').contains('Z').click();
        cy.get('.button-enter').click();
        cy.get('.message-erreur')
            .should('be.visible')
            .and('contain.text', "Le mot n'est pas dans le dictionnaire.");
    })

    // test 4
    it('Should accept the world JANTE', () => {
        cy.visit("http://localhost:4001/");
        cy.get('#btn-lancer-partie').click();
        cy.get('.keyboard button.lettre').contains('J').click();
        cy.get('.keyboard button.lettre').contains('A').click();
        cy.get('.keyboard button.lettre').contains('N').click();
        cy.get('.keyboard button.lettre').contains('T').click();
        cy.get('.keyboard button.lettre').contains('E').click();
        cy.get('.button-enter').click();
        cy.get('.historique').should('contain.text', 'JANTE');
        cy.get('.message-erreur').should('not.exist');
    });

    // test 5
    it('Should navigate to defeat page when clicking "Abandonner"', () => {
        cy.visit("http://localhost:4001/");
        cy.get('#btn-lancer-partie').click();
        cy.get('#button-abandonner').click();
        cy.url().should('include', '/Resultat');
        cy.url().should('include', 'defaite=true');
    });

    // test 6
    it('Should display the statistics page', () => {
        cy.visit("http://localhost:4001/");
        cy.get('#btn-historique').click();
        cy.url().should('include', '/Historique');
    });
})