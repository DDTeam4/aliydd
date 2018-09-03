$.extend({
    StandardPost:function(url,args){
        var body = $(document.body),
            form = $("<form method='post'></form>"),
            input;
        form.attr({"action":url});
        $.each(args,function(key,value){
            input = $("<input type='hidden'>");
            input.attr({"name":key});
            input.val(value);
            form.append(input);
        });

        form.appendTo(document.body);
        form.submit();
        document.body.removeChild(form[0]);
    }
});


function mycreate(){
    console.log("mycreate()...");
    var name = $(".username").text();
    var idcard = $(".userid").text();
    $.StandardPost("/createhouse",{name:name,idcard:idcard});
}

function myquery(){
    console.log("myquery()...");
    var name = $(".username").text();
    console.log(name);
    $.StandardPost("/queryhousebyownerService",{name:name});
}

