// A Leader object that holds the name and attributes of the given leader
function Leader()
{
    this.first = "";
    this.last = "";
    this.attributes = {"influence":4, "wealth":4, "might":4};
}

// Create a new leader
var currentLeader = new Leader();

// Set the attributes of the leader
currentLeader.first = "Richard";
currentLeader.last = "Evellian";
currentLeader.attributes.influence = 1;
currentLeader.attributes.wealth = 4;
currentLeader.attributes.might = 3;

$(function()
{
    displayLeaderInfo();

    // Displays the leader's information on the page
    function displayLeaderInfo()
    {
        $("#leaderName").text(currentLeader.first + " " + currentLeader.last);
        $("#leaderInf").text(currentLeader.attributes.influence);
        $("#leaderWealth").text(currentLeader.attributes.wealth);
        $("#leaderMight").text(currentLeader.attributes.might);
    }
});