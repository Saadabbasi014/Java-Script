$(function() {
    loadRecipies();
});

function loadRecipies() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        success: function(res) {
            console.log(res);
            var res = $("#recipies").empty();
            for (var i = 0; i < res.length; i++);
            res.append(`<div><h3>${res[i].title},
            <button class = "btn btn-danger dltbtn " ${res[i]._id}>
            Delete</button></h3><p>${res[i].body}</p></div>`);

        }
    });
}

console.log("yes");