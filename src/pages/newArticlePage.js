import { johnDoe } from "../data/registeredUser";

export class NewArticlePage {

    constructor(page) {
        this.page = page;

        this.articleAuthor = page.getByRole('link', { name : `${johnDoe.name}`}).nth(3);
        this.articleTitle = page.getByRole('heading');
        this.articleBody = page.getByRole('paragraph');
        
        this.newCommentFiled = page.getByPlaceholder('Write a comment...');
        this.comment = page.locator('.offset-md-2');
        
        this.postCommentButton = page.getByRole('button', { name : 'Post Comment'});
        this.homeButton = page.getByRole('link', { name : 'Home'});
    
    }

    async postComment (text) {
        await this.newCommentFiled.click();
        await this.newCommentFiled.fill(text);
        await this.postCommentButton.click();
    }
};