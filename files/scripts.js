function uploaded(x) {
    $(".determinate").width(x + "%");
    if (x === 100){
        M.toast({html: 'Processing Image'});
    }
}


$('#x-image').change(function () {
    $("#upload-bar").show();
    $("#input-image").hide();
    let data_img = new FormData();
    data_img.append('img', $("#x-image")[0].files[0]);
    data_img.append('csrfmiddlewaretoken', $('#csrf-token').val());
    $.ajax({
        url: "/",
        type: "POST",
        data: data_img,
        contentType: false,
        cache: false,
        processData: false,
        xhr: function () {
            let jqXHR = null;
            if (window.ActiveXObject) {
                jqXHR = new window.ActiveXObject("Microsoft.XMLHTTP");
            } else {
                jqXHR = new window.XMLHttpRequest();
            }
            jqXHR.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    let percentComplete = Math.round((evt.loaded * 100) / evt.total);
                    uploaded(percentComplete);
                }
            }, false);
            return jqXHR;
        },
        success: function (data) {
            $("#result").text(data['data']);
            $("#upload-bar").hide();
            $("#input-image").show();
        },
        error: function () {
            M.toast({html: 'Something Went Wrong'});
            $("#upload-bar").hide();
            $("#input-image").show();
        }
    });
});