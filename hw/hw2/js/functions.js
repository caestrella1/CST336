/* global $ */

$(function() {
    var priceVal = $("#price");
    var priceCheckList = $("select[name='coin-list']#price-check");
    var convertToList = $("select[name='coin-list']#convert-from");
    var convertFromList = $("select[name='coin-list']#convert-to");
    var convertTo, convertToSymbol;
    var convertFrom, convertFromSymbol;
    
    loadCoins();
    getTop10();
    
    $("#toggle-symbol").on("click", function() {
        if ($("#toggle-symbol").is(':checked'))
            $(".coin-symbol").css("visibility", "visible");
        else
            $(".coin-symbol").css("visibility", "hidden");
    });
    
    $("#usd, #btc").on("click", function() {
       $("#usd, #btc").toggleClass("btn-success btn-outline-success");
       getCoin(priceCheckList.val(), $(".btn-success").val());
    });
    
    priceCheckList.on("change", function() {
        console.log("Change");
        getCoin(priceCheckList.val(), $(".btn-success").val());
    });
    
    $("#submit-convert").on("click", function() {
        convertCoin(convertFromList.val(), convertToList.val())
    });
    
    
    /* Load coin list into dropdowns */
    function loadCoins() {
        $.ajax({
            type: "GET",
            url: "https://api.coinmarketcap.com/v1/ticker/",
            dataType: "json",
            success: function(data, status) {
                for (let i = 0; i < data.length; i++) {
                    let cid = data[i].id;
                    let cname = data[i].name;
                    let csym = data[i].symbol;
                    
                    $(".coin-list").append(`<option value="${cid}">${cname} (${csym})</option>`);
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }

    /* Get coin for price tracker */
    function getCoin(coin, display) {
        $.ajax({
            type: "GET",
            url: "https://api.coinmarketcap.com/v1/ticker/" + coin + "/",
            dataType: "json",
            success: function(data, status) {
                let price = 0;
                if (display == "usd") {
                    price = parseFloat(data[0].price_usd).toFixed(2);
                    priceVal.html("$" + price);
                }
                else {
                    price = parseFloat(data[0].price_btc).toFixed(8);
                    priceVal.html(price + " BTC");
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    
    /* Get conversion for Convert tool */
    function convertCoin(to, from) {
        $.ajax({
            type: "GET",
            url: "https://api.coinmarketcap.com/v1/ticker/" + from + "/",
            dataType: "json",
            success: function(data, status) {
                convertFrom = parseFloat(data[0].price_usd);
                convertFromSymbol = data[0].symbol;
            },
            error: function(err){
                console.log(err);
            }
        });
        
        $.ajax({
            type: "GET",
            url: "https://api.coinmarketcap.com/v1/ticker/" + to + "/",
            dataType: "json",
            success: function(data, status) {
                convertTo = parseFloat(data[0].price_usd);
                convertToSymbol = data[0].symbol;
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    
    /* Load top 10 into card */
    function getTop10() {
        $.ajax({
            type: "GET",
            url: "https://api.coinmarketcap.com/v1/ticker/",
            dataType: "json",
            success: function(data, status) {
                for (let i = 0; i < 10; i++) {
                    let name = data[i].name;
                    let sym = data[i].symbol;
                    let cap = parseInt(data[i].market_cap_usd).toLocaleString();
                    let change = data[i].percent_change_24h;
                    let link = `https://coinmarketcap.com/currencies/${data[i].id}`;
                    
                    $("#top-10-table").append(`<tr>
                        <td class="font-weight-bold">${i + 1}</td>
                        <td><a href="${link}" target="_blank">${name} <span class="coin-symbol">(${sym})</span></td>
                        <td>$${cap}</td>
                        <td class="text-right"><span id="change-${i + 1}" class="font-weight-bold text-white">${change}%</span></td>
                    </tr>`);
                    
                    let temp = $(`#change-${i + 1}`);
                    
                    if (parseFloat(change) < 0)
                        temp.addClass("bg-danger");
                    else if (parseFloat(change) > 0)
                        temp.addClass("bg-success");
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    
    /* Run calculations AFTER ajax calls all finish */
    $( document ).ajaxStop(function() {
        if (!isNaN(convertTo) && !isNaN(convertFrom)) {
            let amount = $("#convert-amount").val();
            
            $("#is-worth").html(`${amount} ${convertFromSymbol} is worth`);
            
            let res = ((convertFrom * amount) / convertTo).toFixed(8);;
            $("#convert-result").html(res);
            $("#res-unit").html(convertToSymbol);
        }
    });
});