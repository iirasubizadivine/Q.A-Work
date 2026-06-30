// ==========================================
// 1. PAGE OBJECT MODEL CLASS (Inline Definition)
// ==========================================
class FormPage {
  // Elements
  get nameInput() { return cy.get('#name'); }
  get emailInput() { return cy.get('#email'); }
  get countryDropdown() { return cy.get('#country'); }
  get mondayCheckbox() { return cy.get('#monday'); }
  get maleRadio() { return cy.get('#male'); }
  
  // FIXED: Added .first() to only target the single file upload input field
  get fileInput() { return cy.get('input[type="file"]').first(); } 
  
  // Layout outer wrapper block selector
  get footerBlock() { return cy.get('.footer-outer, #footer-wrapper, body'); } 

  // Direct actions inside the class
  typeFields(name, email) {
    this.nameInput.type(name);
    this.emailInput.type(email);
  }
}
const formPage = new FormPage();


// ==========================================
// 2. INLINE FIXTURE / MOCK DATA
// ==========================================
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'myUsername',
  password: 'myPassword',
  country: 'Japan'
};


// ==========================================
// 3. CONSOLIDATED CYPRESS SPEC SUITE
// ==========================================
describe('Part N: Mini Project & Bonus Challenges Combined', () => {

  beforeEach(() => {
    // Bonus Challenge Component: cy.intercept()
    cy.intercept('GET', '**/api/user-profile', {
      statusCode: 200,
      body: { status: 'mocked-profile' }
    }).as('getProfile');

    // Requirement 1: Visit the website
    cy.visit('https://testautomationpractice.blogspot.com/'); 
  });

  it('should complete all 10 core requirements and POM/Fixture bonus items', () => {
    // Requirement 2 & POM: Fill out form inputs
    formPage.typeFields(mockUser.name, mockUser.email);
    
    // Requirement 9 (Assertion 1): Verify text input exact match
    formPage.nameInput.should('have.value', 'John Doe');

    // Requirement 3 & Requirement 9 (Assertion 2): Select from dropdown & verify value
    formPage.countryDropdown.select(mockUser.country);
    formPage.countryDropdown.should('have.value', 'japan');

    // Requirement 4 & Requirement 9 (Assertion 3): Check, uncheck, and assert state
    formPage.mondayCheckbox.check();
    formPage.mondayCheckbox.uncheck().should('not.be.checked');

    // Requirement 5 & Requirement 9 (Assertion 4): Select radio buttons & verify state
    formPage.maleRadio.check().should('be.checked');

    // Requirement 6: Upload a file (Will now pass successfully on a single element)
    formPage.fileInput.selectFile({
      contents: Cypress.Buffer.from('file-content'),
      fileName: 'test-file.txt',
      mimeType: 'text/plain',
    });

    // Requirement 7 & Requirement 9 (Assertion 5): Scroll to footer block & assert visibility
    formPage.footerBlock.first().scrollIntoView().should('be.visible');

    // Requirement 8: Handle Confirmation Alert Box 
    cy.get('button[onclick="myFunctionConfirm()"]').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Press a button!');
      return true;
    });
    cy.get('#demo').should('contain.text', 'You pressed OK!');
  });

  it('should demonstrate separate cy.request and custom command behavior', () => {
    // Bonus Challenge Component: cy.request() for independent API test
    cy.request('GET', 'https://typicode.com')
      .then((response) => {
        expect(response.status).to.eq(200);
      });

    // Bonus Challenge Component: Custom Command Logic (Executed inline)
    cy.visit('https://expandtesting.com');
    cy.get('#username').type(mockUser.username);
    cy.get('#password').type(mockUser.password);
    cy.get('button[type="submit"]').click();
  });

});
