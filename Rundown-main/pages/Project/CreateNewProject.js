const { expect } = require("@playwright/test");

class CreateNewProject {
  constructor(page) {
    this.page = page;

    this.ProjectsPageNavigation = page
      .getByRole("menuitem", { name: "Projects" })
      .getByRole("link");

    this.NewProjectButton = page.getByRole("button", {
      name: "New Project ",
    });

    this.ClientFind = page.getByRole("textbox", {
      name: "Search by company name",
    });

    this.ClienSubmittButton = page.getByRole("button", {
      name: "Use client",
    });

    this.ProjectNameInput = page.getByRole("textbox", {
      name: "Project name",
    });

    this.ProjectType = page.getByRole("button", {
      name: "Retainer",
    });

    this.StartDateCalender = page.getByRole("button", {
      name: "Start date",
    });

    this.EndDateCalender = page.getByRole("button", {
      name: "Expected end date",
    });

    this.BriefDescription = page
      .getByRole("paragraph")
      .filter({ hasText: /^$/ });

    this.SubmitButton = page.getByRole("button", {
      name: "Save project",
    });
  }

  async goto() {
    await this.ProjectsPageNavigation.click();
  }

  async createNewProject() {
    await this.NewProjectButton.click();
  }

  // Generate dynamic date
  getFormattedDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  async selectDate(calendarButton, date) {
    await calendarButton.click();

    const dateName = this.getFormattedDate(date);

    const dateButton = this.page.getByRole("button", {
      name: dateName,
      exact: true,
    });

    await expect(dateButton).toBeVisible();
    await dateButton.click();
  }

  async NewProjectForm(projectName, EProjectBrief, CompanyName) {
    await this.ClientFind.fill(CompanyName);

    const ClientSelect = this.page.getByRole("radio", {
      name: CompanyName,
    });

    await ClientSelect.click();
    await this.ClienSubmittButton.click();

    await this.ProjectNameInput.fill(projectName);

    await this.ProjectType.click();

    // Dynamic Start Date: Tomorrow
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);

    // Dynamic End Date: 10 days from today
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);

    await this.selectDate(this.StartDateCalender, startDate);
    await this.selectDate(this.EndDateCalender, endDate);

    await this.BriefDescription.fill(EProjectBrief);

    await this.SubmitButton.click();

    await expect(
      this.page.getByRole("heading", {
        name: projectName,
        exact: true,
      }),
    ).toBeVisible();
  }
}

module.exports = CreateNewProject;
