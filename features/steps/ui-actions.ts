import {Given, When,  Then} from '@cucumber/cucumber'
import fs from 'fs'
import yaml from 'js-yaml'

Given('Im in page {string}',  async function(page: string){
    //saving page we are using in global this.locators to reuse it in other steps
    this.locators = yaml.load(fs.readFileSync(`${process.cwd()}/features/pages/${page.toLowerCase()}.yaml`, 'utf-8'));
    //opening the page
    await this.page.goto(this.locators.url);
})

When('I click {string}', async function(element: string){
    await this.page.locator(this.locators[element].locator).click();
    console.log(`Clicked on element ${element}`)
})

When('I write {string} in {string}', async function(text:string, element:string){
    await this.page.locator(this.locators[element].locator).type(text);
    console.log(`Element ${element} seted with text ${text}`)
})

When('I press key {string}', async function(key: string){
    await this.page.keyboard.press(key);
    console.log(`Key pressed ${key}`)
})

When('I select {string} in radio button {string}', async function(opt: string, element: string){
    let elementLocator = this.locators[element].locator.replace('<option>', opt);
    await this.page.locator(elementLocator).check();
    console.log(`Option ${opt} in radio button ${element} han been checked`)
})

When('I check {string}', async function(element: string){
    await this.page.locator(this.locators[element].locator).check();
    console.log(`Element ${element} has been checked`)
})

When('I select {string} in dropdown {string}', async function(opt: string, dropdown: string){
    await this.page.locator(this.locators[dropdown].locator).selectOption(opt)
    console.log(`Dropdown option ${opt} selected sucessfully`)
})