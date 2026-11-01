class NewUserLogin {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "you@co.design" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Enter your password",
    });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async fillmail(Nmail) {
    await this.emailInput.fill(Nmail);
  }

  async fillPass(Npass) {
    await this.passwordInput.fill(Npass);
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }
}

module.exports = NewUserLogin;
