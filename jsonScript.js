//File location of the json file
var fileLocation = "jsonData.json";






//Alumni search related functions
////////////////////////////////////////////////////////////////////////////////////////////////////
//Assist function for recreateTable(jsonObj)
//Creates the table using the variable created by getJSON
function createTable(jsonObj)
{
	createTableHeaders();
    var row_data = "";
    for(var i = 0; i < jsonObj.length; i++)
    {
		row_data ='<tr>' +
		'<td id=\'' + jsonObj[i].company + '\'' + 'onclick=\'search(this.id)\'>' + jsonObj[i].name + '</td>' +
		'<td>' + jsonObj[i].company + '</td>' +
		'<td>' + jsonObj[i].email + '</td>' +
		'</tr>';
		$("#tbody").append(row_data);
    }
}

//Assist function for createTable() to make the table headers for searching
function createTableHeaders()
{
	var headers = "<th scope=\"col\">Name</th>" +
                  "<th scope=\"col\">Company Name</th>" +
					"<th scope=\"col\">Email</th>";
	document.getElementById("tHeader").innerHTML = headers;
}

//Assist function for recreateTable(jsonObj)
//Used to bring back the base table code to switch back from displaying an alumni
function recreateBase()
{
	var base = "<table class=\"table\" id=\"alumniTable\">" +
					"<thead class=\"thead-dark\">" +
						"<tr id = \"tHeader\">" +
                        "</tr>" +
					"</thead>" +
						"<tbody id=\"tbody\">" +
                        "</tbody>" +
				"</table>"
	document.getElementById("divTable").innerHTML = base;
}

//Function to recreate the searching table with one function call
function recreateTable(jsonObj)
{
	recreateBase();
	createTable(jsonObj);
	sortTable();
}

//Alumni view related functions
////////////////////////////////////////////////////////////////////////////////////////////////////


function getCreateJSONAlumniTable(fileLocation, searchCompany)
{
	var xmlhttp = new XMLHttpRequest();
	//var url = "myTutorials.txt";

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jsonObj = JSON.parse(this.responseText);
			createAlumniTableBase();
			fillAlumniTable(jsonObj, searchCompany);
		}
	};
	xmlhttp.open("GET", fileLocation, true);
	xmlhttp.send();
}

//Prepares the table for input of alumni data
function createAlumniTableBase()
{
	var base = "<div class=\"container text-left\">" +
					"<div class=\"row\">" +
						"<div class=\"col-md-3\" id=\"alumniPic\">picturehere</div>" +
						"<div class=\"col-md-9 text-center\" id=\"alumniName\">nameHere</div>" +
					"</div>" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12\" id=\"alumniDesc\">selfDescHere</div>" +
					"</div>" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12\" id=\"alumniCompName\">companyNameHere</div>" +
					"</div>" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12\" id=\"alumniCompDesc\">companyDescriptionHere</div>" +
					"</div>"
				"</div>"
	document.getElementById("divTable").innerHTML = base;
}

function fillAlumniTable(jsonObj, searchCompany)
{
    var name = "";
	var picture = "";
	var email = "";
	var selfDesc = "";
	var compName = "";
	var compDesc = "";
	
    for(var i = 0; i < jsonObj.length; i++)
    {
		if(jsonObj[i].company == searchCompany)
		{
			name = jsonObj[i].name;
			picture = jsonObj[i].picture;
			//email = jsonObject[i].email;
			selfDesc = jsonObj[i].aboutme;
			compName = jsonObj[i].company;
			compDesc = jsonObj[i].cdesc;
			
		}	
    }
	document.getElementById("alumniPic").innerHTML = "<img height=\"100\" width=\"100\" src=" + picture + "</img>";
	document.getElementById("alumniName").innerHTML = name;
	document.getElementById("alumniDesc").innerHTML = selfDesc;
	document.getElementById("alumniCompName").innerHTML = compName;
	document.getElementById("alumniCompDesc").innerHTML = compDesc;
}

function search(searchCompany)
{
	clearTable();
	getCreateJSONAlumniTable(fileLocation, searchCompany);
}





function clearTable()
{
	document.getElementById("tHeader").innerHTML = ""; 
	document.getElementById("tbody").innerHTML = "";
}

////////////////////////////////////////////////////////////////////////////////////////////////////

//Function read the JSON file and make the table of all the alumni
//And then create and sort the table
function getCreateJSONTable(fileLocation)
{
	var xmlhttp = new XMLHttpRequest();
	//var url = "myTutorials.txt";

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jsonObj = JSON.parse(this.responseText);
			//myFunction(myArr);
			//createTable(jsonObj);
			//sortTable();
			recreateTable(jsonObj);
		}
	};
	xmlhttp.open("GET", fileLocation, true);
	xmlhttp.send();
}

//Sorts the table
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("alumniTable");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

//Creates the jsonObj to read from
//getCreateJSON(fileLocation);
getCreateJSONTable(fileLocation);


//var table = $("<table/>").attr("id", "mytable");