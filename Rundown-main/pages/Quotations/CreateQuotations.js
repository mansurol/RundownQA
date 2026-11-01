const { expect } = require("@playwright/test");

class CreateQuotations {
  constructor(page) {
    this.page = page;

    this.QuotationsPage = page
      .getByRole("menuitem", { name: "Quotations" })
      .getByRole("link");

    this.NewQuotationButton = page.getByRole("button", {
      name: /^New Quotation/,
    });

    this.SelectClientModal = page.getByRole("button", { name: "Client" });

    this.SearchClientName = page.getByRole("textbox", {
      name: "Search by company name",
    });

    this.ClienSelectButton = page.getByRole("button", { name: "Use client" });

    this.SaveWithoutProject = page.getByRole("checkbox", {
      name: "Save without a project",
    });

    this.QuotationDateCalender = page.getByRole("button", {
      name: "Quotation date",
    });

    this.TeamName = page.getByRole("button", { name: "Creative" });

    this.CurrencyName = page.getByRole("combobox", { name: "Currency" });
    this.SelectCurrencyButton = page.getByText("EURO — Euro");

    this.dayToCompleteSwitch = page.getByRole("switch", {
      name: "Show days to complete",
    });

    this.dayToComplete = page.locator('input[name="daysToComplete"]');

    this.GroupTitleInput = page.getByRole("textbox", { name: "Group title" });
    this.ItemNameInput = page.getByRole("textbox", { name: "Item name" });
    this.ItemPrice = page.getByRole("spinbutton", { name: "Unit price" });
    this.ItemQty = page.getByRole("spinbutton", { name: "Qty" });

    this.AddItemButton = page.getByRole("button", { name: "Add item" });

    this.ItemNameInputTwo = page
      .getByRole("textbox", { name: "Item name" })
      .nth(1);

    this.ItemPriceTwo = page
      .getByRole("spinbutton", { name: "Unit price" })
      .nth(1);

    this.ItemQtyTwo = page.getByRole("spinbutton", { name: "Qty" }).nth(1);

    this.TermsAndConditionsInput = page
      .getByRole("paragraph")
      .filter({ hasText: /^$/ });

    this.AgencyFeeInput = page.getByRole("spinbutton", {
      name: "Agency fee percentage",
    });

    this.DiscountInput = page.getByRole("spinbutton", {
      name: "Discount percentage",
    });

    this.VatInput = page.getByRole("spinbutton", {
      name: "VAT percentage",
    });

    this.SaveButton = page.getByRole("button", { name: "Save quotation" });

    this.MarkSentButton = page
      .getByRole("button", { name: "Mark as sent" })
      .first();

    this.MarkSent = page.getByRole("button", { name: "Sent Quotation" });

    this.ApproveQuotationButton = page.getByRole("button", {
      name: "Mark approved",
    });

    this.ChooseProject = page.getByRole("button", {
      name: "Choose a project",
    });

    this.ProjectSelect = page.getByRole("radio", {
      name: "AA Website AAA Planning",
    });

    this.useProjectButton = page.getByRole("button", { name: "Use project" });

    this.ApproveQut = page.getByRole("button", {
      name: "Approve",
      exact: true,
    });

    this.SearchProjectName = page.getByRole("textbox", {
      name: "Search by project or client",
    });
  }

  async goto() {
    await this.QuotationsPage.click();
  }

  async CreateQuotations() {
    await this.NewQuotationButton.click();
  }

  // Dynamic Quotation Date
  getFormattedDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  async selectQuotationDate() {
    const quotationDate = new Date();

    await this.QuotationDateCalender.click();

    const dateName = this.getFormattedDate(quotationDate);

    const dateButton = this.page.getByRole("button", {
      name: dateName,
      exact: true,
    });

    await expect(dateButton).toBeVisible();
    await dateButton.click();
  }

  async NewQuotationForm(
    companyName,
    dayCompleteInput,
    GroupTitle,
    TitleName,
    ItemNitPrice,
    itemQuantity,
    TitleNameTwo,
    ItemNitPriceTwo,
    itemQuantityTwo,
    Agencyfee,
    Discount,
    Vat,
  ) {
    await this.SelectClientModal.click();

    await this.SearchClientName.fill(companyName);

    const Project = this.page.getByRole("radio", {
      name: new RegExp(`^${companyName}\\b`),
    });

    await Project.click();
    await this.ClienSelectButton.click();

    await this.SaveWithoutProject.click();

    await this.selectQuotationDate();

    await this.TeamName.click();

    await this.CurrencyName.click();
    await this.SelectCurrencyButton.click();

    await this.dayToCompleteSwitch.click();
    await this.dayToComplete.fill(dayCompleteInput);

    await this.GroupTitleInput.fill(GroupTitle);
    await this.ItemNameInput.fill(TitleName);
    await this.ItemPrice.fill(ItemNitPrice);
    await this.ItemQty.fill(itemQuantity);

    await this.AddItemButton.click();

    await this.ItemNameInputTwo.fill(TitleNameTwo);
    await this.ItemPriceTwo.fill(ItemNitPriceTwo);
    await this.ItemQtyTwo.fill(itemQuantityTwo);

    await this.TermsAndConditionsInput.fill(
      "This is a test for the terms and conditions.",
    );

    await this.AgencyFeeInput.fill(Agencyfee);
    await this.DiscountInput.fill(Discount);
    await this.VatInput.fill(Vat);

    await this.SaveButton.click();
  }

  async QuotationSent() {
    await this.MarkSentButton.click();
    await this.MarkSent.click();
  }

  // Approve Quotation
  async ApproveQuotation(ProjectName) {
    await this.ApproveQuotationButton.click();

    await this.ChooseProject.click();
    await this.SearchProjectName.fill(ProjectName);

    const PSelect = this.page.getByRole("radio", {
      name: new RegExp(`^${ProjectName}\\b`),
    });

    await PSelect.click();
    await this.useProjectButton.click();
    await this.ApproveQut.click();
  }
}

module.exports = CreateQuotations;
