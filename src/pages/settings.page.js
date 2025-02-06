export class SettingsPage {
    constructor(page) {
        this.page = page;

        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });

        this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async getCurrentUserData() {
        return {
            currentLogin: await this.emailField.innerText(),
        }
    }

    async changePassword(pass) {
        await this.passwordField.waitFor({ state : 'visible' }); 
        await this.passwordField.click({ force : true });
        await this.passwordField.fill(pass);
        await this.updateButton.waitFor({ state : 'visible' });
        await this.updateButton.click({ force : true });
    }
};