
// Good resource for tabs
// https://stackoverflow.com/questions/21769214/using-the-tab-control-in-semantic-ui


$(function ()
{
    $(document).ready(function ()
    {
        $('.demo.menu .item').tab({ history: false });
    });

    // For modal regular events
    $("#event").click(displayModal);
});


function displayModal()
{
    $('.ui.modal')
        .modal('setting', 'closable', false)
        .modal('setting', 'transition', 'vertical flip')
        .modal('show');
};

function displayClosableModal()
{
    $('.ui.modal')
        .modal('setting', 'closable', true)
        .modal('setting', 'transition', 'scale')
        .modal('show');
}





