function btnPostFaceData() {
    var b64 = $("#b64");
    var result = $("#result");
    var gender = $("#gender");
    var age = $("#age");
    var beauty = $("#beauty");
    var ethnicity = $("#ethnicity");
    var return_attributes = "";
    if(gender[0].checked){
        return_attributes+="gender,"
    }
    if(age[0].checked){
        return_attributes+="age,"
    }
    if(beauty[0].checked){
        return_attributes+="beauty,"
    }
    if(ethnicity[0].checked){
        return_attributes+="ethnicity,"
    }

    var imgB64 = b64[0].innerHTML.split("base64,")[1];
    console.log(imgB64);
    return_attributes = return_attributes.slice(0,-1);
    var postData = JSON.stringify(
        {
          image_base64:imgB64,
          return_attributes:return_attributes
        }
    );
    // //向后台发送处理数据
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        contentType: "application/json",
        async:false,
        url: '/v1/api/facePlusPlus', //目标地址
        data: postData,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
        },
        success: function (msg) {
            result.text(msg);
        }
    });
}

function readFile() {

  if (this.files && this.files[0]) {

    var FR= new FileReader();

    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      document.getElementById("b64").innerHTML = e.target.result;
    });

    FR.readAsDataURL( this.files[0] );
  }

}

document.getElementById("image-file").addEventListener("change", readFile);