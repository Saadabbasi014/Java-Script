$(function() {
    console.log("JS loaded");
    loadapis();
    $("#table").on("click", ".removebtn", handleDelete);
    $("#table").on("click", ".updatebtn", handleUpdate);
    $("#add").on("click", handleAdd);
    $("#update").on("click", ajaxUpdate);
});

function ajaxUpdate() {
    console.log("ajax requst update");
    var name = $("#name").val();
    var gender = $("#gender").val();
    var age = $("#age").val();
    var city = $("#city").val();
    var id = $("#hidden").val();
    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person/" + id,
        data: { name, gender, age, city },
        method: "PUT",
        success: function() {
            $("#name").val("");
            $("#gender").val("");
            $("#age").val("");
            $("#city").val("");

            loadapis();
        },
    });
    location.reload();

}

function handleUpdate() {
    var id = $(this).attr("data-id");
    // console.log(id);
    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person/" + id,
        method: "GET",
        success: function(res) {
            console.log(res)
            var name = $("#name").val(res.name);
            var gender = $("#gender").val(res.gender);
            var age = $("#age").val(res.age);
            var city = $("#city").val(res.city);
            var id = $("#hidden").val(res._id);


        }

    })


}


function handleAdd() {
    console.log("yesss");
    var name = $("#name").val();
    var gender = $("#gender").val();
    var bolgen;
    if (gender == "male")
        bolgen = true;
    else
        bolgen = false;
    var age = $("#age").val();
    var city = $("#city").val();
    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person",
        data: { name, gender: bolgen, age, city },
        method: "POST",
        success: function() {
            $("#name").val("");
            $("#gender").val("");
            $("#age").val("");
            $("#city").val("");

            loadapis();
        },

    });
}

function handleDelete() {
    var btn = $(this);
    var id = (btn.attr("data-id"));
    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person/" + id,
        method: "DELETE",
        success: loadapis,
    })
    location.reload();

}

function loadapis() {
    $.ajax({
        url: "https://haseeb-apis.herokuapp.com/api/person",
        method: "GET",
        success: getPerson,
    });
}

function getPerson(person) {
    console.log(person);
    for (var i = 0; i < person.length; i++) {
        $("#table").append(`

        <tr><td>${person[i].name}</td>
        <td>${person[i].gender}</td>
        <td>${person[i].age}</td>
        <td>${person[i].city}</td>
        <td><button class ="btn btn-danger removebtn  m-1" data-id=${person[i]._id}>Remove
        </button><button class ="btn btn-info updatebtn m-1"data-id=${person[i]._id} >Update</button></td></tr>`);
    }

}