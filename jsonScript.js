//document.getElementById("innerText").innerHTML = "My First Javascript";

var table = "<table id=\"alumniTable\" class=\"table\">";
var row_data = "";

for(var i = 0; i < jsonObj.length; i++)
{
        row_data ='<tr>' +
        '<td>' + jsonObj[i].name + '</td>' +
        '<td>' + jsonObj[i].email + '</td>' +
        '<td>' + jsonObj[i].company + '</td>' +
        '</tr>';
        $("#tbody").append(row_data);
}

//var table = $("<table/>").attr("id", "mytable");