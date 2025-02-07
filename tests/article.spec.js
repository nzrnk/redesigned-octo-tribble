import { test, expect } from '@playwright/test';
import { MainPage, AuthMainPage, ArticleEditorPage, NewArticlePage, ProfilePage, SignUpPage } from '../src/pages';
import { PROD_URL, NewUser, newComment } from '../src/data';
import { NewArticle } from '../src/builder';


test.describe('Создание и редактирование статей', () => {
    test.beforeEach(async({page}) => {
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);
        const newUser = new NewUser();
            
        await mainPage.open(PROD_URL);
        await mainPage.goToSignUp();
        await signUpPage.signUp({
            username: newUser.name,
            email: newUser.email,
            password: newUser.password
        });
    });

    test('Создать новую статью только c обязательными полями', async({page}) => {
        
        const authMainPage = new AuthMainPage(page);
        const articleEditorPage = new ArticleEditorPage(page);
        const newArticlePage = new NewArticlePage(page);
        const newArticle = new NewArticle();
        const currenUserName = authMainPage.getCurrentUserData();
        
        
        await authMainPage.goToArticleEditor();
        await articleEditorPage.createNewArticle({
            title: newArticle.title,
            topic: newArticle.topic,
            body: newArticle.body,
        });
        await expect(newArticlePage.articleAuthor).toBeVisible();
        await expect(newArticlePage.articleAuthor).toContainText(`${(await currenUserName).currenName}`);
        await expect(newArticlePage.articleTitle).toBeVisible();
        await expect(newArticlePage.articleTitle).toContainText(newArticle.title);
        await expect(newArticlePage.articleBody).toBeVisible();
        await expect(newArticlePage.articleBody).toContainText(newArticle.body);
    });
        
    test.describe('Подготовка статьи к тесту создания комментария', () => {
        test.beforeEach(async({page}) => {
            const authMainPage = new AuthMainPage(page);
            const articleEditorPage = new ArticleEditorPage(page);
            const newArticlePage = new NewArticlePage(page);
            const newArticle = new NewArticle();
    
            await authMainPage.goToArticleEditor();
            await articleEditorPage.createNewArticle({
                title: newArticle.title,
                topic: newArticle.topic,
                body: newArticle.body,
            });
            await newArticlePage.articleBody.waitFor({ state : 'attached' });
        });
   
        test('Создать комментарий к своей статье', async({page}) => {
            
            const authMainPage = new AuthMainPage(page);
            const profilePage = new ProfilePage(page);
            const newArticlePage = new NewArticlePage(page);
       
            await authMainPage.goToProfile();
            await profilePage.goToArticle();
            await newArticlePage.postComment(newComment);
            await expect(newArticlePage.comment).toBeVisible();
            await expect(newArticlePage.comment).toContainText(newComment);
        
        });
    });
});

