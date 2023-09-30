## Automation sample framework using playwright, cucumber and allure reports

    This framework is a sample to use playwright with cucumber and allure reports for automation testing purpouses. Is not builded with POM (Page Object Model) desing. Instanced, using cucumber gherking, the framework its trying to express in simple user actions the steps to make the frontend testing, saving a lot of code lines and files and working as live documentation for all teams that want to see and reproduce the test cases manually.

    This framework provide reports with screenshots and video records for all test cases failing and can test in mobile render or desktop just adding the tag "mobile" to the sceanario.

## How to run this framework?

    --Before make anythig please check you already have installed node in your system. You can check it running `node --version` in your command-line

    1)  Install al dependencies with `npm install`
    2)  Run `npm run test`. 
    
        --Running with tags
        If you want to run any particular tag please run `npm run test -- --tags "@tag"` Replace tag for the correct value.

        --Running mobile render
        This framework can run scenarios in both mobile render and deskptop applications. When we use the tag "@mobile" the framework will run this scenario in mobile render. Please add this tag to all scenarios you want run in mobile render in the features files.

        @mobile
        Scenario: Example
            Given.....

        Run the command to trigger the sceanrios. Remember you can add more than one tag to each scenario

    3) To generate the report please run `npx allure generate ./allure-results --clean``
    4) To open the report please run `npx allure open ./allure-report`