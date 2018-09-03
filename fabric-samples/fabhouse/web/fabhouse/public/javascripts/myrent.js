window.onload=function(){
            var customerid = $(".userid").text();
            $.post("/allcontract",{customerid:customerid},function(data){
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

function getCustomerContract(index){
    console.log("get contract()...");
    var customerid = $(".userid").text();
    console.log(customerid);
    $("#title span").removeClass("active");
    $("#title span:eq("+index+")").addClass("active");
    switch(index){
        case 0:
            console.log("liuqitestallcontract");
            $.post("/allcontract",{customerid:customerid},function(data){
                        $("#mycontent").html(data);
                        });
            break;
        case 1:
            $.post("/requestcontract",{customerid:customerid},function(data){
                        $("#mycontent").html(data);
                        });
            break;
        case 2:
            $.post("/confirmcontract",{customerid:customerid},function(data){
                        $("#mycontent").html(data);
                        });
            break;
        case 3:
            $.post("/finishcontract",{customerid:customerid},function(data){
                        $("#mycontent").html(data);
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

function check(index){
    var oid = $("#div"+index+" .ownerid").text();
    var cid = $("#div"+index+" .contractid").text();
    var ps = $("#div"+index+" .additional").text();
    console.log(oid+":"+cid+":"+ps);
    $.post("/getownerinfo",{ownerid:oid,contractid:cid,additional:ps},function(data){
                    console.log("load data success.");
                    $(".modal-content").html(data);
                    $("#div"+index+" .checkowner").click();
                });
}

function cancelcontract(){
    console.log("cancelcontract()...");
    var cid = $("#exampleModal .contractid").text();
    $.post("/cancelcontract",{contractid:cid},function(data){
                    alert("取消订单成功！");
                });
}

function confirmcontract(){
    console.log("cancelcontract()...");
    var cid = $("#exampleModal .contractid").text();
    $.post("/customerconfirmcontract",{contractid:cid},function(data){
                    $("#exampleModal .close").click();
                    alert("租房成功，可在成交合同里查看详细信息");
                });
}

function view(index){
    console.log("view()...");
    var oid = $("#div"+index+" .ownerid").text();
    var cid = $("#div"+index+" .contractid").text();
    var ps = $("#div"+index+" .additional").text();
    var hname = $("#div"+index+" .name").text();
    var hdes = $("#div"+index+" .description").text();
    var haddr = $("#div"+index+" .address").text();
    var uname = $(".username").text();
    var uid = $(".userid").text();
    var pp = $("#div"+index+" .price").text();
    console.log(uname+":"+uid+":"+hname+":"+hdes+":"+haddr+":"+ps+":"+oid);
    $.post("/viewcontract",{username:uname,userid:uid,housename:hname,housedescription:hdes,houseaddress:haddr,additional:ps,ownerid:oid,price:pp},function(data){
                    console.log("load data success.");
                    $(".modal-content").html(data);
                    $("#div"+index+" .checkcontract").click();
                });
}









