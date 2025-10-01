Feature: ParaBank User Registration and Login

  Background:
    Given I navigate to the ParaBank website

  @registration @positive
  Scenario: Successful user registration
    When I click on the Register link
    And I fill out the registration form with valid details:
      | firstName | lastName | address     | city      | state | zipCode | phone        | ssn         | username  | password |
      | John      | Doe      | 123 Main St | Anytown   | CA    | 12345   | 555-123-4567 | 123-45-6789 | johndoe01 | password123 |
    And I submit the registration form
    Then I should see a successful registration message
    And I should be redirected to the account overview page

  @login @positive
  Scenario: Login with newly created account
    Given I have successfully registered a new account
    When I navigate to the login page
    And I enter my username and password
    And I click the Log In button
    Then I should be logged in successfully
    And I should see the account overview page

  @balance @positive
  Scenario: Verify account balance is displayed after login
    Given I have successfully registered and logged in
    When I view the account overview page
    Then I should see my account balance displayed
    And the balance amount should be visible and properly formatted

  @registration @negative
  Scenario: Registration with duplicate username
    Given a user with username "existinguser" already exists
    When I click on the Register link
    And I fill out the registration form with username "existinguser"
    And I submit the registration form
    Then I should see an error message indicating the username already exists

  @registration @negative
  Scenario Outline: Registration with missing required fields
    When I click on the Register link
    And I fill out the registration form but leave "<field>" empty
    And I submit the registration form
    Then I should see a validation error for the "<field>" field

    Examples:
      | field     |
      | firstName |
      | lastName  |
      | username  |
      | password  |

  @login @negative
  Scenario: Login with invalid credentials
    When I navigate to the login page
    And I enter invalid username "invaliduser" and password "wrongpass"
    And I click the Log In button
    Then I should see an error message indicating invalid credentials