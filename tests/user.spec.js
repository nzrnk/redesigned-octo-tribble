import { test , expect } from '@playwright/test';
import { MainPage } from '../src/pages/mainPage';
import { LoginPage } from '../src/pages/loginPage';
import { AuthMainPage } from '../src/pages/authMainPage';
import { SettingsPage } from '../src/pages/settingsPage';
import { johnDoe } from '../src/data/registeredUser';
import { PROD_URL } from '../src/data/Url';
import { newPass } from '../src/data/userData';



//тест запускаются корректно в каждом браузере отдельно, но для параллельного запуска нужно каждый раз создавать нового пользователя 

test.describe('Профиль пользователя', () => {
    test.beforeEach(async({page}) => {
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await mainPage.open(PROD_URL);
        await mainPage.goToLogin();
        await loginPage.login(johnDoe.login, johnDoe.password);
    });

    test('Изменить пароль в профиле пользователя', async({page}) => {

        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        const authMainPage = new AuthMainPage(page);
        const settingsPage = new SettingsPage(page);
    
        await authMainPage.goToSettings();
        await settingsPage.changePassword(newPass); 
        await authMainPage.goToLogout();
        await mainPage.goToLogin();
        await loginPage.login(johnDoe.login, newPass);
        await expect(authMainPage.header).toBeVisible();
        await expect(authMainPage.header).toContainText(`${johnDoe.name}`);
        //console.log(newPass) для нового пароля
        
// костыль возврата старого пароля, не понимаю как изменить пароль в "оригинальном" объекте
        await authMainPage.goToSettings();
        await settingsPage.changePassword('222222');
    });
});
