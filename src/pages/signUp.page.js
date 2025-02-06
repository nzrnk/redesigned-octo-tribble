export class SignUpPage {
    constructor(page) {
        this.page = page;

        this.yourNameField = page.getByRole('textbox', { name : 'Your Name'});
        this.emailField = page.getByRole('textbox', { name : 'Email'});
        this.passwordField = page.getByRole('textbox', { name : 'Password'});

        this.signUpButton = page.getByRole('button', { name : 'Sign up'});
    }

    async signUp({username, email, password}) {
        await this.yourNameField.click();
        await this.yourNameField.fill(username);
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.signUpButton.click();
     }

}