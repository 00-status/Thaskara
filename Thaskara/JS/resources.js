
// The sum for the three basic resources.
var totalInfluence = 0;
var totalWealth = 0;
var totalMight = 0;

// Monthly resource income
// Base resource income
var baseIncome = 1;
var taxIncome = 0;

// Functions
function addResources()
{
    // Add the monthly resource income to the totals
    // In addition to the base income the leader's base attributes are also added
    // These atttributes are retrieved from the 'leader.js' script.
    totalInfluence += baseIncome + currentLeader.attributes.influence;
    totalWealth += baseIncome + taxIncome + currentLeader.attributes.wealth;
    totalMight += baseIncome + currentLeader.attributes.might;

    // Display the resource totals on the page
    $("#totalInfluence").text(totalInfluence);
    $("#totalWealth").text(totalWealth);
    $("#totalMight").text(totalMight);
}
function updateTaxes(amount)
{
    taxIncome = amount;
}


// Startup stuff.
$(function ()
{
    // Set the initial resource values
    $("#totalInfluence").text(totalInfluence);
    $("#totalWealth").text(totalWealth);
    $("#totalMight").text(totalMight);
});

