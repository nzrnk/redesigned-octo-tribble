export class AuthMainPage {
    constructor (page) {
        this.page = page;

        this.header = page.getByRole('navigation');
        this.headerDropDowm = page.locator('.nav-item.dropdown');
        this.profileLink = page.getByText('Profile');
        this.settingsLink = page.getByText('Settings');
        this.logoutLink = page.getByText('Logout');

        this.newArticleButton = page.getByRole('link', { name : 'New Article'});
    }

    async getCurrentUserData() {
        return {
            currenName: await this.headerDropDowm.innerText()
        }
    }
    
    async goToProfile() {
        await this.headerDropDowm.click();
        await this.profileLink.click();
    }

    async goToArticleEditor() {
        await this.newArticleButton.click();
    }
    
    async goToSettings() {
        await this.headerDropDowm.click()
        await this.settingsLink.click();

    }

    async goToLogout() {
        await this.headerDropDowm.click();
        await this.logoutLink.click();
    }
};
