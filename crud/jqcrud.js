$(function(){
    console.log("Script load");
    loadRecipe();
    $("#recipediv").on("click",".dltbtn", handledelete)
});
function handledelete(){
    var btn = $(this);
    var id = (btn.attr("data-id"));
     $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: loadRecipe,
    })
}
function loadRecipe(){
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        success: getrequestdata,
        error: handleError,
    });

    function handleError(){
        $("#recipediv").empty();
        $("#recipediv").html("Error on server");
       
    }
   
};
function getrequestdata(res){
    $("#recipediv").html("recipe loaded");
    $("#recipediv").empty();
    for(var i=0; i<res.length; i++){
       
      //  $("#recipediv").append("<div class = recipe><h3>"+ res[i].title +"</h3><p>"+ res[i].body +"</p></div>");
       $("#recipediv").append(`<div class = recipe><h3>${res[i].title},
       <button class = "btn btn-danger dltbtn " data-id=${res[i]._id}>
       Delete</button></h3><p>${res[i].body}</p></div>`);
    }
    
};
console.log("yess");