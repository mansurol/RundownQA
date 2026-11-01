class LogOut {
    constructor(page) {
        this.page = page;

       
        this.userMenu = page.getByRole('complementary').getByText('Super Admin', { exact: true })
        this.signOutButton = page.getByRole('button', {name: 'Sign out'})
    }

    async logout() {
        await this.userMenu.click();
        await this.signOutButton.click();
    }
}

module.exports = LogOut;