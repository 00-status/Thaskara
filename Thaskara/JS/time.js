
$(function ()
{
    // The various speeds that the game can run at in milliseconds
    let speed = {"slow":2000, "medium":1000, "fast":330};
    // The speed that the game is currently at. It will start at medium
    var currentSpeed = speed.medium;

    // A boolean that determines if the game is paused
    var paused = false;

    var day = 1;
    var month = 1;
    var year = 3034;



    // Constants
    // The last month of the year
    const END_MONTH = 8;
    const START_MONTH = 1;
    const MIDDLE_MONTH = 3;
    // Constants for the amount of days in a month
    const MEDIUM_MONTH = 46;
    const LONG_MONTH = 47;


    // Time Set up
    // Increment the date
    var dateIncrement = setInterval(increment, currentSpeed);
    // Set the current date as the page loads.
    dateString = day + " / " + month + " / " + year + ":ANG";
    $("#dateTime").text(dateString);


    // Functions
    function increment()
    {
        // Create a string to hold the finished date
        var dateString = "";

        // Check if it is the end of the month
        if (day == LONG_MONTH && month == START_MONTH) // First month
        {
            incrementMonth();
        }
        else if (month == END_MONTH && day == LONG_MONTH) // Last month
        {
            // Increment the year
            year++;
            // Set the days and months back to one
            month = 1;
            day = 1;
        }
        else if (day == MEDIUM_MONTH && month == MIDDLE_MONTH) // Middle Month
        {
            incrementMonth();
        }
        else if (day == 45 && (month != END_MONTH && month != START_MONTH && month != MIDDLE_MONTH)) // Regular Months
        {
            // If the day is 45 and it isn't a special month then increment the month.
            incrementMonth();
        }
        else
        {
            // Increment the day
            day++;
        }

        dateString = day + " / " + month + " / " + year + ":ANG";

        $("#dateTime").text(dateString);
    }

    function incrementMonth()
    {
        // Increment the month
        month++;
        // Reset the days back to one
        day = 1;

        // Tells the 'resources' script to add the resources for the given month
        addResources();
        // Tells the 'factions' script to decay faction loyalty and influence for the month.
        factionDecay();
    }

    // Function for pausing time
    function togglePause()
    {
        if (paused)
        {
            // If the game is paused, then unpause it at the current speed.
            dateIncrement = setInterval(increment, currentSpeed);
            // Change the glyph to a pause button
            $("#togglePause").html('<i class="pause icon"></i>');
            paused = false;
        }
        else
        {
            // If the game is not paused, then clear the dateIncrement variable
            clearInterval(dateIncrement);
            // Change the glyph to a play button
            $("#togglePause").html('<i class="play icon"></i>');
            paused = true;
        }


    }
    function decrementSpeed() 
    {
        // Check what speed we're on
        // If we aren't on the slowest speed, then slow the time down.
        if (currentSpeed == speed.fast)
        {
            currentSpeed = speed.medium;
        }
        else
        {
            currentSpeed = speed.slow;
        }
        resetTimer();
    }
    function incrementSpeed()
    {
        // Check what speed we are on
        // If we aren't at the highest speed, then increment the speed
        if (currentSpeed == speed.slow)
        {
            currentSpeed = speed.medium;
        }
        else
        {
            currentSpeed = speed.fast;
        }
        resetTimer();
    }

    function resetTimer()
    {
        clearInterval(dateIncrement);
        dateIncrement = setInterval(increment, currentSpeed);
    }


    // Event Listeners
    // Slower
    $("#decrementSpeed").click(decrementSpeed);
    // Pause
    $("#togglePause").click(togglePause);
    // Faster
    $("#incrementSpeed").click(incrementSpeed);
});