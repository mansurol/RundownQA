class Project {
  constructor(page) {
    this.page = page;
    this.ProjectSection = page
      .getByRole("menuitem", { name: "Projects" })
      .getByRole("link");
    this.searchProjectInput = page.getByRole("textbox", {
      name: "Search by client or project name",
    });
  }

  async goto() {
    await this.ProjectSection.click();
  }

  async createProjects(ProjectName) {
    await this.searchProjectInput.fill(ProjectName);
  }
}

module.exports = Project;
