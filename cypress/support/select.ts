import { faker } from './faker';

export class Select {
    static random(selector: string): void {
        cy.get(selector)
            .click();

        const possibilities: string[] = [];
        cy.get('mat-option span.mat-option-text')
            .should('have.length.greaterThan', 0)
            .then(options => {
                options.each((_v, x) => {
                    possibilities.push(x.innerText);
                });
            })
            .then(() => {
                const opt = faker.random.arrayElement(possibilities);
                cy.get('mat-option').contains(opt).click();
            });
        cy.get('mat-option span.mat-option-text')
            .should('have.length.lessThan', 1);
    }

    static select(selector: string, value: string): void {
        cy.get(selector).click();

        cy.get('mat-option span.mat-option-text').contains(value).click();
    }
}
