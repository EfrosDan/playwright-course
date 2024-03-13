const { chromium } = require('playwright');

const loginData = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' }
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const data of loginData) {
    // Navigate to the login page
    await page.goto('https://example.com/login');

    // Fill in the login form with current data
    await page.fill('input[name="username"]', data.username);
    await page.fill('input[name="password"]', data.password);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the login to complete
    await page.waitForNavigation();

    // Check for error message indicating failed login
    const errorMessage = await page.textContent('.error-message');

    if (errorMessage) {
      console.log(`Login failed for ${data.username}`);
    } else {
      // Verify successful login by checking for a welcome message or redirect URL
      const welcomeMessage = await page.textContent('.welcome-message');
      console.log(`Login successful for ${data.username}: ${welcomeMessage}`);
    }

    // Clear the form fields
    await page.fill('input[name="username"]', '');
    await page.fill('input[name="password"]', '');
  }

  // Close the browser
  await browser.close();
})();
