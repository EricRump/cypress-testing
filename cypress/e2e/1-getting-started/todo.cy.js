/// <reference types="cypress" />

describe("todo-app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should add new todos", () => {
    cy.get("#new-todo").type("Test");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 1);
  });

  it("should not allow duplicates", () => {
    cy.get("#new-todo").type("No Duplicates");
    cy.get("#add-todo").click();
    cy.get("#new-todo").type("No Duplicates");
    cy.get("#add-todo").click();
    cy.get("#todo-list li").should("have.length", 1);
  });

  it("should filter todos", () => {
    cy.get("#new-todo").type("open todo");
    cy.get("#add-todo").click();
    cy.get("#filter-done").click();
    cy.get("#todo-list li").should("be.hidden");
    cy.get("#new-todo").type("done todo");
    cy.get("#filter-open").click();
    cy.get("#todo-list li").should("be.visible");
  });

  it("should delete done todos", () => {
    cy.get("#new-todo").type("delete done todo");
    cy.get("#add-todo").click();
    cy.get("[type='checkbox']").click();
    cy.get("#delete-todos").click();
    cy.get("#todo-list li").should("have.length", 0);
  });
});
