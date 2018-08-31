window.onload=function(){
            $.post("allcontract",{},function(data){
                        $("#ownercontent").html(data);
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


function getContract(index){
    console.log("get contract()...");
    var customerid = $(".userid").text();
    console.log(customerid);
    console.log("liuqitesthere");
    $("#title span").removeClass("active");
    $("#title span:eq("+index+")").addClass("active");
    switch(index){
        case 0:
            $.post("/allcontract-owner",{customerid:customerid},function(data){
                        $("#ownercontent").html(data);
                        });
            break;
        case 1:
            $.post("/requestcontract-owner",{customerid:customerid},function(data){
                        $("#ownercontent").html(data);
                        });
            break;
        case 2:
            $.post("/confirmownercontract",{customerid:customerid},function(data){
                        $("#ownercontent").html(data);
                        });
            break;
        case 3:
            $.post("/finishownercontract",{customerid:customerid},function(data){
                        $("#ownercontent").html(data);
                        });
            break;
    }
        
}


function cancel(index){
    console.log("cancel()..."+index);
    var cid = $("#div"+index+" .contractid").text();
    console.log(cid);
    var flag = confirm("确定取消后将无法撤销！");
    console.log(flag);

    if(flag){
        $.post("/cancelcontract",{contractid:cid},function(data){
            alert("取消订单成功！");
            $("#div"+index).css("display","none");
        });
    }
}

function ownerconfirm(){
            alert("确定处理！");
}


















