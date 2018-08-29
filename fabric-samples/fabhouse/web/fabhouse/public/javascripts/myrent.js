window.onload=function(){
            $.post("allcontract",{},function(data){
                        $("#mycontent").html(data);
            });
};

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



function torent(){
    console.log("torent()...");
    var name = $(".username").text();
    var idcard = $(".userid").text();
    $.StandardPost("/rent",{"name":name,"idcard":idcard});
}

function getContract(index){
    console.log("get contract()...");
    $("#title span").removeClass("active");
    $("#title span:eq("+index+")").addClass("active");
    switch(index){
        case 0:
            $.post("/allcontract",{},function(data){
                        $("#mycontent").html(data);
                        });
            break;
        case 1:
            $.post("/requestcontract",{},function(data){
                        $("#mycontent").html(data);
                        });
            break;
        case 2:
            $.post("/confirmcontract",{},function(data){
                        $("#mycontent").html(data);
                        });
            break;
        case 3:
            $.post("/finishcontract",{},function(data){
                        $("#mycontent").html(data);
                        });
            break;
    }
        
}
