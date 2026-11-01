class Clients {
  constructor(page) {
    this.page = page;
    this.ClientsPage = page
      .getByRole("menuitem", { name: "Clients" })
      .getByRole("link");
    this.CreateClient = page.getByRole("button", { name: /^New Client/ });
    this.InputCompanyName = page.getByRole("textbox", {
      name: "Company name",
    });
    this.InputTIN = page.getByRole("textbox", { name: "TIN" });
    this.InputBIN = page.getByRole("textbox", { name: "BIN" });
    this.InputAddress = page.getByRole("textbox", { name: "Address" });

    this.ContactPersonName = page.getByRole("textbox", { name: "Full name" });
    this.ContactPersonDesignation = page.getByRole("textbox", {
      name: "Designation",
    });
    this.ContactPersonEmail = page.getByRole("textbox", { name: "Email" });
    this.ContactPersonPhone = page.getByRole("textbox", {
      name: "01XXXXXXXXX",
    });
    this.ContactPerson = page.getByRole("button", { name: "Add contact" });
    this.SaveButton = page.getByRole("button", { name: "Save client" });
    this.ExportButton = page.getByRole("button", {
      name: "Export",
      exact: true,
    });
  }

  async goto() {
    await this.ClientsPage.click();
  }

  async createClient(
    CompanyName,
    Address,
    TIN,
    BIN,
    ContactPersonName,
    ContactPersonDesignation,
    ContactPersonEmail,
    ContactPersonPhone,
  ) {
    await this.CreateClient.click();
    await this.InputCompanyName.fill(CompanyName);
    await this.InputTIN.fill(TIN);
    await this.InputBIN.fill(BIN);
    await this.InputAddress.fill(Address);
    await this.ContactPersonName.fill(ContactPersonName);
    await this.ContactPersonDesignation.fill(ContactPersonDesignation);
    await this.ContactPersonEmail.fill(ContactPersonEmail);
    await this.ContactPersonPhone.fill(ContactPersonPhone);

    await this.SaveButton.click();
  }

  async exportClients() {
    await this.ExportButton.click();
  }
}

module.exports = Clients;
