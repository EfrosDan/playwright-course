import {test, expect} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
})

test.describe.only('Test on Forms', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
    })
    test('Forms',async ({page}) => {
        await page.getByText('Form Layout').click()
        await page.getByText('Datepicker').click()
    })
})

test.describe('Locator syntax rules', () => {
    // test.beforeEach(async ({page}) => {
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layout').click()
    // })
    test('Locators', async({page}) => {
        //By Tag name
        await page.locator('input')
        
        //By ID
        await page.locator('#inputEmail1')

        //By Class
        await page.locator('.input-full-width')

        //By attribute
        await page.locator('[placeholder="Email"]')

        //By Class value (full)
        await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        //combine different selectors
        await page.locator('input[placeholder="Email"]')

        //by partial text match
        await page.locator(':text("Using")')

        //by exact text match
        await page.locator(':text-is("Using the Grid")')
    })

    test('User facing locators', async({page}) => {
        await page.getByRole('textbox', {name: 'Email'}).click()
        await page.getByRole('button', {name: 'Sign In'}).click()

        await page.getByLabel('Email').click()
        await page.getByPlaceholder('Jone Dae').click()
        await page.getByText('Using the Grid').click()

    })

    test('Locating child elements', async({page}) => {
        await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    })
    
    test('Locating parent elements', async({page}) => {
        await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click()
        await page.locator('nb-card', {has : page.locator("#inputEmail1")}).getByRole('textbox', {name: 'Email'}).click()
    })

    test('Reusing the locators', async({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
        await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: 'Email'}).fill('email@gmail.com')
        await page.locator('nb-card', {hasText: "Basic form"}).getByRole('textbox', {name: 'Password'}).fill('pass123')
        await page.locator('nb-card', {hasText: " Basic form"}).locator('nb-checkbox').click()
        await page.locator('nb-card', {hasText: "Basic form"}).getByRole('button').click()
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
        
    await expect(emailField).toHaveValue('email@gmail.com')
    })

    test('exctracting values', async({page}) => {
        //single text value
        const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
        const buttonForm =  await basicForm.locator('button').textContent()
        
        expect(buttonForm).toEqual('Submit')

        //all text value
        const allRadioButtonsLabel = await page.locator('nb-radio').allTextContents()
        expect(allRadioButtonsLabel).toContain("Option 1")

        //input value
        const emailField = basicForm.getByRole('textbox', {name: 'Email'})
        await emailField.fill('email@gmail.com')
        const emailInput = await emailField.inputValue()
        expect(emailInput).toEqual('email@gmail.com')

        const placehoolderInput = await emailField.getAttribute('placeholder')
        expect(placehoolderInput).toEqual('Email')
    })

    test('assertions', async ({page}) => {
        const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')

        const text = await basicFormButton.textContent()
       await expect(basicFormButton).toHaveText('Submit')

    })
})