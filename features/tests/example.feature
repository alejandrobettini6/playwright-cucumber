Feature: Sample

    This feature show you how can you build a test scenario using user-steps definition that works as live-documentation
    for all team members and make easy to reproduce the scenarios manually. Also make easier write scenarios and its maintenance.

    @only
    Scenario: Sign up spotify
        Given Im in page "spotify"
        When I write "myemail@gmail.com" in "email"
        And I write "myFakePwd123!" in "password"
        And I write "Alejandro" in "name"
        And I write "14" in "day"
        And I select "Abril" in dropdown "month"
        And I write "1992" in "year"
        And I select "Hombre" in radio button "gender"
        And I check "share my data"
        And I click "sign up"
        Then I verify that element "email error message" contains text "Este correo electrónico ya está conectado a una cuenta"
