describe('My-Name-Is-Dad home page', () => {

    it('should show a random dad joke on page load', () => {
        cy.fixture('dad-joke-data.json').then((dadJoke) => {
            cy.intercept('https://icanhazdadjoke.com/', dadJoke)
        })
        cy.visit('http://localhost:3000')
        cy.contains('Red light')
    })

    it('should generate a dad joke on button click', () => {
        cy.fixture('random-button-joke.json').then(dadJoke => {
            cy.intercept('https://icanhazdadjoke.com/', dadJoke)
        })
        cy.get('.joke-btn').click()
        cy.contains('nose')
    })

    it('should go to the search page when the search bar is clicked', () => {
        cy.get('.nav-search').click().url().should('eq', 'http://localhost:3000/search')
    })

    it('should display an error with a link when the wrong url is inserted', () => {
        cy.visit('http://localhost:3000/dad')
        cy.contains('find your dad')
        cy.get('.lost-error').click()
        cy.url('eq', 'http://localhost:3000/')
    })
    
})

describe('My-Name-Is-Dad search page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/search')
    })

    it('should search a dadegory', () => {
        cy.fixture('searched-joke-data.json').then((dadJokes) => {
            cy.intercept('https://icanhazdadjoke.com/search?term=hipster', dadJokes)
        }).get('.search-input').type('hipster').get('.search-btn').click().get('.search-page').contains('pizza')
    })


    it('should display error message when there is no input for searching', () => {
        cy.get('.search-btn').click()
        cy.contains('Please insert')
    })

    it('should display a message when a dadegory cannot be found', () => {
        cy.get('.search-input').type('afefd')
        cy.get('.search-btn').click()
        cy.contains('Dadly enough')
    })

    it('should take you home when clicking humble abode', () => {
        cy.get('.nav-home').click().url().should('eq', 'http://localhost:3000/').get('.joke-container').contains('Summon')
    })
})
