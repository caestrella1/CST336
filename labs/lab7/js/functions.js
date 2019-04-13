/* global $ */

function getCategories() {
    $.ajax({
        type: "GET",
        url: "../lab6/api/get-categories.php",
        dataType: "json",
        success: function(data, status) {
            data.forEach(function(cat) {
                $("#categories").append(`<option id="cat-${cat["catId"]}" value=${cat["catId"]}>${cat["catName"]}</option>`);
            });
        }
    });
}

function addProduct() {
    $.ajax({
        type: "GET",
        url: "api/edit-product.php",
        dataType: "json",
        data: {
            "name": $("#name").val(),
            "desc": $("#desc").val(),
            "price": $("#price").val(),
            "img": $("#img").val(),
            "cat": $("#categories").val(),
            "action": "add"
        }
    });
}

function updateProduct() {
    $.ajax({
        type: "GET",
        url: "api/edit-product.php",
        dataType: "text",
        data: {
            "productId": $("#id").html(),
            "name": $("#name").val(),
            "desc": $("#desc").val(),
            "price": $("#price").val(),
            "img": $("#img").val(),
            "cat": $("#categories").val(),
            "action": "update"
        },
        success: function() {
            $("#update-success").removeClass("d-none");
        }
    });
}

function getProductInfo(productID) {
    $.ajax({
        type: "GET",
        url: "api/get-product-info.php",
        dataType: "json",
        data: {
            "productId": productID
        },
        success: function(p) {
            $("#id").html(productID);
            $("#name").val(p.productName);
            $("#desc").val(p.productDescription);
            $("#img").val(p.productImage);
            $("#img-view").prop("src", p.productImage);
            $("#price").val(p.productPrice);
            $("#categories").val(p.catId);
        }
    });
}

function getProducts() {
    $.ajax({
        method: "POST",
        url: "api/get-products.php",
        dataType: "json",
        success: function(data,status) {
            data.forEach(function(product) {
            $("#products").append(
                `<div class="d-flex my-3 align-items-center">` + 
                    `<a class="btn btn-outline-primary mr-2" href='update.php?productId=${product.productId}'>Update</a>` +
                    `<form action="delete.php" method="post" onsubmit="return confirm('Are you sure you want to delete this item?')">` +
                        `<input name="productId" type="hidden" value="${product.productId}">` +
                        `<button class="m-delete btn btn-outline-danger mr-2">Delete</button>` +
                    `<a target="productIframe" onclick="openModal()" href="product.php?productId=${product.productId}">` +
                        `<span class="text-primary" style="cursor:pointer;" data-toggle="modal" data-target="#product-info">${product.productName}</span>` +
                    `</a>` +
                    `<span class="text-success font-weight-bold ml-2">$${product.productPrice}</span>`+
                `</div>`
                );
            });
        }
        
    });
}

function openModal(){
    $('#product-info').modal("show"); //opens the modal
}