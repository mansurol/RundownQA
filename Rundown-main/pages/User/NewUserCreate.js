const { expect } = require("@playwright/test");
class NewUserCreate {
  constructor(page) {
    this.page = page;
    this.Users = page.getByRole("link", { name: "User" });
    this.NewUserButton = page.getByRole("link", {
      name: "New user (Alt Shift N)",
    });
    this.SearchUser = page.getByRole("textbox", {
      name: "Search by name or email",
    });
    this.UpdateButton = page.getByRole("button", { name: "Update" });
    this.updateStatus = page.getByRole("combobox", { name: "Status" });
    this.selectStatus = page.getByText("Inactive");
    this.updateSave = page.getByRole("button", { name: "Save changes" });
    this.Name = page.getByRole("textbox", { name: "Full name" });
    this.Email = page.getByRole("textbox", { name: "Email (@co.design)" });
    this.Password = page.getByRole("textbox", { name: "Temporary password" });
    this.RePassword = page.getByRole("textbox", { name: "Confirm password" });
    this.SubmitButton = page.getByRole("button", { name: "Create user" });
  }

  async goto() {
    await this.Users.click();
  }

  async CreateUserButton() {
    await this.NewUserButton.click();
  }
  async CreateUser(usrName, userMail, pass, repass, roleName) {
    console.log(usrName);
    await this.Name.fill(usrName);
    await this.Email.fill(userMail);
    await this.Password.fill(pass);
    await this.RePassword.fill(repass);
    const SetRole = this.page.getByRole("checkbox", {
      name: roleName,
    });
    await SetRole.click();
    await this.SubmitButton.click();
  }
  async userEdit(userMail) {
    await this.SearchUser.fill(userMail);
    const selectUser = this.page.getByRole("link", {
      name: userMail,
    });
    await selectUser.click();
    await this.UpdateButton.click();
    await this.updateStatus.click();
    await this.selectStatus.click();
    await this.updateSave.click();
    await expect(
      this.page.getByText("User updated successfully", {
        exact: true,
      }),
    ).toBeVisible();
  }
}

module.exports = NewUserCreate;
