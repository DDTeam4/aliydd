$(document).ready(function(){
    $(".select-no").hide();
	$("#select1 dd ").click(function () {
//        window.district = $("select1 dd a").index(this);
//        console.log($("select1 dd a").index(this));
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectA").remove();
		} else {
			var copyThisA = $(this).clone();
			if ($("#selectA").length > 0) {
				$("#selectA a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisA.attr("id", "selectA"));
			}
		}
	});
	
	$("#select2 dd").click(function () {
//        window.duration = $("select2 dd").index(this);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectB").remove();
		} else {
			var copyThisB = $(this).clone();
			if ($("#selectB").length > 0) {
				$("#selectB a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisB.attr("id", "selectB"));
			}
		}
	});
	
	$("#select3 dd").click(function () {
//        window.gender = $("select3 dd").index(this);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectC").remove();
		} else {
			var copyThisC = $(this).clone();
			if ($("#selectC").length > 0) {
				$("#selectC a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisC.attr("id", "selectC"));
			}
		}
	});
	
	$("#selectA").delegate("click", function () {
		$(this).remove();
		$("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
	});
	
	$("#selectB").delegate("click", function () {
		$(this).remove();
		$("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
	});
	
	$("#selectC").delegate("click", function () {
		$(this).remove();
		$("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
	});
	/*
	$(".select dd").delegate("click", function () {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	*/
});

function createInfo(){
    console.log("createInfo()...");

    var infoid = $("#infoid").val();
    var name = $("#name").val();
    var description = $("#description").val();
    var address = $("#address").val();
    var credit = $("#credit").val();
    var district = $("#district").val();
    var duration = $("#duration").val();
    var gender = $("#gender").val();
    var ownerid = $("#ownerid").val();
    
    console.log(infoid+":"+name+":"+description+":"+address+":"+credit+":"+district+":"+duration+":"+gender+":"+ownerid);

    $.post("/createInfoService",{"infoid":infoid, "name":name, "description":description, "address":address, "credit":credit, "district":district, "duration":duration, "gender":gender, "ownerid":ownerid},function(data){
    	console.log('rent house success');
    	 window.location.href="/rentsuccess"; 
        }
    ).fail(function(jqXHR,textStatus,errorThrown){
                     console.log("error");
                     alert(jqXHR.responseText);
              });

}

function queryInfo(){
    console.log("queryInfo()...");

    var district = $("#select1 dd").index($("#select1 .selected"));
    var duration = $("#select2 dd").index($("#select2 .selected"));
    var gender = $("#select3 dd").index($("#select3 .selected"));
    console.log(district+":"+duration+":"+gender);

    $.post("/queryInfoService",{"district":district, "duration":duration, "gender":gender},function(data){
                $("#houseContent").html(data);
                });
}

/*function queryOwnerContract(){
    console.log("queryOwnerContract()...");

    var district = $("#select1 dd").index($("#select1 .selected"));
    var duration = $("#select2 dd").index($("#select2 .selected"));
    var gender = $("#select3 dd").index($("#select3 .selected"));
    console.log(district+":"+duration+":"+gender);

    $.post("/queryOwnerContractService",{"ownerid":ownerid, "status":status},function(data){
                $("#houseContent").html(data);
                });
}*/

function submitPrice(){
    console.log("submitPrice()...");
    price = $("#price").val();
    var mydate = new Date();
    time = mydate.toLocaleDateString();
    status = 1;
    additional = "";
    console.log(price+housename+time+status);
    $.post('/createcontract',{contractid:contractid,housename:housename,housedescription:housedescription,houseaddress:houseaddress,ownerid:ownerid,customerid:customerid,status:status,price:price,time:time,additional:additional},function (data){
                $(".closemodal").click();
                console.log("callback() success");
                alert("申请成功！具体信息请到我的租房查看");
                });

}


function want(index){
    console.log("want()..."+index);
    console.log($("#li"+index+" .infoid").html());
    housedescription = $("#li"+index+" .description").text();
    housename = $("#li"+index+" .name").text();
    houseaddress =$("#li"+index+" .address").text();
    customerid = $(".userid").text();
    contractid = $("#li"+index+" .contractid").text();
    ownerid = $("#li"+index+" .ownerid").text();
    console.log(contractid+":"+housename+":"+housedescription+":"+houseaddress+":"+customerid+":"+ownerid);
}

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



function tomyrent(){
    console.log("to myrent()..."); 
    var name = $(".username").text();
    var idcard = $(".userid").text();
    $.StandardPost("/myrent",{name:name,idcard:idcard}); 
}

function toownerrent(){
    console.log("to ownerrent()..."); 
    var name = $(".username").text();
    var idcard = $(".userid").text();
    $.StandardPost("/ownerrent",{name:name,idcard:idcard}); 
}

