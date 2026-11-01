class EditProjects {
  constructor(page) {
    this.page = page;
    this.ProjectPage = page
      .getByRole("menuitem", { name: "Projects" })
      .getByRole("link");
    this.ProjectFind = page.getByRole("textbox", {
      name: "Search by client or project",
    });
    this.ProjecteditForm = page.getByText("Edit project");
    this.DateCalender = page.getByRole("button", { name: "Start date" });
    this.DateUpdate = page.getByRole("button", { name: "23 October" });
    this.PType = page.getByRole("button", { name: "Retainer" });
    this.PSave = page.getByRole("button", { name: "Save changes" });
  }

  async goto() {
    await this.ProjectPage.click();
  }

  async ProjectEdit(ProjectName) {
    await this.ProjectFind.fill(ProjectName);
    const SelectProject = this.page.getByRole("link", {
      name: ProjectName,
    });
    await SelectProject.click();
    await this.ProjecteditForm.click();
    await this.DateCalender.click();
    await this.DateUpdate.click();
    await this.PType.click();
    await this.PSave.click();
  }
}

module.exports = EditProjects;
