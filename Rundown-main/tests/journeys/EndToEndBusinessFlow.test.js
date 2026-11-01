import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import Clients from "../../pages/clients/Clients";
import CreateNewProject from "../../pages/Project/CreateNewProject";
import Quotation from "../../pages/Quotations/CreateQuotations";
import WorkOrder from "../../pages/WorkOrders/WorkOrders";
import Invoice from "../../pages/Invoices/CreateInvoices";
import Payment from "../../pages/Payments/Payment";

require("dotenv").config();

test("FullBusinessJourney", async ({ page }) => {
  const login = new Login(page);
  const clients = new Clients(page);
  const createNewProject = new CreateNewProject(page);
  const quotations = new Quotation(page);
  const workOrder = new WorkOrder(page);
  const invoice = new Invoice(page);
  const payment = new Payment(page);

  //Unique data for each test run
  const stamp = String(Date.now()).slice(-2);
  const companyName = `Test ${stamp}`;
  const projectName = `Web Project ${stamp}`;
  const contactEmail = `contact${stamp}@gmail.com`;
  const contactPhone = `01${String(stamp).slice(-9)}`;
  //Login

  await test.step("Login", async () => {
    await page.goto(process.env.Url);
    await login.fillEmail(process.env.Email);
    await login.fillPassword(process.env.password);
    await login.clickSignInButton();
    // Assertion: login should complete successfully
    await expect(page).not.toHaveURL(/\/login(?:[/?#]|$)/);
  });

  //New Client Create

  await test.step("Create Client", async () => {
    await clients.goto();
    await clients.createClient(
      companyName,
      process.env.Address,
      process.env.TIN,
      process.env.BIN,
      process.env.ContactPersonName,
      process.env.ContactPersonDesignation,
      contactEmail,
      contactPhone,
    );
    await expect(
      page.getByRole("heading", { name: companyName }),
    ).toBeVisible();
  });

  //Project Create

  await test.step("Create Project", async () => {
    await createNewProject.goto();
    await createNewProject.createNewProject();
    await createNewProject.NewProjectForm(
      projectName,
      process.env.EProjectBrief,
      companyName,
    );
    await expect(
      page.getByRole("heading", { name: projectName }),
    ).toBeVisible();
  });

  //QuotationCreate
  await test.step("Create Quotation", async () => {
    await quotations.goto();
    await quotations.CreateQuotations();
    await quotations.NewQuotationForm(
      companyName,
      process.env.dayCompleteInput,
      process.env.GroupTitle,
      process.env.TitleName,
      process.env.ItemNitPrice,
      process.env.itemQuantity,
      process.env.TitleNameTwo,
      process.env.ItemNitPriceTwo,
      process.env.itemQuantityTwo,
      process.env.Agencyfee,
      process.env.Discount,
      process.env.Vat,
    );
    await quotations.QuotationSent();
    await quotations.ApproveQuotation(projectName);

    await expect(
      page
        .locator(".jc__status:visible")
        .filter({ hasText: "Approved" })
        .first(),
    ).toBeVisible();
  });

  //WorkOrder

  await test.step("Create Work Order", async () => {
    await workOrder.goto();
    await workOrder.CreateWorkOrderButton();
    await workOrder.NewworkOrder(projectName);

    await expect(page.getByText(projectName).first()).toBeVisible({
      timeout: 15000,
    });

    // ২. Status "Approved"
    await expect(
      page.getByText("Approved", { exact: true }).first(),
    ).toBeVisible();
  });

  //Invoice

  await test.step("Invoice", async () => {
    await invoice.goto();
    await invoice.CreateInvoiceButton();
    await invoice.NewInvoice(projectName);
    await invoice.SumitInvoice();

    await expect(page.getByText(projectName).first()).toBeVisible({
      timeout: 15000,
    });

    await expect(
      page.getByText("Submitted", { exact: true }).first(),
    ).toBeVisible();

    await invoice.DownloadPDF();
  });

  await test.step("Payments", async () => {
    await payment.goto();
    await payment.CreatePaymentsButton();
    await payment.NewPayment(projectName);
    await expect(
      page.getByText("Payment recorded", { exact: true }),
    ).toBeVisible();

    await expect(page.getByText(projectName).first()).toBeVisible({
      timeout: 15000,
    });
  });
});
