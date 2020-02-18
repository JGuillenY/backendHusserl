describe('menu', function(){
	beforeEach(() => {
            var usuario = {
		    password: "12345",
		    ultimaVisitada: "alfabeto",
		    ultimasVisitadas: [],
		    user: "jesus.guilleny@gmail.com"
	    }
	    localStorage.setItem("sesion", btoa(JSON.stringify(usuario))) 
	    localStorage.setItem("notN", btoa("true"))
	})
	it('Abre el menu de idiomas', function(){	  
	        cy.visit('/')
	        cy.location("pathname").should("eq", "/diccionario/main.html");

		cy.get("a.lang-icon").click()
	
	})
	it("Prueba Menu Principal", function(){
		cy.get("a#dropdownMenuButton").click().click()
		
	})
	it("Se apreta boton Acerca De", function(){
		cy.get("a#acer").click()
		cy.get("a#dropdownMenuButton").click()
	})
	it("Se apreta boton Acerca De", function(){
		cy.get("a#").click()
		cy.get("a#dropdownMenuButton").click()
	})
	it("Se apreta boton Acerca De", function(){
		cy.get("a#").click()
		cy.get("a#dropdownMenuButton").click()
	})
	
}) 
	  //                      
