import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/main.page';
import { NewUser } from '../src/data/newUser';
import { AuthMainPage } from '../src/pages/authMain.page';
import { ArticleEditorPage } from '../src/pages/articleEditor.page';
import { NewArticle } from '../src/data/newArticle';
import { NewArticlePage } from '../src/pages/newArticle.page';
import { PROD_URL } from '../src/data/url';
import { ProfilePage } from '../src/pages/profile.page';
import { newComment } from '../src/data/newComment';
import { SignUpPage } from '../src/pages/signUp.page';


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
        const newArticle = new NewArticle;
        const currenUserName = authMainPage.getCurrentUserData(); 
        
        const title = newArticle.getArticleTitle();
        const theme = newArticle.getArticleTheme();
        const body = newArticle.getArticleBody();


        await authMainPage.goToArticleEditor();
        await articleEditorPage.createNewArticle(title, theme, body);
        await expect(newArticlePage.articleAuthor).toBeVisible();
        await expect(newArticlePage.articleAuthor).toContainText(`${(await currenUserName).currenName}`);
        await expect(newArticlePage.articleTitle).toBeVisible();
        await expect(newArticlePage.articleTitle).toContainText(title);
        await expect(newArticlePage.articleBody).toBeVisible();
        await expect(newArticlePage.articleBody).toContainText(body);
    });
        
    test.describe('Подготовка статьи к тесту создания комментария', () => {
        test.beforeEach(async({page}) => {
            const authMainPage = new AuthMainPage(page);
            const articleEditorPage = new ArticleEditorPage(page);
            const newArticlePage = new NewArticlePage(page);
            const newArticle = new NewArticle;
    
            const title = newArticle.getArticleTitle();
            const theme = newArticle.getArticleTheme();
            const body = newArticle.getArticleBody();

            await authMainPage.goToArticleEditor();
            await articleEditorPage.createNewArticle(title, theme, body);
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

