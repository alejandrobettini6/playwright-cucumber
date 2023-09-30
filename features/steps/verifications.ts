import {Then} from '@cucumber/cucumber'
import assert from 'assert'

Then('I verify the page contains {string}', async function(validation: string){
    //waiting the page is completly loaded before make the validation
    await this.page.waitForEvent('load');
    assert(await this.page.url().includes(validation));
})

Then('I verify that element {string} contains text {string}', async function(element: string, validation: string){
    let elementText = await this.page.locator(this.locators[element].locator).innerText();
    assert(elementText.includes(validation), `We expect to find text ${validation} but just found ${elementText}`)
    console.log(`Element verified`)
})