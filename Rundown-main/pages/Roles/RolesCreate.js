class RolesCreate {
  constructor(page) {
    this.page = page;
    this.Roles = page.getByRole("link", { name: "Roles" });
    this.NewRolesButton = page.getByRole("link", { name: "New role" });
    this.RoleNameInput = page.getByRole("textbox", { name: "Role name *" });
    this.ClientsCreate = page.getByRole("checkbox", {
      name: "Clients: Create",
    });
    this.ProjectCreate = page.getByRole("checkbox", {
      name: "Projects: Create",
    });
    this.ProjectView = page.getByRole("checkbox", { name: "Projects: View" });
    this.SaveChange = page.getByRole("button", { name: "Save changes" });
    this.ClientsView = page.getByRole("checkbox", { name: "Clients: View" });
    this.ClientsUpdate = page.getByRole("checkbox", {
      name: "Clients: Update",
    });
    this.ClientsDelete = page.getByRole("checkbox", {
      name: "Clients: Delete",
    });
    this.UsersCreate = page.getByRole("checkbox", { name: "Users: Create" });
    this.UsersView = page.getByRole("checkbox", { name: "Users: View" });
    this.UsersUpdate = page.getByRole("checkbox", { name: "Users: Update" });
    this.UsersDelete = page.getByRole("checkbox", { name: "Users: Delete" });
  }

  async goto() {
    await this.Roles.click();
  }

  async CreateRolesButton() {
    await this.NewRolesButton.click();
  }

  async CreateRoles(roleName) {
    await this.RoleNameInput.fill(roleName);
    //ClientAccess
    await this.ClientsCreate.click();
    await this.ClientsView.click();
    await this.ClientsUpdate.click();
    await this.ClientsDelete.click();

    //UserAccess
    await this.UsersCreate.click();
    await this.UsersView.click();
    await this.UsersUpdate.click();
    await this.UsersDelete.click();
    await this.page.getByRole("button", { name: "Create role" }).click();
  }
  async updateRoles() {
    await this.ProjectCreate.click();
    await this.ProjectView.click();
    await this.SaveChange.click();
  }
}

module.exports = RolesCreate;
