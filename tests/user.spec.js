import { test , expect } from '@playwright/test';
import { MainPage } from '../src/pages/main.page';
import { LoginPage } from '../src/pages/login.page';
import { AuthMainPage } from '../src/pages/authMain.page';
import { SettingsPage } from '../src/pages/settings.page';
import { PROD_URL } from '../src/data/url';
import { newPass } from '../src/data/newPassword';
import { SignUpPage } from '../src/pages/signUp.page';
import { NewUser } from '../src/data/newUser';


test.describe('Профиль пользователя', () => {
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
    
    test('Изменить пароль в профиле пользователя', async({page}) => {

        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        const authMainPage = new AuthMainPage(page);
        const settingsPage = new SettingsPage(page);
        const currentUserData = settingsPage.getCurrentUserData(); 

        await authMainPage.getCurrentUserData()
        await authMainPage.goToSettings();
        await settingsPage.changePassword(newPass); 
        await authMainPage.goToLogout();
        await mainPage.goToLogin();
        await loginPage.login((await currentUserData).currentLogin, newPass);
        await expect(authMainPage.header).toBeVisible();
        await expect(authMainPage.header).toContainText(`${(await currentUserData).currentLogin}`);
        
    });
});

