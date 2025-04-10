Feature: Some API Test

  Scenario: Check response for acceptance criteria
    Given I send a GET request to the Categories service with parameters
      | catalogue | false |
    Then The response contains the following key-value data
      | Name      | Carbon credits |
      | CanRelist | true           |
    And The response should contain a Promotion named "Gallery" with a Description containing "Good position in category"
