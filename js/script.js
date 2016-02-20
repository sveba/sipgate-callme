// Mixing jQuery and Node.js code in the same file? Yes please!

$(function(){
    const ipcRenderer = require('electron').ipcRenderer;
    var hash, registerSip, caller, username;

    $('#call').on('click', call);
    $('#save').on('click', save);
    $('#props').on('click', switchDialogs);

    ipcRenderer.on('settings-loaded', function(event, data) {
        hash = data.hash;
        registerSip = data.registerSip;
        caller = data.caller;
        username = data.username;
        $('#username').val(username);
        $('#caller').val(caller);
        $('#registerSip').val(registerSip);
        $('#callerNr').text("Deine Telnr: " + caller);

        $.ajaxSetup({
            headers: { 'Authorization': "Basic " + hash }
        });

        $('#calling').hide();
        switchDialogs();
    });

    function switchDialogs() {
        $('#calling').toggle();
        $('#settings').toggle($('#calling').is(":hidden"));
    }

    function load(){
        ipcRenderer.send('settings-load');
    }

    function save() {
        var password = $('#password').val();
        username = $('#username').val();
        registerSip = $('#registerSip').val();
        caller = $('#caller').val();
        hash = btoa(username + ':' + password);

        var settings = {
            'hash': hash,
            'username': username,
            'caller': caller,
            'registerSip': registerSip
        };

        ipcRenderer.send('settings-save', settings);

        load();
    }


    function call() {
        var data = {
            'callee': 'tel:' + '49' + $('#callee').val().substr(1),
            'caller': 'tel:' + '49' + caller.substr(1),
            'registerSip': registerSip,
            'version': '2.37.0'
        };

        $.ajax({
            type: 'POST',
            url: 'https://api.sipgate.net/my/sessions/calls/',
            data: data,
            success: function() {
                $('#status').text('Calling');
            }
        });
    }

    load();

});



