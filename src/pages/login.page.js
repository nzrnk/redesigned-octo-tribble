export class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailField = page.getByPlaceholder('Email');
        this.passwordField = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', { name : 'Login' });
    }

    async login({login, password}) {
        await this.emailField.click();
        await this.emailField.fill(login);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
};