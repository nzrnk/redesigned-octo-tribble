import { test , expect } from '@playwright/test';
import { MainPage, LoginPage, AuthMainPage, SettingsPage, SignUpPage } from '../src/pages';
import { NewUser, PROD_URL } from '../src/data';
import { UserProfile } from '../src/builder';


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
            password: newUser.password,
        });
    });
    
    test('Изменить пароль в профиле пользователя', async({page}) => {

        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        const authMainPage = new AuthMainPage(page);
        const settingsPage = new SettingsPage(page);
        const userProfile = new UserProfile()
        .setPassword()
        .builder();
        const currentUserData = settingsPage.getCurrentUserData(); 
        
        
        await authMainPage.goToSettings();
        await settingsPage.changePassword(userProfile.password); 
        await authMainPage.goToLogout();
        await mainPage.goToLogin();
        await loginPage.login({
            login: (await currentUserData).currentLogin, 
            password: userProfile.password
        });
        await expect(authMainPage.header).toBeVisible();
        await expect(authMainPage.header).toContainText(`${(await currentUserData).currentName}`);
        
    });
});

