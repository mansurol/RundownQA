class  Login {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByRole('textbox', { name: 'you@co.design' })
      this.passwordInput =  page.getByRole('textbox', { name: 'Enter your password' })
      this.signInButton =  page.getByRole('button', { name: 'Sign in' })
    }

    async fillEmail(email) {
     await this.emailInput.fill(email)
    }
  
    async fillPassword(password) {
    await this.passwordInput.fill(password)
    }
  
    async clickSignInButton() {
      await this.signInButton.click()
    }

    

  }
  
  module.exports = Login;