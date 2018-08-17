// this file is for home.pug, created @ 0816

function signup(){
    console.log('signup ...');
    var idcard, name, phone, company, credit;
    idcard = $("#inputIDCard").val();
    name = $("#inputName").val();
    phone = $("#inputPhone").val();
    company = $("#inputCompany").val();
    credit = $("#inputCredit").val();
    console.log(idcard+":"+name+":"+phone+":"+company+":"+credit);

    $.post('/signup',{'idcard':idcard,'name':name,'phone':phone,'company':company,'credit':credit},function(data){
          $.get('/users');});
}


function query(){
    console.log('query...');
    $.get('/query');
}
