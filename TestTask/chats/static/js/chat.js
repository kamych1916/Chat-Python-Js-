var me = {};
me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

var you = {};
you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time){
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    var kek = 'Kamol';
    var lol = 'Nekit '

    if (who == "me"){
        control = '<li style="width:100%">' +
                        '<div style="word-wrap:break-word;float:left;background:whitesmoke;margin-top:15px;min-width:35%;max-width:80%;width:auto;border-radius:5px;padding:11px;display:flex; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);">' +
                            '<div class="text text-l">' +
                                '<p>' + '<small>'+ kek +'</small>' + ' ' + '<small>'+date+'</small></p>' +
                                '<p>'+ text +'</p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }else{
        control = '<li style="width:100%;">' +
                        '<div style="word-wrap:break-word;float:right; background:whitesmoke;margin-top:15px;min-width:35%;max-width:80%;width:auto;border-radius:5px;padding:5px;display:flex; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);">' +
                            '<div class="text text-r">' +
                                '<p>' + '<small>'+ lol +'</small>' + ' ' + '<small>'+date+'</small></p>' +
                                '<p>'+ text +'</p>' +
                            '</div>' +
                  '</li>';
    }
    setTimeout(
        function(){
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);

}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);
            $(this).val('');
        }
    }
});

$('.lol').click(function(){
    var text = $('.mytext').val();
        if (text !== ""){
            insertChat("me", text);
            $('.mytext').val('');
        }
})

//-- Clear Chat
resetChat();

//-- Print Messages
insertChat("me", "Hello Tom...", 0);
insertChat("you", "Hi, Pablo", 1500);
insertChat("me", "What would you like to talk about today?", 3500);
insertChat("you", "Tell me a joke",7000);
insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
insertChat("you", "LOL", 12000);


//-- NOTE: No use time on insertChat.