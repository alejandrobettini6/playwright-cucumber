import {Before, After, setDefaultTimeout} from '@cucumber/cucumber'
import {chromium, devices, webkit} from 'playwright'
import fs from 'fs'
setDefaultTimeout(60000)

Before(async function(scenario){
    //Printing sceanrio name in console
    console.log(`Running scenario: ${scenario.pickle.name}`);
    //Starting browser type depending on the cucumber tags (mobile or desktop)
    if(scenario.pickle.tags[0].name.includes('mobile')){
        const device = devices['iPhone 13'];
        this.driver = await chromium.launch({
            headless: false
        });
        this.context = await this.driver.newContext({
            ...device,
           recordVideo: {
                dir: `${process.cwd()}/videos`
            },
            //baseUrl: ''
        })
        this.page = await this.context.newPage();
    }else{
        this.driver = await chromium.launch({
            headless: false
        });
        this.context = await this.driver.newContext({
           recordVideo: {
                dir: `${process.cwd()}/videos`
            },
            //baseUrl: ''
        })
        this.page = await this.context.newPage();
    }
}) 

Before('@device', async function(){
    //experimental, not able to manage errors with timeouts trying to catch elements
    /*const iPhone = devices['iPhone 13'];
    const browser = await webkit.launch({headless: false});
    const context = await browser.newContext({
      ...iPhone
    });
    const page = await context.newPage();
    await page.setDefaultTimeout(5000)
    await page.goto('http://google.com');*/
})

After(async function(scenario){
    if(scenario.result?.status == 'PASSED'){
        //delete video
        const waitPromise = new Promise((resolve) => setTimeout(resolve, 5000));
        await Promise.race([
            this.page.video().delete(),
            waitPromise,
        ]).catch((error) => {
            console.error(`Error trying to delete the recorded video: ${error}`);
        })
        //log that scenario ran success
    }else{
        //take and attach screenshot
        this.attach(await this.page.screenshot(), 'image/png')
        //attach video in report
        const video = fs.readFileSync(await this.page.video().path())
        await this.attach(video, 'video/webm')
    }
    await this.page.close();
    await this.context.close();
    await this.driver.close();
})