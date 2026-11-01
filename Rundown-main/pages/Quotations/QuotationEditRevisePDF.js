const { expect } = require("@playwright/test");

class QuotationEditRevisePDF {
  constructor(page) {
    this.page = page;
    this.QuotationsPage = page.getByRole("link", { name: "Quotations" });
    this.SearchQuotation = page.getByRole("textbox", {
      name: "Search by client, project or",
    });
    this.ReviseQuotation = page.getByRole("button", { name: "Revise" });
    this.QuotationEditReason = page.getByRole("textbox", {
      name: "Reason for this version",
    });
    this.UnitPrice = page.locator('input[name="items.0.unitPrice"]');

    this.ReviseReason = page.getByRole("textbox", {
      name: "e.g. Client requested an",
    });
    this.ReviseDayToCompletedate = page.getByRole("spinbutton", {
      name: "Days to complete",
    });
    this.SaveButton = page.getByRole("button", { name: "Save version" });
    this.CreateVersionButton = page.getByRole("button", {
      name: "Create version",
    });
    this.MarksentQuotation = page.getByRole("button", { name: "Mark as sent" });
    this.sentQuotation = page.getByRole("button", { name: "sent Quotation" });
    this.ApproveButton = page.getByRole("button", { name: "Mark Approve" });
    this.finalApproveButton = page.getByRole("button", {
      name: "Approve",
      exact: true,
    });

    this.DownloadPDFButton = page.getByRole("button", { name: "Download PDF" });
    this.download = page
      .getByRole("contentinfo")
      .getByRole("button", { name: "Download PDF" });
  }

  async goto() {
    await this.QuotationsPage.click();
  }

  async editQuotationForm(ProjectName) {
    await this.SearchQuotation.fill(ProjectName);
    const SelectQuoation = this.page.getByRole("link", {
      name: ProjectName,
    });
    await SelectQuoation.click();
    await this.ReviseQuotation.click();
    await this.QuotationEditReason.fill("update");
    await this.UnitPrice.fill("9999");
    await this.ReviseDayToCompletedate.fill("29");
    await this.SaveButton.click();
    await this.CreateVersionButton.click();
    await this.MarksentQuotation.click();
    await this.sentQuotation.click();
    await this.ApproveButton.click();
    await this.finalApproveButton.click();
  }

  async DownloadPDF() {
    await this.DownloadPDFButton.click();
    await this.download.click();
  }
}
module.exports = QuotationEditRevisePDF;
