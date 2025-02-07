import { faker } from '@faker-js/faker';
 
export class NewArticle {
    constructor() {
        this.title = faker.music.artist();
        this.topic = faker.music.album();
        this.body = faker.lorem.paragraph({ min : 3, max : 6});
    }

    addTag() {
        this.articleTag = faker.music.genre();
        return this;
    }

    builder() {
        return {
            title: this.title,
            topic: this.topic,
            body: this.body,
            tag: this.articleTag
        }
    }
};