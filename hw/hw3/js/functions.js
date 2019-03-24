/* global $, localStorage */

$(function() {
    var userID;
    getUserID();
    var currentListID = null;
    var listName = $("input[name='list-name']");
    var listDesc = $("input[name='list-desc']");
    
    $("#add-list").on("click", function() {
        addList();
    });
    
    $("#add-item").on("click", function() {
        addListItem();
    });
    
    $("#lists").on("click", ".user-list", function() {
        let thisID = parseID($(this).attr("id"));
        /* Reload the current list only if it's not already loaded onto page */
        if (currentListID != thisID) {
            $(".list-selected").removeClass("list-selected");
            $(this).addClass("list-selected");
            currentListID = thisID;
            getList(currentListID);
        }
    });
    
    /* Auto-save on title, description, or list item change */
    $("input[name='list-name'], input[name='list-desc'], input[name='list-item']").on("change", function() {
        alert("Hi");
        updateList($("input[name='list-item']"));
    });
    
    /*** Helpers & UI functions ***/

    /* Extract list ID number from element ID string, otherwise returns null */
    function parseID(id) {
        let res = parseInt(id.replace(/[^0-9]/g, ""));
        return isNaN(res) ? null : res;
    }
    
    /* Adds a list to the UI and fills in its fields */
    function addList(list = null, index = null) {
        let id = "";
        let selected = "";
        let title = "New List";
        let desc = "Add a description";
        
        /* If a list object is provided, fill in its info */
        if (list) {
            id = list.listID;
            currentListID = id;
            title = list.listName;
            if (list.listDesc) desc = list.listDesc;
            if (index == 0) selected = "list-selected";
            getList(currentListID);
        }
        else {
            /* If a new note already exists, don't create another one */
            if ($("#user-list-new").length != 0) return;
            
            $(".list-selected").removeClass("list-selected");
            currentListID = null;
            id = "new";
            selected = "list-selected";
            addListItem();
        }
        
        $("#lists").html(
            `<div id="user-list-${id}" class="user-list ${selected} card mb-3">` +
                `<div class="card-body">` +
                    `<h4 id="list-title-${id}" class="list-title">${title}</h4>` +
                    `<p id="list-desc-${id}" class="list-desc text-muted mb-0">${desc}</p>` +
                `</div>` +
            `</div>` +
            $("#lists").html()
        );
    }
    
    /* Adds a list item to the UI */
    function addListItem(item = null, index = null) {
        let id = "new";
        let entry = "";
        
        /* if a parameter is given, list item is being retrieved from database */
        if (item) {
            id = item.itemID;
            entry = item.itemEntry;
            if (index == 0) $("#list-items").html("");
        }
        /* Otherwise, the user added a new list and should be initialized with one item */
        else if (currentListID == null) {
            listName.val("");
            listDesc.val("");
            $("#list-items").html("");
        }
        
        if ($("#list-item-new").length == 0) {
            $("#list-items").append(
                `<div id="list-item-${id}" class="input-group mb-3">` +
                    `<div class="input-group-prepend">` +
                        `<div class="input-group-text">` +
                            `<input id="li-status-${id}" type="checkbox">` +
                        `</div>` +
                    `</div>` +
                    `<input id="li-text-${id}" type="text" name="list-item" class="form-control">` +
                `</div>`
            );
            $(`#li-text-${id}`).val(entry);
        }
    }
    
    /*** AJAX Database Getters ***/
    
    /* Get the userID from localStorage or generate and save an ID if it doesn't exist, then get their lists */
    function getUserID() {
        if (localStorage.getItem("userID")) {
            userID = localStorage.getItem("userID");
            getLists();
        }
        else {
            $.ajax({
                type: "GET",
                url: "api/get-user.php",
                dataType: "json",
                success: function(data, status) {
                    userID = parseInt(data.userID);
                    localStorage.setItem("userID", userID);
                    getLists();
                }
            });
        }
    }
    
    function getList(listID) {
        $.ajax({
            type: "GET",
            url: "api/get-list.php",
            dataType: "json",
            data: {
                "list": listID
            },
            success: function(listItem, status) {
                if (listID) { // if the current list is in the database
                    listName.val(listItem[0].listName);
                    listDesc.val(listItem[0].listDesc);
                    
                    /* Passes the LIST ITEM, not the LIST ID to addListItem */
                    listItem.forEach(function(li, i) {
                        addListItem(li, i);
                    });
                }
                else {
                    listName.val("");
                    listDesc.val("");
                    addListItem();
                }
            }
        });
    }
    
    /* Gets the current user's lists from DB */
    function getLists() {
        $.ajax({
            type: "GET",
            url: "api/get-list.php",
            dataType: "json",
            data: {
                "user": userID,
            },
            success: function(lists, status) {
                if (lists.length > 0)
                    for (let i = 0; i < lists.length; i++)
                        addList(lists[i], i);
                else addList();
            }
        });
    }
    
    /*** AJAX Database Setters ***/
    
    /* Inserts the newly created list into the database if it doesn't exist, otherwise, updates it */
    function updateList(item = null) {
        $.ajax({
            type: "GET",
            url: "api/update-list.php",
            dataType: "json",
            data: {
                "list": currentListID,
                "user": userID,
                "title": listName.val(),
                "desc": listDesc.val(),
                "item": item.val()
            },
            success: function(list, status) {
                $("#user-list-new").prop("id", `user-list-${list.listID}`);
                $("#list-title-new").prop("id", `list-title-${list.listID}`);
                $("#list-desc-new").prop("id", `list-desc-${list.listID}`);
                
                $(`#list-title-${list.listID}`).html(list.listName);
                $(`#list-desc-${list.listID}`).html(list.listDesc);
                
                currentListID = list.listID;
            }
        });
    }
    
});