import {test, expect} from '@playwright/test'

test.beforeEach( async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()

})
test('auto waiting', async({page}) => {
    const succesbutton =  page.locator('.btn-primary')
    await succesbutton.click()
})