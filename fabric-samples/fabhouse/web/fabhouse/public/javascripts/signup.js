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
    console.log("The idcard is :"+idcard);
   
    $("#loginform").submit();

    /* old version--- use ajax.post to post data to the back end, there are some problem in redirecting to a new page. 
    if(type=='customer'){
        console.log('to /customer'); 

        $.post('/queryoneService',{'idcard':idcard,'password':password},
               function(data){
                          console.log('post success');
                          $("body").html(data);
               }
       ).fail(function(jqXHR,textStatus,errorThrown){
                   console.log("error");
                   alert(jqXHR.responseText);
       });

    }
    
    else {
         $.post('/queryoneService',{'idcard':idcard,'password':password},function(data){
           // $.get('/owner');
//           window.location.href="/owner"; 
            });
       
    }
    */
    /* test version--- use ajax to post a form data to the backend,there are
    if(type=='customer'){
        $.ajax({
            type:'post',
            url:'queryoneService',
            data:$("#loginform").serialize(),
            dataType:'json',
            success:function(data){
                          console.log('post success');
                //          $("body").html(data);
                    },
            error:function(jqXHR,textStatus,errorThrown){
                   console.log("error"+textStatus);
                   alert(jqXHR.responseText);
                    } 
        }); 
    }
    */

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
