describe('Automation Exercise - Full E2E Automated Test Suite', () => {

  let registeredEmail = `student_${Date.now()}@test.com`;
  const password = 'Pass123!';

  beforeEach(() => {
    
    cy.visit('https://automationexercise.com');
    
    
    cy.get('body').then(($body) => {
      if ($body.find('.modal-content').length > 0) {
        cy.get('.modal-content').invoke('remove');
      }
    });
  });


  it('Test Case 1: Verify Homepage Loads and Logo is Visible', () => {
    cy.url().should('include', 'automationexercise.com');
    cy.get('.logo').should('be.visible');
    cy.get('.shop-menu').should('be.visible');
  });

  it('Test Case 2: Register a New User', () => {
    cy.contains('Signup / Login').click();
    cy.get('[data-qa="signup-name"]').type('Test User');
    cy.get('[data-qa="signup-email"]').type(registeredEmail);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="first_name"]').type('First');
    cy.get('[data-qa="last_name"]').type('Last');
    cy.get('[data-qa="address"]').type('123 QA Lane');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');

    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logout').click();
  });


  it('Test Case 3: Login With Valid Credentials', () => {
    cy.login(registeredEmail, password);
    cy.contains('Logged in as').should('be.visible');
    cy.contains('Logout').click();
  });

  it('Test Case 4: Login With Invalid Credentials', () => {
    cy.login('completely_fake_user_999@test.com', 'WrongPassword!');
    cy.contains('incorrect', { matchCase: false }).should('be.visible');
  });

  // =========================================================================
  // PART 5: PRODUCT SEARCH
  // =========================================================================
  it('Test Case 5: Search for a Product', () => {
    cy.contains('Products').click();
    cy.url().should('include', '/products');
    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click();
    
    cy.get('.title').should('contain', 'Searched Products');
    cy.get('.productinfo').should('contain', 'Dress');
  });

  // =========================================================================
  // PART 6: PRODUCT DETAILS
  // =========================================================================
  it('Test Case 6: View Product Details', () => {
    cy.contains('Products').click();
    cy.get('.choose > .nav > li > a').first().click();
    
    cy.url().should('include', '/product_details');
    cy.get('.product-information').should('be.visible');
    cy.get('.product-information > h2').should('be.visible'); 
    cy.get('.product-information > span > span').should('be.visible'); 
  });

  // =========================================================================
  // PART 7: CART FUNCTIONALITY
  // =========================================================================
  it('Test Case 7: Add Product to Cart', () => {
    cy.contains('Products').click();
    cy.get('.choose > .nav > li > a').first().click();
    cy.get('button').contains('Add to cart').click();
    
    // Interact directly inside modal popup to avoid animation blockages
    cy.get('.modal-content').contains('View Cart').click({ force: true });
    
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table').should('be.visible');
  });

  it('Test Case 8: Remove Product From Cart', () => {
    cy.contains('Products').click();
    cy.get('.choose > .nav > li > a').first().click();
    cy.get('button').contains('Add to cart').click();
    cy.get('.modal-content').contains('View Cart').click({ force: true });
    
    cy.get('.cart_quantity_delete').click({ force: true });
    cy.get('#empty_cart').should('be.visible');
  });

  // =========================================================================
  // PART 8: CONTACT FORM
  // =========================================================================
  it('Test Case 9: Submit Contact Us Form', () => {
    // Bypasses browser alert prompt windows smoothly
    cy.on('window:confirm', () => true);

    cy.contains('Contact us').click({ force: true });
    cy.get('[data-qa="name"]').type('QA Student');
    cy.get('[data-qa="email"]').type('student@test.com');
    cy.get('[data-qa="subject"]').type('Test Subject');
    cy.get('[data-qa="message"]').type('Automated testing message body.');
    
    cy.get('[data-qa="submit-button"]').click({ force: true });
    cy.get('.status.alert.alert-success').should('be.visible');
  });

  // =========================================================================
  // PART 10: CHALLENGE TASKS
  // =========================================================================
  it('Challenge 1: Add Multiple Products', () => {
    // Add Item 1
    cy.contains('Products').click();
    cy.get('.choose > .nav > li > a').eq(0).click();
    cy.get('button').contains('Add to cart').click();
    cy.get('.modal-content').contains('Continue Shopping').click({ force: true });

    // Add Item 2
    cy.contains('Products').click();
    cy.get('.choose > .nav > li > a').eq(1).click();
    cy.get('button').contains('Add to cart').click();
    cy.get('.modal-content').contains('View Cart').click({ force: true });

    cy.get('#cart_info_table tbody tr').should('have.length.at.least', 2);
  });

  it('Challenge 2: Verify Product Quantity', () => {
    cy.contains('Products').click();
    cy.get('.choose > .nav > li > a').first().click();
    
    cy.get('#quantity').clear().type('3');
    cy.get('button').contains('Add to cart').click();
    cy.get('.modal-content').contains('View Cart').click({ force: true });
    
    cy.get('.disabled').should('contain', '3'); 
  });

  it('Challenge 3: Subscribe to Newsletter', () => {
    cy.get('#footer').scrollIntoView();
    cy.get('#susbscribe_email').type('subscriber@test.com');
    cy.get('#subscribe').click({ force: true });
    cy.get('.alert-success').should('be.visible');
  });

  it('Challenge 4: Test Category Navigation', () => {
    cy.get('.panel-heading').contains('Women').click({ force: true });
    cy.contains('Dress').click({ force: true });
    cy.get('.title').should('contain', 'Women - Dress Products');
  });
});