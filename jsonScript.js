//File location of the json file
var fileLocation = "jsonData.json";

function applyHoverCSS()
{
	var css = 'tbody tr:hover{ background-color: #fff2e6 }';
	var style = document.createElement('style');

	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} 
	else 
	{
		style.appendChild(document.createTextNode(css));
	}

	document.getElementsByTagName('tbody')[0].appendChild(style);
}




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
		row_data ='<tr id=\'' + jsonObj[i].company + '\'' + 'onclick=\'search(this.id)\' style=\'hover\'>' +
		'<td>' + jsonObj[i].name + '</td>' +
		'<td>' + jsonObj[i].company + '</td>' +
		'<td>' + jsonObj[i].email + '</td>' +
		'</tr>';
		$("#tbody").append(row_data);
    }
	applyHoverCSS();
	page(jsonObj);
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
	var search = "<br/>" + 
				"<input type=\"text\" id=\"searchTextBox\"/>" +
				"<button type=\"button\" class=\"btn btn-warning\" style=\"color:white;margin-left:10px;\" onclick=\"findByName()\">Search</button>" +
				"<br/>"; 
	
	var base = "<div style=\"padding-top:10px;padding-bottom:10px;\">" +
					"<table class=\"table\" id=\"alumniTable\">" +
						"<thead style=\"background-color:#F4B540;color:white;\">" +
							"<tr id = \"tHeader\">" +
							"</tr>" +
						"</thead>" +
						"<tbody id=\"tbody\">" +
                        "</tbody>" +
					"</table>" +
					"<div class=\"pagination\" id=\"pagination\">" +
					"</div>" +
				"</div>";
	document.getElementById("divTable").innerHTML = search + base;
}





//Function to recreate the searching table with one function call
function recreateTable(jsonObj)
{
	recreateBase();
	createTable(jsonObj);
	sortTable();
}


//Functions to produce table searched by name
//////////////////////////////////////////////////////////////////////
function findByName()
{
	var name = document.getElementById("searchTextBox").value;
	getCreateJSONTableSearch(fileLocation, name);
	document.getElementById("searchTextBox").value = name;
	
}

function getCreateJSONTableSearch(fileLocation, name)
{
	var xmlhttp = new XMLHttpRequest();
	//var url = "myTutorials.txt";

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jsonObj = JSON.parse(this.responseText);
			recreateSearchTable(jsonObj, name);
		}
	};
	xmlhttp.open("GET", fileLocation, true);
	xmlhttp.send();
}

function createSearchTable(jsonObj, name)
{
	createTableHeaders();
    var row_data = "";
    for(var i = 0; i < jsonObj.length; i++)
    {
		if(jsonObj[i].name.search(name) != -1)
		{
			row_data ='<tr id=\'' + jsonObj[i].company + '\'' + 'onclick=\'search(this.id)\' style=\'hover\'>' +
			'<td>' + jsonObj[i].name + '</td>' +
			'<td>' + jsonObj[i].company + '</td>' +
			'<td>' + jsonObj[i].email + '</td>' +
			'</tr>';
			$("#tbody").append(row_data);
		}
    }
	applyHoverCSS();
	page(jsonObj);
}

function recreateSearchTable(jsonObj, name)
{
	recreateBase();
	createSearchTable(jsonObj, name);
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
	var base = "<div style=\"border:2px solid #ffcc66;border-radius:5px;margin-top:10px;margin-bottom:10px;padding-top:10px;padding-bottom:10px;\" class=\"container text-left\">" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12 text-center\" id=\"backBtn\">" +
							"<button type=\"button\" class=\"btn btn-warning\" style=\"color:white;margin-bottom:10px\" onclick=\"getCreateJSONTable(fileLocation)\">Back</button>" +
						"</div>" +
					"</div>" +
					"<hr/>" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12 text-center\">" + "<h5 class=\"text-center\">About Me</h5>" + 
						"</div>" +
					"</div>" +
					"<div class=\"row\">" +
						"<div style=\"border: 2px solid #ffcc66;border-radius:5px;margin-left: 10px;\" class=\"col-xs-3\" id=\"alumniPic\">picturehere</div>" +
						"<div style=\"padding:20px;font-weight:bold;\" class=\"col-xs-9\" id=\"alumniName\">nameHere</div>" +
					"</div>" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12 \" id=\"alumniDesc\">selfDescHere</div>" +
					"</div>" +
					"<hr/>" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12 text-center\">" + "<h5 class=\"text-center\">My Company</h5>" + 
						"</div>" +
					"</div>" +
					"<div class=\"row\">" +
						"<div style=\"border: 2px solid #ffcc66;border-radius:5px;margin-left: 10px;\" class=\"col-xs-3\" id=\"alumniCompPic\">picturehere</div>" +
						"<div style=\"padding:30px;font-weight:bold;\" class=\"col-xs-9\" id=\"alumniCompName\">companyNameHere</div>" +
					"</div>" +
					"<div class=\"row\">" +
						"<div class=\"col-md-12\" id=\"alumniCompDesc\">companyDescriptionHere</div>" +
					"</div>" +
				"</div>";
	document.getElementById("divTable").innerHTML = base;
}

