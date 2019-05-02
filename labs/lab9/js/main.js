/* global $ */

$(function() {
    $("#file-form").on("change submit", function(e) {
        let result = validateUpload();
        if (!result) e.preventDefault();
    });
});

function validateUpload() {
    let files = $("#upload")[0].files;
        let mb = 1048576;
        
        if (files.length == 0) {
            $("#max-size").addClass("text-muted").removeClass("text-danger");
            $("#upload-label").html("Choose an image...").addClass("text-danger").removeClass("text-primary");
            $("#btn-upload").attr("disabled", true);
            return false;
        }
        else if (files.length > 0 && files[0].size < mb) {
            $("#max-size").addClass("text-muted").removeClass("text-danger");
            $("#upload-label").html(`File: ${files[0].name} (${toKB(files[0].size)} KB)`).addClass("text-primary").removeClass("text-danger");
            $("#btn-upload").attr("disabled", false);
            return true;
        }
        else {
            $("#max-size").addClass("text-danger").removeClass("text-muted");
            $("#upload-label").html(`File: ${files[0].name} (${toMB(files[0].size)} MB)`).addClass("text-danger").removeClass("text-primary");
            $("#btn-upload").attr("disabled", true);
            return false;
        }
}

function toKB(bytes) {
    return (bytes / 1024).toFixed(2);
}

function toMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
}

function getGallery(gallery) {
    $("#photo-count").html(gallery.length);
    
    if (gallery.length == 0) {
        $("#gallery-empty").show();
        return;
    }
    
    $("#gallery-empty").hide();
    gallery.forEach(function(img) {
       $("#gallery").append(
            `<div class="mb-4">` +
                `<a href="${img}" target="_blank">` +
                    `<img src="${img}" class="img-thumbnail w-100"/>` +
                `</a>` +
            `</div>`
        );
    });
}