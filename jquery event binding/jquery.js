$(function(){
    console.log("yesss1");
    $("addTodo").click(addLi());
    console.log("yesss2"); 
});

function addLi(){
    console.log("yesss3");
    var newTodo = $("#newTodo").val();

$("#todos").append("<li>"+ newTodo + "</li>");
};
console.log("yesss4");