//Fills the bootstrap table created by createAlumniTableBase() when given the json object and the name of the company is used to search
function fillAlumniTable(jsonObj, searchCompany)
{
    var name = "";
	var picture = "";
	var email = "";
	var selfDesc = "";
	var compName = "";
	var compLogo = "";
	var compDesc = "";
	
    for(var i = 0; i < jsonObj.length; i++)
    {
		if(jsonObj[i].company == searchCompany)
		{
			name = jsonObj[i].name;
			picture = jsonObj[i].picture;
			email = utf8.encode(jsonObj[i].email);
			selfDesc = jsonObj[i].aboutme;
			compName = jsonObj[i].company;
			compLogo = jsonObj[i].clogo;
			compDesc = jsonObj[i].cdesc;
			
		}	
    }
	document.getElementById("alumniPic").innerHTML = "<img height=\"300\" width=\"300\" src=\"" + picture + "\"/>";
	document.getElementById("alumniName").innerHTML = name + "<br/>" + email;
	document.getElementById("alumniDesc").innerHTML = selfDesc;
	document.getElementById("alumniCompName").innerHTML = compName;
	document.getElementById("alumniCompPic").innerHTML = "<img height=\"200\" width=\"200\" src=\"" + compLogo + "\"/>";
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

//paing

function page(jsonObj){ 

	$('table').each(function() {
	var pagesu = 7;  //page number
	var currentPage = 0;
	var numPerPage = 10;  //number of list
	var $table = $(this);    
	var pagination = $("#pagination");

	//length of all list
	var numRows = jsonObj.length;

	//Math.ceil
	var numPages = Math.ceil(numRows / numPerPage);

	if (numPages==0) return;
	//div for page
	var $pager = $('<div class="pager"></div>');
	var nowp = currentPage;
	var endp = nowp+10;

	//reset page
	$table.bind('repaginate', function() {
	//hide page if list.length < page +1
	$table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
	$("#pagination").html("");

	if (numPages > 1) {     //more than one page

		if (currentPage < 3 && numPages-currentPage >= 3) {   // if less than 3p
			nowp = 0;     // 1to
			endp = pagesu;    // 7
		}
		else{
			nowp = currentPage -3;  // over 3 add move page num
			endp = nowp+pagesu;   // up to 7
			pi = 1;
		}

		if (numPages < endp) {   // less than 7
			endp = numPages;   // up to last page num
			nowp = numPages-pagesu;  // start page - last page
		}

		if (nowp < 1) {     
			nowp = 0;     // start from page 1
		}

	}
	else{       // less than 1 page
		nowp = 0;      // create one page
		endp = numPages;
	}

	// bigin
	$('<span class="pageNum first"><<</span>').bind('click', {newPage: page},function(event) {
	currentPage = 0;   
	$table.trigger('repaginate');  
	$($(".pageNum")[2]).addClass('active').siblings().removeClass('active');
	}).appendTo(pagination).addClass('clickable');

	// before
	$('<span class="pageNum back"><-</span>').bind('click', {newPage: page},function(event) {
	if(currentPage == 0) return; 

	currentPage = currentPage-1;
	$table.trigger('repaginate'); 
	$($(".pageNum")[(currentPage-nowp)+2]).addClass('active').siblings().removeClass('active');
	}).appendTo(pagination).addClass('clickable');

	// [1,2,3,4,5,6,7,8]
	for (var page = nowp ; page < endp; page++) {
		$('<span class="pageNum"></span>').text(page + 1).bind('click', {newPage: page}, function(event) {
		currentPage = event.data['newPage'];
		$table.trigger('repaginate');
		$($(".pageNum")[(currentPage-nowp)+2]).addClass('active').siblings().removeClass('active');
		}).appendTo(pagination).addClass('clickable');
	} 

	// next
	$('<span class="pageNum next">-></span>').bind('click', {newPage: page},function(event) {
	if(currentPage == numPages-1) return;

	currentPage = currentPage+1;
	$table.trigger('repaginate'); 
	$($(".pageNum")[(currentPage-nowp)+2]).addClass('active').siblings().removeClass('active');
	}).appendTo(pagination).addClass('clickable');

	// end
	$('<span class="pageNum last">>></span>').bind('click', {newPage: page},function(event) {
	currentPage = numPages-1;
	$table.trigger('repaginate');
	$($(".pageNum")[endp-nowp+1]).addClass('active').siblings().removeClass('active');
	}).appendTo(pagination).addClass('clickable');

	$($(".pageNum")[2]).addClass('active');
	});

	$pager.insertAfter($table).find('span.pageNum:first').next().next().addClass('active');   
	$pager.appendTo(pagination);
	$table.trigger('repaginate');
	});

}
////////////////////////////////////////////////////////////////////////////////////////////////////

//Creates the jsonObj to read from
getCreateJSONTable(fileLocation);
