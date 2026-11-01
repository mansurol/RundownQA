const path = require("path");
const { expect } = require("@playwright/test");

class CreateWorkOrder {
  constructor(page) {
    this.page = page;

    this.WorkOrderPage = page.getByRole("link", {
      name: "Work orders",
      exact: true,
    });

    this.SearchWorkOrder = page.getByRole("textbox", {
      name: "Search by client, project or",
    });

    this.ProjectEditBtn = page.getByRole("button", {
      name: "Edit",
    });

    this.NewWorkOrderButton = page.getByRole("button", {
      name: /^New Work Order/,
    });

    this.SearchQuotation = page.getByRole("textbox", {
      name: "Search by quotation, project",
    });

    this.SelectQuotationButton = page.getByRole("button", {
      name: "Use quotation",
    });

    this.WorkOrderdateCalender = page.getByRole("button", {
      name: "Work order date",
    });

    this.ReceivedFromClient = page.getByRole("button", {
      name: "Received from client Optional",
    });

    this.FileInput = page.locator('input[type="file"]');

    this.PdfFile = path.resolve(
      __dirname,
      "../../fixtures/QUOTATION__Tech-2.pdf",
    );

    this.PaymentShedule = page.getByRole("textbox", {
      name: "Milestone 1 name",
    });

    this.PaymentPersentange = page.getByRole("spinbutton", {
      name: "Milestone 1 share",
    });

    this.PaymentDateCalender = page.getByRole("button", {
      name: "Milestone 1 due date",
    });

    this.paymentMilestoneTwo = page.getByRole("button", {
      name: "Add milestone",
    });

    this.PaymentSheduleTwo = page.getByRole("textbox", {
      name: "Milestone 2 name",
    });

    this.PaymentPersentangTwo = page.getByRole("spinbutton", {
      name: "Milestone 2 share",
    });

    this.PaymentDateCalenderTwo = page.getByRole("button", {
      name: "Milestone 2 due date",
    });

    this.paymentMilestoneThree = page.getByRole("button", {
      name: "Add milestone",
    });

    this.PaymentSheduleThree = page.getByRole("textbox", {
      name: "Milestone 3 name",
    });

    this.PaymentPersentangThree = page.getByRole("spinbutton", {
      name: "Milestone 3 share",
    });

    this.PaymentDateCalenderThree = page.getByRole("button", {
      name: "Milestone 3 due date",
    });

    this.RaiseWorkOrder = page.getByRole("button", {
      name: "Raise work order",
    });

    this.ApproveWorkOrder = page.getByRole("button", {
      name: "Approve",
    });

    this.FinalApproveWorkOrder = page.getByRole("dialog").getByRole("button", {
      name: "Approve",
    });

    this.SaveChange = page.getByRole("button", {
      name: "Save changes",
    });
  }

  async goto() {
    await this.WorkOrderPage.click();
  }

  async CreateWorkOrderButton() {
    await this.NewWorkOrderButton.click();
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

  async NewworkOrder(ProjectName) {
    // Search quotation
    await this.SearchQuotation.fill(ProjectName);

    const SelectQuotation = this.page.getByRole("radio", {
      name: ProjectName,
    });

    await expect(SelectQuotation).toBeVisible();
    await SelectQuotation.click();

    await expect(this.SelectQuotationButton).toBeEnabled();
    await this.SelectQuotationButton.click();

    // Work Order Date: 2 days from today
    await this.selectDate(this.WorkOrderdateCalender, 2);

    // Received Date: 9 days from today
    await this.selectDate(this.ReceivedFromClient, 9);

    // Upload quotation PDF
    await this.FileInput.setInputFiles(this.PdfFile);

    // Milestone 1
    await this.PaymentShedule.fill("1st");
    await this.PaymentPersentange.fill("50");

    await this.selectDate(this.PaymentDateCalender, 4);

    // Milestone 2
    await this.paymentMilestoneTwo.click();

    await this.PaymentSheduleTwo.fill("2nd");
    await this.PaymentPersentangTwo.fill("50");

    await this.selectDate(this.PaymentDateCalenderTwo, 7);

    // Raise and approve work order
    await this.RaiseWorkOrder.click();

    await this.ApproveWorkOrder.click();

    await this.FinalApproveWorkOrder.click();
  }

  async EdtWorkOrder(ProjectName) {
    // Search work order
    await this.SearchWorkOrder.fill(ProjectName);

    const SelectProject = this.page.getByRole("link", {
      name: ProjectName,
    });

    await expect(SelectProject).toBeVisible();
    await SelectProject.click();

    await this.ProjectEditBtn.click();

    // Update milestone 2
    await this.PaymentPersentangTwo.fill("25");

    // Add milestone 3
    await this.paymentMilestoneThree.click();

    await this.PaymentSheduleThree.fill("3rd");
    await this.PaymentPersentangThree.fill("25");

    await this.selectDate(this.PaymentDateCalenderThree, 10);

    // Save changes
    await this.SaveChange.click();
  }
}

module.exports = CreateWorkOrder;
