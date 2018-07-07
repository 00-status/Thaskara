

// CONSTANTS
// The base loyalty and influence that factions will decay (and grow) to.
const LOYALTY_BASE = 50;
const INFLUENCE_BASE = 60;



// VARIABLES AND OBJECTS
// A JS object to represent a faction
function Faction(factionID, name, loyalty, influence, taxLevel, enabled)
{
    this.factionID = factionID;
    this.name = name;
    this.loyalty = loyalty;
    this.influence = influence;
    this.taxLevel = taxLevel;
    this.enabled = enabled;
}

// An array to hold the various functions
var factions = createFactions();
// The faction that is being used. (or was used last)
var currentFaction = new Faction();



// FUNCTIONS
// Refreshes all of the factions' loyalty and influence.
function refreshAttributes()
{
    for (var i = 0; i < factions.length; i++)
    {
        $("#" + factions[i].factionID + "Loyalty").text(factions[i].loyalty);
        $("#" + factions[i].factionID + "Influence").text(factions[i].influence);
    }
}

// Applies the decay and growth for every faction's influence and loyalty
function factionDecay()
{
    // Loyalty Decay and growth
    for (var i = 0; i < factions.length; i++)
    {
        if (factions[i].loyalty > LOYALTY_BASE - factions[i].taxLevel)
        {
            factions[i].loyalty -= 1;
        }
        else if (factions[i].loyalty < LOYALTY_BASE - factions[i].taxLevel)
        {
            factions[i].loyalty += 1;
        }

        // Influence Decay and growth

        if (factions[i].influence > INFLUENCE_BASE)
        {
            factions[i].influence -= 1;
        }
        else if (factions[i].influence < INFLUENCE_BASE)
        {
            factions[i].influence += 1;
        }
    }

    refreshAttributes();
}

function createFactions()
{
    var importedFactions = new Array();

    // Create the three base factions
    importedFactions.push(new Faction("AR", "Aristocrats", LOYALTY_BASE, LOYALTY_BASE, 10, true));
    importedFactions.push(new Faction("LO", "Lords", LOYALTY_BASE, LOYALTY_BASE, 10, true));
    importedFactions.push(new Faction("CL", "Clergy", LOYALTY_BASE, LOYALTY_BASE, 10, true));
    importedFactions.push(new Faction("MG", "Mage's Guild", LOYALTY_BASE, LOYALTY_BASE, 10, false));


    return importedFactions;
}

// Changes the taxes of the current faction by a given amount
function changeTaxes(amount)
{
    if (!(currentFaction.taxLevel + amount > 100) && !(currentFaction.taxLevel + amount < 1))
    {
        currentFaction.taxLevel += amount;
    }

    for (var i = 0; i < factions.length; i++)
    {
        if (currentFaction.factionID == factions[i].factionID)
        {
            factions[i].taxLevel = currentFaction.taxLevel;
        }
    }

    // Update the display
    $("#factionTax").text(currentFaction.taxLevel);
}
// Calculate the amount of taxes each faction owes
function factionTaxes()
{
    var totalTaxIncome = 0;
    // Add each enabled faction's taxes to the total taxIncome
    for (var i = 0; i < factions.length; i++)
    {
        if (factions[i].enabled)
        {
            totalTaxIncome += factions[i].taxLevel / 100;
        }
    }

    // set the tax income
    return +(totalTaxIncome.toFixed(2));
}


// INITIAL DISPLAY
$(function()
{
    // Print out each faction to the page
    // Create some html for each faction
    $("#factionRows").html(createHtml());

    function createHtml()
    {
        var html = "";

        for (var i = 0; i < factions.length; i++)
        {
            if (factions[i].enabled)
            {
                html += '<tr id="' + factions[i].factionID + '" class="factionRow">' +
                    '<td id="'+ factions[i].factionID + 'Name">' + factions[i].name + '</td>' +
                    '<td id="'+ factions[i].factionID + 'Loyalty">' + factions[i].loyalty + '</td>' +
                    '<td id="'+ factions[i].factionID + 'Influence">' + factions[i].influence + '</td>' +
                    '</tr>';
            }
        }

        return html;
    }

    function factionInteraction(id)
    {
        currentFaction = new Faction();

        for (var i = 0; i < factions.length; i++)
        {
            if (factions[i].factionID == id)
            {
                currentFaction.factionID = factions[i].factionID;
                currentFaction.name = factions[i].name;
                currentFaction.loyalty = factions[i].loyalty;
                currentFaction.influence = factions[i].influence;
                currentFaction.taxLevel = factions[i].taxLevel;
            }
        }

        // Change the html of the modal
        // Change Title
        $("#eventHeader").text(currentFaction.name);
        // Change body
        $("#eventContent").html('<h4 class="ui header">Taxes</h4>' +
            '<div class="ui buttons">' +
            '<button id="factionMinusTax" class="ui grey icon button"><i class="minus icon"></i></button>' +
            '<button id="factionTax" class="ui blue disabled button">' + currentFaction.taxLevel + '</button>' +
            '<button id="factionAddTax" class="ui grey icon button"><i class="plus icon"></i></button>' +
            '</div>');
        // Change buttons
        $("#eventActions").html('<div class="ui black ok labeled icon button"><i class="close icon"></i>Close</div>');



        // Set the event handlers for the tax buttons
        $("#factionMinusTax").click(function ()
        {
            // Modify the faction taxes
            changeTaxes(-5);
        });
        $("#factionAddTax").click(function ()
        {
            // Modify the faction taxes
            changeTaxes(5);
            // Update the monthly tax income
            updateTaxes(factionTaxes());
        });
    }


    // Startup Event handlers
    $(".factionRow").click(function()
    {
        // get the id
        displayClosableModal();
        factionInteraction($(this).attr("id"));
    });

});