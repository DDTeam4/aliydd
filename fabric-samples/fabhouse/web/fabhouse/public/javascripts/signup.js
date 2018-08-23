// this file is for signup.pug, created @ 0816

function signup(){
    console.log('signup ...');
    var idcard, name, phone, company, credit, type;
    idcard = $("#inputIDCard").val();
    name = $("#inputName").val();
    phone = $("#inputPhone").val();
    company = $("#inputCompany").val();
    credit = $("#inputCredit").val();
    type = $("input[name='type']:checked").val();
    console.log(idcard+":"+name+":"+phone+":"+company+":"+credit+":"+type);
    
    if(type=='customer'){
        console.log('to /customer'); 
        $.post('/signupService',{'idcard':idcard,'name':name,'phone':phone,'company':company,'credit':credit},function(data){
            console.log('post success');
           // $.get('/customer');
            window.location.href="/customer"; 
            });
    }
    
    else {
         $.post('/signupService',{'idcard':idcard,'name':name,'phone':phone,'company':company,'credit':credit},function(data){
            //$.get('/owner');
            window.location.href="/owner"; 
            });
       
    }
}


function signin(){
    console.log('signin ...');
    var id;
   
    idcard = $("#inputIDCard").val();
    type = $("input[name='type']:checked").val();
    console.log("The idcard is :"+idcard);
    
    if(type=='customer'){
        console.log('to /customer'); 

        $.post('/queryoneService',{'idcard':idcard},
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
         $.post('/queryoneService',{'idcard':idcard},function(data){
           // $.get('/owner');
//           window.location.href="/owner"; 
            });
       
    }

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
