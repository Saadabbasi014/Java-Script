$(function() {
    // $("#updatebtn").hide();
    console.log("Script loaded");
    loadReceipe();
    $("#receipediv").on("click", ".deletebutton", handleDelete);
    $("#receipediv").on("click", ".updatebutton", handleUpdate);
    $("#addbtn").click(handleAdd);
    $("#updatebtn").click(sendAjaxUpdate);
});

function sendAjaxUpdate() {
    console.log("Send ajax PUT request");
    var title = $("#newTitle").val();
    var body = $("#newBody").val();
    var id = $("#hiddenid").html();
    console.log(id);

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "PUT",
        data: { title, body },
        success: function() {
            $("#newTitle").val("");
            $("#newBody").val("");
            $("#hiddenid").html("");
            $("#updatebtn").hide();

            loadReceipe();
        },
    });
}

function handleUpdate() {
    var btn = $(this);
    var id = btn.attr("data-id");

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "GET",
        // data: { title: t, body: b },
        success: function(response) {
            console.log(response);
            $("#newTitle").val(response.title);
            $("#newBody").val(response.body);
            $("#hiddenid").append(response._id);
            $("#updatebtn").show();
        },
    });
}

function handleAdd() {
    // var t = $("#newTitle").val();
    // var b = $("#newBody").val();
    var title = $("#newTitle").val();
    var body = $("#newBody").val();

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        // data: { title: t, body: b },
        data: { title, body },
        success: function() {
            $("#newTitle").val("");
            $("#newBody").val("");
            loadReceipe();
        },
        error: handleError,
    });
}

function handleDelete() {
    var btn = $(this);

    var id = btn.attr("data-id");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: loadReceipe,
    });
}

function loadReceipe() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        success: getRequestData,
        error: handleError,
    });
}

function handleError() {
    $("#receipediv").empty();
    $("#receipediv").html("Error on server");
}

function getRequestData(response) {
    $("#receipediv").empty();
    console.log(response);

    for (var i = 0; i < response.length; i++) {
        $("#receipediv").append(
            //`<div class = "receipe"><h3>${response[i].title}<button class="btn btn-success updatebutton float-right" data-id=${response[i]._id}>Update</button><button class="btn btn-danger deletebutton float-right" data-id=${response[i]._id}>Delete</button></h3><p>${response[i].body}</p></div>`
            `<div class = "receipe col-lg-4 col-md-6 col-11 pt-5">
            <div class="card-group">
            <div class="card bg-light" style="width: 18rem;">
            <div class="card-header">
           <h5 class="text-center"> Italian Fast Foods<h5/>
          </div>
  <div class="card-body">
    <h5 class="card-title text-center">${response[i].title}</h5>
    <p class="card-text text-center">>${response[i].body}</p>
    <button class="btn btn-success updatebutton " data-id=${response[i]._id}> Update</button>
    <button class="btn btn-danger deletebutton mx-auto" data-id=${response[i]._id}> Delete</button>

    </div>
    <div class=" card-footer">
    <small class="text-muted">Last updated 3 mins ago</small>
  </div>
  </div>
</div>`
            // "<div class = receipe><h3>" +float-right
            //   response[i].title +
            //   "</h3><p>" +
            //   response[i].body +
            //   "</p></div>"
        );
    }
}