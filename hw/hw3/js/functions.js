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
        toggleSelect($(this));
    });
    
    /* Auto-save on title or description change */
    $(document).on("change", "input[name='list-name'], input[name='list-desc']", function() {
        if ($(this).val().length > 0) {
            if (currentListID) updateList();
            else createList();
        }
    });
    
    /* Auto-save on list item change */
    $(document).on("change", "input[name='list-item'], input[name='item-status']", function() {
        console.log($(this).attr("id"));
        let thisID = parseID($(this).attr("id"));
        
        thisID = (thisID) ? thisID : "new";
        let thisText = $(`#item-text-${thisID}`).val();
        let thisStatus = $(`#item-status-${thisID}`).is(":checked");
        
        if (thisID != "new") updateItem(thisID, thisText, thisStatus);
        else createItem(thisText, thisStatus);
    });
    
    /*** Helpers ***/

    /* Extract list ID number from element ID string, otherwise returns null */
    function parseID(id) {
        let res = parseInt(id.replace(/[^0-9]/g, ""));
        return isNaN(res) ? null : res;
    }
    
    function toggleSelect(element) {
        let thisID = parseID(element.attr("id"));
        /* Reload the current list only if it's not already loaded onto page */
        if (currentListID != thisID) {
            $(".list-selected").removeClass("list-selected");
            element.addClass("list-selected");
            currentListID = thisID;
            getList(currentListID);
        }
    }
    
    /*** HTML Structures ***/
    
    /* List structure with default parameters */
    function newList(id = "new", name = "Untitled List", desc = "Add a description") {
        return `<div id="user-list-${id}" class="user-list card mb-3">` +
                    `<div class="card-body">` +
                        `<h4 id="list-title-${id}" class="list-title">${name}</h4>` +
                        `<p id="list-desc-${id}" class="list-desc text-muted mb-0">${desc}</p>` +
                    `</div>` +
                `</div>`;
    }
    
    /* List item structure with default id */
    function newListItem(id = "new") {
        return `<div id="item-${id}" class="input-group mb-3">` +
                `<div class="input-group-prepend">` +
                    `<div class="input-group-text">` +
                        `<input id="item-status-${id}" type="checkbox" name="item-status">` +
                    `</div>` +
                `</div>` +
                `<input id="item-text-${id}" type="text" name="list-item" class="form-control">` +
            `</div>`;
    }
    
    /* Adds a list to the UI and fills in its fields */
    function addList(list = null) {
        
        /* If no list is given but there is already an empty list, don't do anything */
        if (!list && $("#user-list-new").length > 0) {
            return;
        }
        /* If no list is given and there is no empty list yet, create a new empty list */
        else if (!list) {
            $(".list-selected").removeClass("list-selected");
            currentListID = null;
            $("#lists").html(newList() + $("#lists").html());
            getList();
        }
        /* If a list is given, we are adding from the database */
        else {
            currentListID = list.listID;
            $("#lists").append(newList(list.listID, list.listName, list.listDesc));
        }
        
        /* The top-most list is automatically selected */
        if ($("#user-list-new").length > 0)
            $(".user-list").first().addClass("list-selected");
    }
    
    /* Adds a list item to the UI */
    function addListItem(item = null) {
        if (item) {
            $("#list-items").append(newListItem(item.itemID));
            $(`#item-text-${item.itemID}`).val(item.itemEntry);
            $(`#item-status-${item.itemID}`).prop("checked", (item.isDone == "1"));
        }
        else if (!item && $("#item-new").length == 0) {
            $("#list-items").append(newListItem());
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
                url: "api/user.php",
                dataType: "json",
                success: function(data, status) {
                    userID = parseInt(data.userID);
                    localStorage.setItem("userID", userID);
                    getLists();
                }
            });
        }
    }
    
    function getList(listID = null) {
        $.ajax({
            type: "GET",
            url: "api/list.php",
            dataType: "json",
            data: {
                "list": listID,
                "action": "get"
            },
            success: function(list, status) {
                if (listID) { // if the current list is in the database
                    listName.val(list.listName);
                    listDesc.val(list.listDesc);
                }
                else {
                    listName.val("");
                    listDesc.val("");
                }
                /* Empty the list before appending all items */
                $("#list-items").html("");
                getListItems(currentListID);
            }
        });
    }
    
    /* Gets the current user's lists from DB */
    function getLists() {
        $.ajax({
            type: "GET",
            url: "api/list.php",
            dataType: "json",
            data: {
                "user": userID,
                "action": "get"
            },
            success: function(lists, status) {
                if (lists.length > 0) {
                    lists.forEach(function(list) {
                        addList(list);
                    });
                    $(".user-list").first().addClass("list-selected");
                    listName.val(lists[0].listName);
                    listDesc.val(lists[0].listDesc);
                    
                    currentListID = lists[0].listID;
                    getListItems(currentListID);
                }
                else {
                    addList();
                }
            }
        });
    }
    
    function getListItems(listID = null) {
        $.ajax({
            type: "GET",
            url: "api/item.php",
            dataType: "json",
            data: {
                "list": listID,
                "action": "get"
            },
            success: function(items, status) {
                if (listID && items.length > 0) {
                    items.forEach(function(item) {
                        addListItem(item);
                    });
                }
                else {
                    addListItem();
                }
            }
        });
    }
    
    /*** AJAX Database Setters ***/
    
    function updateList() {
        $.ajax({
            type: "GET",
            url: "api/list.php",
            dataType: "json",
            data: {
                "list": currentListID,
                "user": userID,
                "title": listName.val(),
                "desc": listDesc.val(),
                "action": "update"
            },
            success: function(list, status) {
                $(`#list-title-${list.listID}`).html(list.listName);
                $(`#list-desc-${list.listID}`).html(list.listDesc);
            }
        });
    }

    function updateItem(itemID = null, item = null, status = false) {
        $.ajax({
            type: "GET",
            url: "api/item.php",
            dataType: "json",
            data: {
                "user": userID,
                "list": currentListID,
                "itemID": itemID,
                "item": item,
                "status": status,
                "action": "update"
            }
        });
    }
    
    /*** Create Database Entries ***/
    function createList() {
        $.ajax({
            type: "GET",
            url: "api/list.php",
            dataType: "json",
            data: {
                "list": currentListID,
                "user": userID,
                "title": listName.val(),
                "desc": listDesc.val(),
                "action": "create"
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
    
    function createItem(item = null, status = false) {
        $.ajax({
            type: "GET",
            url: "api/item.php",
            dataType: "json",
            data: {
                "user": userID,
                "list": currentListID,
                "item": item,
                "status": status,
                "action": "create"
            },
            success: function(list, status) {
                $("#item-new").prop("id", `item-${list.itemID}`);
                $("#item-text-new").prop("id", `item-text-${list.itemID}`);
                $("#item-status-new").prop("id", `item-status-${list.itemID}`);
            }
        });
    }
    
});