class Payment {
  constructor(page) {
    this.page = page;
    this.Payments = page.getByRole("link", { name: "Payments" });
    this.NewPaymentsButton = page.getByRole("button", {
      name: "Record payment",
    });
    this.SelectInvoice = page.getByRole("button", {
      name: "Choose an invoice Only",
    });
    this.SearchInoice = page.getByRole("textbox", {
      name: "Search by invoice, client or",
    });

    this.UseInvoiceButton = page.getByRole("button", { name: "Use invoice" });
    this.ReceivedFromClient = page.getByRole("spinbutton", {
      name: "Amount received *",
    });
    this.PaymentMethod = page.getByRole("radio", { name: "Cash" });
    this.RefNumber = page.getByRole("textbox", {
      name: "Reference for bank, cheque or",
    });
    this.RemarkText = page.getByRole("button", {
      name: "Add a note Remarks · optional",
    });
    this.SubmitPayment = page.getByRole("button", {
      name: "Record payment",
      exact: true,
    });
  }

  async goto() {
    await this.Payments.click();
  }

  async CreatePaymentsButton() {
    await this.NewPaymentsButton.click();
  }

  async NewPayment(projectName) {
    await this.SelectInvoice.click();
    await this.SearchInoice.fill(projectName);
    const SelectInvoice = this.page.getByRole("radio", {
      name: projectName,
    });
    await SelectInvoice.click();
    await this.UseInvoiceButton.click();
    await this.ReceivedFromClient.fill("100");
    await this.PaymentMethod.click();
    await this.RefNumber.fill("123456768");
    await this.RemarkText.click();
    await this.SubmitPayment.click();
  }
}

module.exports = Payment;
