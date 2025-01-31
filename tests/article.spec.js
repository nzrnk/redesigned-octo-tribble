import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/mainPage';
import { johnDoe } from '../src/data/registeredUser'
import { AuthMainPage } from '../src/pages/authMainPage';
import { ArticleEditorPage } from '../src/pages/articleEditorPage';
import { NewArticle } from '../src/data/newArticle';
import { NewArticlePage } from '../src/pages/newArticlePage';
import { LoginPage } from '../src/pages/loginPage';
import { PROD_URL } from '../src/data/Url';
import { ProfilePage } from '../src/pages/profilePage';
import { newComment } from '../src/data/userData';



// тесты запускаются корректно в каждом браузере отдельно, но для параллельного запуска во всех сразу нужен рефакторинг (не понятно что с чем кофликтует)
    
test.describe('Создание и редактирование статей', () => {
        test.beforeEach(async({page}) => {
            const mainPage = new MainPage(page);
            const loginPage = new LoginPage(page);

            await mainPage.open(PROD_URL);
            await mainPage.goToLogin();
            await loginPage.login(johnDoe.login, johnDoe.password);
    });

    test('Создать новую статью только c обязательными полями', async({page}) => {
        
        const authMainPage = new AuthMainPage(page);
        const articleEditorPage = new ArticleEditorPage(page);
        const newArticlePage = new NewArticlePage(page);
        const newArticle = new NewArticle;
        
        const title = newArticle.getArticleTitle();
        const theme = newArticle.getArticleTheme();
        const body = newArticle.getArticleBody();


        await authMainPage.goToArticleEditor();
        await articleEditorPage.createNewArticle(title, theme, body);
        await expect(newArticlePage.articleAuthor).toBeVisible();
        await expect(newArticlePage.articleAuthor).toContainText(`${johnDoe.name}`);
        await expect(newArticlePage.articleTitle).toBeVisible();
        await expect(newArticlePage.articleTitle).toContainText(title);
        await expect(newArticlePage.articleBody).toBeVisible();
        await expect(newArticlePage.articleBody).toContainText(body);
        
      
    });
    // создание новой статьи в предусловии для изоляции теста создания комментария
        
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

