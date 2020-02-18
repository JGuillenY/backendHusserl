describe ('login', function (){
  //beforeEach(() => {
  //cy.login()
  it('registra un usuario', function(){
    cy.visit('/')

    cy.get("#hereButton").click()

    cy
      .get('input#exampleInputEmail1')
      .type("Pepe")
      .should("have.value", "Pepe");

    cy
      .get('input#regInputApellidoS')
      .type("Martínez Parrao")
      .should("have.value", "Martínez Parrao");

    cy
      .get('input#regInputInstitucion')
      .type("Universidad Juárez Autónoma de Tabasco")
      .should("have.value", "Universidad Juárez Autónoma de Tabasco");

    cy
      .get('input#regInputGrado')
      .type("Licenciado en letras")
      .should("have.value", "Licenciado en letras");

      cy
        .get('input#regInputPais')
        .type("México")
        .should("have.value", "México");

      cy
        .get('input#regInputEmail')
        .type("sexmachine69@gmail.com")
        .should("have.value", "sexmachine69@gmail.com");

      cy
        .get('input#regInputPassword')
        .type("Jesusin se la come")
        .should("have.value", "Jesusin se la come");

      cy
        .get('input#regInputConfirm')
        .type("Jesusin se la come")
        .should("have.value", "Jesusin se la come");

      cy.get("div#registro form").submit();

      cy.location("pathname").should("eq", "/diccionario/login.html");
    })
  })
  //beforeEach(() => {
  //cy.login()
  it('hace login', function (){
    cy.visit('/')

    cy
      .get('input#loginInputEmail')
      .type("jesus.guilleny@gmail.com")
      .should("have.value", "jesus.guilleny@gmail.com");

      cy
        .get('input#loginInputPassword')
        .type("12345")
        .should("have.value", "12345");

        cy.get("div#ingreso form").submit();

        cy.location("pathname").should("eq", "/diccionario/main.html");
})
