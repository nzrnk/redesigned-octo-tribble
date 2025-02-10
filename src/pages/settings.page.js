export class SettingsPage {
    constructor(page) {
        this.page = page;

        this.nameField = page.getByRole('textbox', { name: 'Your Name' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });

        this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async getCurrentUserData() {
        return {
            currentName: await this.nameField.inputValue(),
            currentLogin: await this.emailField.inputValue(),
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