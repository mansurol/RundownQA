const { expect } = require("@playwright/test");
class ClientsSearchFilter {
  constructor(page) {
    this.page = page;
    this.ClientsPage = page.getByRole("link", { name: "Clients" });
    this.ClientSearch = page.getByRole("textbox", {
      name: "Search by name, contact or",
    });
    this.ClearSearchBox = page.getByRole("button", { name: "close-circle" });

    this.filterClients = page.getByText("Status:All");
    this.ClentsStatusInactive = page.getByRole("option", { name: "Inactive" });
    this.clearStatusFilter = page.locator(".ant-select-clear").first();
  }

  async goto() {
    await this.ClientsPage.click();
  }

  async searchClient(CompanyName) {
    await this.ClientSearch.fill(CompanyName);

    const clientRow = this.page.locator("a.list-table-row").filter({
      has: this.page.getByText(CompanyName, { exact: true }),
    });

    await expect(clientRow).toBeVisible();
    await this.ClearSearchBox.click();
  }

  async filterClient() {
    await this.filterClients.click();
    await this.ClentsStatusInactive.click();
    await this.clearStatusFilter.click();
  }
}

module.exports = ClientsSearchFilter;
