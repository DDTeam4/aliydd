window.onload=function(){
            var ownerid = $(".userid").text();
            $.post("allcontract-owner",{ownerid:ownerid},function(data){
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
            $.post("/confirmcontract-owner",{customerid:customerid},function(data){
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

function ownercheck(index){
    var cuid = $("#div"+index+" .customerid").text();
    var owid = $("#div"+index+" .ownerid").text();
    var coid = $("#div"+index+" .contractid").text();
 //   var ps = $("#div"+index+" .additional").text();
    console.log("The customerid is :"+cuid+" ,the contractid is :"+coid);
    $.post("/getcustomerinfo",{customerid:cuid,contractid:coid},function(data){
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

function ownerconfirmcontract(){
    console.log("confirmcontract()...");
    var cid = $("#exampleModal .contractid").text();
    $.post("/ownerconfirmcontract",{contractid:cid},function(data){
                    $("#exampleModal .close").click();
                    alert("处理订单成功！");
                });
}



function ownerview(index){
    console.log("view()...");
    var oid = $("#div"+index+" .customerid").text();
    var cid = $("#div"+index+" .contractid").text();
    var ps = $("#div"+index+" .additional").text();
    var hname = $("#div"+index+" .name").text();
    var hdes = $("#div"+index+" .description").text();
    var haddr = $("#div"+index+" .address").text();
    var uname = $(".username").text();
    var uid = $(".userid").text();
    var pp = $("#div"+index+" .price").text();
    console.log(uname+":"+uid+":"+hname+":"+hdes+":"+haddr+":"+ps+":"+oid);
    $.post("/viewownercontract",{username:uname,userid:uid,housename:hname,housedescription:hdes,houseaddress:haddr,additional:ps,ownerid:oid,price:pp},function(data){
                    console.log("load data success.");
                    $(".modal-content").html(data);
                    $("#div"+index+" .checkcontract").click();
                });
}










