import { test, expect } from '@playwright/test'

// Como iniciar o projeto:
// 1. npm init -y
// 2. npm init playwright@latest
// 3. npx playwright test

// Para realizar algum teste:
// 3. npx playwright test --headed

// Para visualizar a interface:
// 3. npx playwright test --ui


test("Deve abrir a página de login", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");

    await expect(
        page.getByRole("heading", {
            name: "Test Login Page for Automation Testing Practice"
        })

    ).toBeVisible();

    await page 
        .getByLabel("Username") // Nome do campo
        .fill("practice"); // Valor que é inserido no campo
});

test("Deve realizar login", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");

    await page 
        .getByLabel("Username")
        .fill("practice");

    await page 
        .getByLabel("Password")
        .fill("SuperSecretPassword!");

    await page 
        .getByRole("button", {
            name: "Login"
        }).click();

    await expect(page).toHaveURL(/secure/);

    await expect(
        page.getByText("You logged into a secure area!")
    ).toBeVisible();
});

test("Deve realizar login com o usuário inválido", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");

    await page 
        .getByLabel("Username")
        .fill("InvalidUser");

    await page 
        .getByLabel("Password")
        .fill("SuperSecretPassword!");

    await page 
        .getByRole("button", {
            name: "Login"
        }).click();

    await expect(
        page.getByText("Invalid username.")
    ).toBeVisible();
});

test("Deve realizar login com a senha inválida", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");

    await page 
        .getByLabel("Username")
        .fill("practice");

    await page 
        .getByLabel("Password")
        .fill("InvalidPassword");

    await page 
        .getByRole("button", {
            name: "Login"
        }).click();

    await expect(
        page.getByText("Invalid password.")
    ).toBeVisible();
});