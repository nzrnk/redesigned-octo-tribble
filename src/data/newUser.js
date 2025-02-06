import { fakerRU, faker } from '@faker-js/faker';

export class NewUser {
    constructor() {
        this.name = fakerRU.person.fullName();
        this.email = faker.internet.email();
        this.password = faker.internet.password({ length : 8 });
    }
}