Feature: Sample framework set-up

    This feature shows how can you automate with cucumber and playwright using traditional Page Object Model (POM) and user step-by-step definitions.

    Scenario: User step-by-step definition
        Given Im in page "Google"
        When I write "peito" in "search"
        And I press "Enter"
        Then I verify the page contains "/search"

    Scenario: Traditional Page Object Model
        Given I open the page "https://google.com.ar"
        When I search in google "peito"
        Then I verify the page contains "/search"

    @mobile
    Scenario: User step-by-step definition
        Given Im in page "Google"
        When I write "peito" in "search"
        And I press "Enter"
        Then I verify the page contains "/search"
