function btnLogout() {
    var username = localStorage.operatorName;
    var token = localStorage.token;
    var url = "/v1/api/auth/"+username+"?token="+token;
    var href = window.location.href.split("/v1/")[0];
    //向后台发送处理数据
    $.ajax({
        type: "DELETE", //用DELETE方式传输
        dataType: "json", //数据格式:JSON
        contentType: "application/json",
        async:false,
        url: url, //目标地址
        complete: function (XMLHttpRequest, textStatus, errorThrown) {
            if(XMLHttpRequest.status == 200){
                localStorage.operatorName = "";
                localStorage.token = "";
                window.location.href=href+"/v1/api/login";
            }
            alert(XMLHttpRequest.responseText);
        }
    });
}