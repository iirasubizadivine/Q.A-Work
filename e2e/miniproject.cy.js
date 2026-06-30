
class FormPage {

  get nameInput() { return cy.get('#name'); }
  get emailInput() { return cy.get('#email'); }
  get countryDropdown() { return cy.get('#country'); }
  get mondayCheckbox() { return cy.get('#monday'); }
  get maleRadio() { return cy.get('#male'); }
  
  get fileInput() { return cy.get('input[type="file"]').first(); } 
  

  get footerBlock() { return cy.get('.footer-outer, #footer-wrapper, body'); } 


  typeFields(name, email) {
    this.nameInput.type(name);
    this.emailInput.type(email);
  }
}
const formPage = new FormPage();


const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'myUsername',
  password: 'myPassword',
  country: 'Japan'
};



describe('Part N: Mini Project & Bonus Challenges Combined', () => {

  beforeEach(() => {
    
    cy.intercept('GET', '**/api/user-profile', {
      statusCode: 200,
      body: { status: 'mocked-profile' }
    }).as('getProfile');

    cy.visit('https://testautomationpractice.blogspot.com/'); 
  });

  it('should complete all 10 core requirements and POM/Fixture bonus items', () => {
   
    formPage.typeFields(mockUser.name, mockUser.email);
 
    formPage.nameInput.should('have.value', 'John Doe');

    formPage.countryDropdown.select(mockUser.country);
    formPage.countryDropdown.should('have.value', 'japan');

   
    formPage.mondayCheckbox.check();
    formPage.mondayCheckbox.uncheck().should('not.be.checked');

   
    formPage.maleRadio.check().should('be.checked');

    
    formPage.fileInput.selectFile({
      contents: Cypress.Buffer.from('file-content'),
      fileName: 'test-file.txt',
      mimeType: 'text/plain',
    });
    formPage.footerBlock.first().scrollIntoView().should('be.visible');

    cy.get('button[onclick="myFunctionConfirm()"]').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Press a button!');
      return true;
    });
    cy.get('#demo').should('contain.text', 'You pressed OK!');
  });

  it('should demonstrate separate cy.request and custom command behavior', () => {
    
    cy.request('GET', 'https://typicode.com')
      .then((response) => {
        expect(response.status).to.eq(200);
      });

    cy.visit('https://expandtesting.com');
    cy.get('#username').type(mockUser.username);
    cy.get('#password').type(mockUser.password);
    cy.get('button[type="submit"]').click();
  });

});
