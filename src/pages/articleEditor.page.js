export class ArticleEditorPage {
    constructor(page) {
        this.page = page;

        this.articleTitleField = page.getByPlaceholder('Article Title');
        this.articleThemeField = page.getByPlaceholder("What's this article about?");
        this.articleBodyFiled = page.getByPlaceholder('Write your article (in markdown)');

        this.publishArticleButton = page.getByRole('button', { name : 'Publish Article' });
    }

    async createNewArticle({title, topic, body}) {
        
        await this.articleTitleField.click();
        await this.articleTitleField.fill(title);
        await this.articleThemeField.click();
        await this.articleThemeField.fill(topic);
        await this.articleBodyFiled.click();
        await this.articleBodyFiled.fill(body);
        await this.publishArticleButton.click();
    }

};