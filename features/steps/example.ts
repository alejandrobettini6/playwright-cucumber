import {Given, When,  Then} from '@cucumber/cucumber'
import fs from 'fs'
import yaml from 'js-yaml'
import assert from 'assert'

Given('Im in page {string}',  async function(page: string){
    //saving page we are using in global this to reuse it in other steps
    this.locators = yaml.load(fs.readFileSync(`${process.cwd()}/features/pages/${page.toLowerCase()}.yaml`, 'utf-8'));
    //opening the page
    await this.page.goto(this.locators.url);
})

When('I write {string} in {string}', async function(text:string, element:string){
    await this.page.locator(this.locators[element].locator).type(text);
})

When('I press {string}', async function(key: string){
    await this.page.keyboard.press(key);
})

Then('I verify the page contains {string}', async function(validation: string){
    //waiting the page is completly loaded before make the validation
    await this.page.waitForEvent('load');
    assert(await this.page.url().includes(validation));
})

Given('I open the page {string}', async function(url: string){
    await this.page.goto(url);
})

When('I search in google {string}', async function(searchValue: string){
    await this.page.locator('//textarea[@title="Buscar"]').fill(searchValue);
    await this.page.keyboard.press('Enter')
})