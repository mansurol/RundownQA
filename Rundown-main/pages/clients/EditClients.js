const { expect } = require("@playwright/test");

class EditClients {
  constructor(page) {
    this.page = page;

    this.ClientSection = page.getByRole("link", { name: "Clients" });

    this.ClientSearch = page.getByRole("textbox", {
      name: "Search by name, contact or",
    });
    this.EditClientButton = page.getByRole("link", { name: "Edit client" });

    this.CAddress = page.getByRole("textbox", { name: "Address" });

    this.CBIN = page.getByRole("textbox", { name: "BIN" });

    this.CContactPersonName = page.getByRole("textbox", { name: "Full name" });

    this.ChangeSubmitButton = page.getByRole("button", {
      name: "Save changes",
    });
  }

  async goto() {
    await this.ClientSection.click();
  }

  async ClientEdit(CompanyName) {
    await this.ClientSearch.fill(CompanyName);

    const clientDetails = this.page.locator("a.list-table-row").filter({
      has: this.page.getByText(CompanyName, {
        exact: true,
      }),
    });

    // Verify the searched client is visible
    await expect(clientDetails.first()).toBeVisible();

    // Open client details
    await clientDetails.first().click();
    await this.EditClientButton.click();
  }

  async updateClient(EAddress, EBIN, EContactPersonName) {
    await this.CBIN.fill(EBIN);
    await this.CAddress.fill(EAddress);
    await this.CContactPersonName.fill(EContactPersonName);

    await this.ChangeSubmitButton.click();

    // Verify Save changes button is no longer visible
    await expect(this.ChangeSubmitButton).toBeHidden();
  }
}

module.exports = EditClients;
