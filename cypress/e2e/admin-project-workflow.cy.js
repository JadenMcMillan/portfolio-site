describe('Administrator manages a portfolio project', () => {
  const title = `E2E Project ${Date.now()}`;
  const updatedTitle = `${title} (updated)`;
  const record = (text) => cy.contains('article.admin-record', text);

  it('blocks signed-out visitors from the admin page and the write API', () => {
    cy.visit('/admin');
    cy.location('pathname').should('eq', '/login');

    cy.request({
      method: 'POST',
      url: '/api/projects',
      body: { title: 'Not allowed', completionDate: '2026-01-01', description: 'No token' },
      failOnStatusCode: false,
    }).its('status').should('eq', 401);
  });

  it('signs in, creates, views, edits and deletes a project, then signs out', () => {
    cy.env(['adminEmail', 'adminPassword']).then(({ adminEmail, adminPassword }) => {
      cy.visit('/login');
      cy.contains('label', 'Email').find('input').type(adminEmail);
      cy.contains('label', 'Password').find('input').type(adminPassword, { log: false });
      cy.get('form').contains('button', 'Sign In').click();
    });

    cy.location('pathname').should('eq', '/admin');
    cy.contains('h1', 'Administrator Dashboard').should('be.visible');
    cy.screenshot('01-admin-signed-in');

    // Create
    cy.contains('label', 'Title').find('input').type(title);
    cy.contains('label', 'Completion date').find('input').type('2026-11-01');
    cy.contains('label', 'Description').find('textarea').type('Created by the end-to-end test.');
    cy.contains('button', 'Create record').click();
    cy.contains('[role="status"]', 'Record created.').should('be.visible');
    record(title).scrollIntoView().should('be.visible');
    cy.screenshot('02-project-created');

    // Read on the public page
    cy.get('nav').contains('a', 'Projects').click();
    cy.contains('article.data-card', title).scrollIntoView().should('be.visible');
    cy.screenshot('03-project-public');

    // Update
    cy.get('nav').contains('a', 'Admin').click();
    record(title).contains('button', 'Edit').click();
    cy.contains('label', 'Title').find('input').should('have.value', title).clear().type(updatedTitle);
    cy.contains('button', 'Save changes').click();
    cy.contains('[role="status"]', 'Record updated.').should('be.visible');
    record(updatedTitle).scrollIntoView().should('be.visible');
    cy.screenshot('04-project-updated');

    // Delete (Cypress accepts the confirmation dialog automatically)
    record(updatedTitle).contains('button', 'Delete').click();
    cy.contains('[role="status"]', 'Record deleted.').should('exist');
    cy.contains('article.admin-record', updatedTitle).should('not.exist');
    cy.screenshot('05-project-deleted');

    // Sign out removes access
    cy.get('nav').contains('button', 'Sign Out').click();
    cy.location('pathname').should('eq', '/login');
    cy.visit('/admin');
    cy.location('pathname').should('eq', '/login');
    cy.screenshot('06-signed-out');
  });
});
