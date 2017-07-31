function btnLogin() {
    var username = $("#userid").val();//user id
    var password = $("#password").val();//user pwd
    if (username.length == 0) {
        alert("username can't be empty");
        return;
    }
    if (password.length == 0) {
        alert("password can't be empty");
        return;
    }

    var myreg = /(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/;
    if (!myreg.test(username)) {
        alert('username is not valid,it must be a phone num');
        return;
    }
    var encryptedStr = CryptoJS.enc.Utf8.parse(password);
    var pwd = CryptoJS.enc.Base64.stringify(encryptedStr);
    var postData = JSON.stringify(
        {
            operatorUsername:username,
            operatorPassword:pwd
        }
    );

    //向后台发送处理数据
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        contentType: "application/json",
        async:false,
        url: '/v1/api/auth', //目标地址
        data: postData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("login fail!");
        },
        success: function (msg) {
            console.log(msg);
            var token = msg.token;
            localStorage.operatorName = msg.operatorUsername;
            localStorage.token = token;
            $.ajax({
                type: "GET",
                url:"/v1/api/dashboard",
                headers:{
                    "Authorization":token
                },
                success:function(html){
                  $("html").html(html);
                },
                error:function(){
                    alert("Server Err");
                }
            })
        }
    });
}