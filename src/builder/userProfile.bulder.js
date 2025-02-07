import { faker } from '@faker-js/faker';

export class UserProfile {
    
    setPassword() { 
        this.password = faker.internet.password({ length : 8});
        return this;
   }

    builder() {
        return {
            url: this.url,
            name: this.name,
            bio: this.bio,
            email: this.email,
            password: this.password,
        }
   }
};