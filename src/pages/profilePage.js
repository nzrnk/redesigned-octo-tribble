export class ProfilePage {
    constructor(page) {
        this.page = page;

        this.article = page.getByRole('heading').nth(1);
    }
        
        async goToArticle () {
            await this.article.waitFor({ state : 'attached'});
            await this.article.click();
        }
};