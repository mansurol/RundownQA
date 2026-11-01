const { expect } = require("@playwright/test");

class CreateInvoice {
  constructor(page) {
    this.page = page;

    this.InvoicePage = page
      .getByRole("complementary")
      .getByRole("link", { name: /^Invoices/ });

    this.NewInvoicesButton = page.getByRole("button", {
      name: /^New Invoice/,
    });

    this.SearchWorkOrder = page.getByRole("textbox", {
      name: "Search by work order, client",
    });

    this.UseWorkOrderButton = page.getByRole("button", {
      name: "Use work order",
    });

    this.InvoiceDatecalender = page.getByRole("button", {
      name: "Invoice date",
    });

    this.InvoiceDueDatecalender = page.getByRole("button", {
      name: "Due date",
    });

    this.RemarksButton = page.getByRole("paragraph").filter({
      hasText: /^$/,
    });

    this.SaveInvoice = page.getByRole("button", {
      name: "Save invoice",
    });

    this.SubmitInvoice = page
      .getByRole("button", { name: "Submit invoice" })
      .first();

    this.FinalSubmitInvoice = page.getByRole("button", {
      name: "Submit",
      exact: true,
    });

    this.SubmittedInvoice = page
      .getByRole("link", { name: /INV-.*Submitted/ })
      .first();

    this.downloadInvoice = page.getByRole("button", {
      name: "Download PDF",
    });

    this.FinalDownload = page
      .getByRole("contentinfo")
      .getByRole("button", { name: "Download PDF" });
  }

  async goto() {
    await this.InvoicePage.click();
  }

  async CreateInvoiceButton() {
    await this.NewInvoicesButton.click();
  }

  // Generate future date
  getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  // Format date as DD/MM/YYYY
  getFormattedDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // Dynamic date selection
  async selectDate(calendarButton, daysFromToday) {
    await calendarButton.click();

    const date = this.getFutureDate(daysFromToday);
    const formattedDate = this.getFormattedDate(date);

    const dateInput = this.page.getByRole("textbox", {
      name: "Date",
    });

    await expect(dateInput).toBeVisible();

    await dateInput.fill(formattedDate);
    await dateInput.press("Enter");
  }

  async NewInvoice(ProjectName) {
    // Search Work Order
    await this.SearchWorkOrder.fill(ProjectName);

    const workOrder = this.page.getByText(ProjectName, {
      exact: false,
    });

    await expect(workOrder).toBeVisible();
    await workOrder.click();

    await this.UseWorkOrderButton.click();

    // Invoice Date: 2 days from today
    await this.selectDate(this.InvoiceDatecalender, 2);

    // Due Date: 12 days from today
    await this.selectDate(this.InvoiceDueDatecalender, 12);

    // Add Remarks
    await this.RemarksButton.fill("Testing remark");

    // Save Invoice
    await this.SaveInvoice.click();

    await expect(this.SubmitInvoice).toBeVisible();
  }

  async SumitInvoice() {
    await this.SubmitInvoice.click();

    await expect(this.FinalSubmitInvoice).toBeVisible();
    await this.FinalSubmitInvoice.click();
  }

  async DownloadPDF() {
    await this.downloadInvoice.click();

    await expect(this.FinalDownload).toBeVisible();
    await this.FinalDownload.click();
  }
}

module.exports = CreateInvoice;
