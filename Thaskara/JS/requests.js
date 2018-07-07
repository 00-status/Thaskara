

function getInformation(table)
{
    // Send a request for all leaders
    var data = { table: table};
    var url = "../scripts/retrieveData.php";

    var response = fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
        });

    console.log(response);
}

$(function ()
{
    $("#events").click(function () { getInformation("Leaders") });
});