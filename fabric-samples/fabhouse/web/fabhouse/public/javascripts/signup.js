// this file is for signup.pug, created @ 0816

function signup(){
    console.log('signup ...');
    var idcard, name, phone, company, credit, type, password;
    idcard = $("#inputIDCard").val();
    name = $("#inputName").val();
    phone = $("#inputPhone").val();
    company = $("#inputCompany").val();
    credit = $("#inputCredit").val();
    password = $("#inputPassword").val();
    type = $("input[name='type']:checked").val();
    console.log(idcard+":"+name+":"+phone+":"+company+":"+credit+":"+type+":"+password);
    
    if(type=='customer'){
        console.log('to /customer'); 
        $.post('/signupService',{'idcard':idcard,'name':name,'phone':phone,'company':company,'credit':credit,'password':password},function(data){
            console.log('post success');
           // $.get('/customer');
            window.location.href="/customer"; 
            });
    }
    
    else {
         $.post('/signupService',{'idcard':idcard,'name':name,'phone':phone,'company':company,'credit':credit,'password':password},function(data){
            //$.get('/owner');
            window.location.href="/owner"; 
            });
       
    }
}


function signin(){
    console.log('signin ...');
    var idcard, password;
   
    idcard = $("#inputIDCard").val();
    password = $("#inputPassword").val();
    type = $("input[name='type']:checked").val();
    console.log("The type is :"+type);
    console.log("The idcard is :"+idcard);
   
    $("#loginform").submit();
}


function query(){
 /*   console.log('query...');
     $.post('/signinService',{'idcard':idcard},function(data){
            //$.get('/owner');
            window.location.href="/owner"; 
            });
       */
    $.get('/queryService');
}

function signuphouse(){
    console.log('signup house ...');
    var id, area, status, owner, user;
    id = $("#inputID").val();
    area = $("#inputArea").val();
    status = $("#inputStatus").val();
    owner = $("#inputOwner").val();
    user = $("#inputUser").val();
    console.log(id+":"+area+":"+status+":"+owner+":"+user);

    $.post('/signuphouseService',{'id':id,'area':area,'status':status,'owner':owner,'user':user},function(data){
        console.log('post success');
       // $.get('/customer');
        alert("房屋注册成功");
        }
    ).fail(function(jqXHR,textStatus,errorThrown){
                     console.log("error");
                     alert(jqXHR.responseText);
              });
}


function queryhouse(){
 /*   console.log('query...');
     $.post('/signinService',{'idcard':idcard},function(data){
            //$.get('/owner');
            window.location.href="/owner"; 
            });
       */
    $.get('/queryhouseService');
}