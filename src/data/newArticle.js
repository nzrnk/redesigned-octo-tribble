import { faker } from '@faker-js/faker';
 
export class NewArticle {

    getArticleTitle () {
        return faker.music.artist();
    }

    getArticleTheme () {
        return faker.music.album();
    }

    getArticleBody () {
        return faker.lorem.paragraph({ min : 3, max : 6});
    }
};