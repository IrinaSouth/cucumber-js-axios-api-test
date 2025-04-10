const {Given, When, Then} = require("@cucumber/cucumber");

const { expect } = require('chai');
const axios = require("axios");

let response;

Given(/^I send a GET request to the Categories service with parameters$/, async (table) => {
    const params = table.rowsHash();
    let baseUrl = 'https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json'
    try {
        response = await axios.get(baseUrl, {params});
    } catch (err) {
        throw new Error(`GET request to "${baseUrl}" failed with status ${err.response?.status || 'unknown'}`);
    }
});
Then(/^The response contains the following key-value data$/, function(table) {
    const raw = table.rowsHash();
    const expected = {};

    // Convert "true"/"false" strings to booleans as Gherkin treats them as strings otherwise
    for (const [key, value] of Object.entries(raw)) {
        if (value.toLowerCase() === 'true') {
            expected[key] = true;
        } else if (value.toLowerCase() === 'false') {
            expected[key] = false;
        } else {
            expected[key] = value;
        }
    }

    expect(response.data).to.deep.include(expected);
});

Then('The response should contain a Promotion named {string} with a Description containing {string}', function (name, expectedText) {
    const promotions = response.data.Promotions;

    const promo = promotions.find(p => p.Name === name);

    expect(promo, 'Promotion with Name="${name}" not found').to.exist;
    expect(promo.Description, 'Description for Promotion "${name}" not found').to.exist;
    expect(promo.Description).to.include(expectedText);
});
