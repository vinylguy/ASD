//Nathan Baker
//ASD Term 08/2012
//Project gold app JS file


$(document).ready(function(){
	//Site Code here...
	
});

//Existing Javascript from VFW and Miu
//saving form data w/ console preview
var parseReviewForm = function(data){
	console.log(data);
};

//Validator Functions
$(document).bind("pageinit", function(){
	var rcform = $('#courseReview');
	rcform.validate({
		invalidHandler: function(form, validator){},
		//Save to Local Storage
		submitHandler: function(){
			var data = rcform.serializeArray();
			//localStorage.setItem("formdata", data);
			storeData(data);
		}
	});
});

//Validator Functions edited
/*$(document).bind("pageinit", function(){
	var rcform = $('#courseReview');
	rcform.validate({
		invalidHandler: function(form, validator){},
		//Save to Local Storage
		submitHandler: function(){
			storeData();
		}
	});
});*/

//Below is Original VFW Code, Trying to re-factor to work with new form. 

//Wait until the DOM is loaded.
window.addEventListener("DOMContentLoaded", function () {

	function ge(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Select field element
	/*function makePar () {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "par");
		for(var i=0, j=parScore.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = parScore[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}*/
	
	//Find value of radio button
	function getSelectedRadio(){
		var radios = document.forms[0].targets
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
				targetsValue = radios[i].value;
			}
		}
	}

	//Checkbox Function	
	function getCheckBoxValue(){
		if(ge("favorite").checked){
			favoriteValue = ge("favorite").value;
		}else{
			favoriteValue = "No"
		}
	};

	//Toggle controls.
	function toggleControls(n){
		switch(n){
			case "on":
				ge("courseReview").style.display = "none";
				ge("clearLink").style.display = "inline";
				ge("displayLink").style.display = "none";
				ge("addNew").style.display = "inline";
				break;
			case "off":
				ge("courseReview").style.display = "block";
				ge("clearLink").style.display = "inline";
				ge("displayLink").style.display = "inline";
				ge("addNew").style.display = "none";
				ge("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Store Data
	function storeData(){
		if(ge("submit").value){
			var y = localStorage.length;
			var id = Math.floor(Math.random()*10000001);
		}else{
			var id = ge("submit").key;
		};
		//Pull form field values and store inside an object.
		getSelectedRadio();
		getCheckBoxValue();
		var item 				= {};
			item.select	 		= ["Par:", ge("par").value];
			item.cname 			= ["Course Name:", ge("cname").value];
			item.location		= ["Location:", ge("location").value];
			item.totalholes 	= ["Total Holes:", ge("totalholes").value];
			item.rname			= ["Reviewer Name:", ge("rname").value];
			item.reviewdate		= ["Review Date:", ge("reviewdate").value];
			item.targets 		= ["Target Type:", targetsValue];
			item.favorite		= ["Is a Favorite:", favoriteValue];
			item.courseRating 	= ["Course Rating:", ge("courseRating").value];
			item.comments		= ["Comments:", ge("comments").value];
		//Save data into local storage.
		localStorage.setItem(id, JSON.stringify(item));
		alert(ge("cname").value + " course review has been submitted.");
		window.location="#reviewcourse"
		window.location.reload();
	};
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage, so default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li")
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			getImage(obj.select[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //create edit and delete buttons
		}
	}
	
	//Get the image for the Par
	function getImage(parName, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSrc = newImage.setAttribute("src", "images/"+ parName + ".jpg");
		imageLi.appendChild(newImage);
	}
	
	//Make item Links
	function makeItemLinks(key, linksLi) {
		//add Edit item link
		var editLink = document.createElement("a");
		editLink.href = "#reviewcourse";
		editLink.key = key;
		var editText = "Edit Review";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add delete item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Review";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};
	
	//Auto Fill data when empty
	function autoFillData () {
		for (var n in json){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function editItem(){
		//get data from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show form
		toggleControls("off");
		
		ge("select").value = item.select[1];
		ge("cname").value = item.cname[1];
		ge("location").value = item.location[1];
		ge("totalholes").value = item.totalholes[1];
		ge("rname").value = item.rname[1];
		ge("reviewdate").value = item.reviewdate[1];
		var radios = document.forms[0].targets;
			for(var i=0; i<radios.length; i++){
				if(radios[i].value == "Baskets" && item.targets[1] == "Baskets"){
					radios[i].setAttribute("checked", "checked");
				}else if(radios[i].value == "Tones" && item.targets[1] == "Tones"){
					radios[i].setAttribute("checked", "checked");
				}else if(radios[i].value == "Objects" && item.targets[1] == "Objects"){
					radios[i].setAttribute("checked", "checked");
				}else if(radios[i].value == "Mixed" && item.targets[1] == "Mixed"){
					radios[i].setAttribute("checked", "checked");
				}
			}
			if(item.favorite[1] == "Yes"){
				ge("favorite").setAttribute("checked", "checked");
			}
		ge("courseRating").value = item.courseRating[1];
		ge("comments").value = item.comments[1];
		
		//remove initial listener from save contact button
		//save.removeEventListener("click", storeData);
		//change submit button value to say edit
		ge("submit").value = "Edit Review";
		var editSubmit = ge("submit");
		//save the key value of the editSubmit event
		//editSubmit.addEventListener("click", validator);
		editSubmit.key = this.key;
	};
	
	//Delete single review	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this review?");
			if(ask){
				localStorage.removeItem(this.key);
				alert("Review was deleted.");
				window.location.reload();
			}else{
				alert("Review was NOT deleted.");
			}
	};	
	
	//Clear Local Storage and confirm	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var check = confirm("Do you really want to erase reviews?");
				if(check){ 
				localStorage.clear();
				alert("All Reviews are deleted.");
				window.location.reload();
				return false;		
			};
		};
	};
	
	//VFW Javascript Validate Function, not needed.
	/*function validate(e){
		//define elements to check
		var getSelect  = $("select");
		var getCname  = $("cname");
		var getRname  = $("rname");	 
		
		//reset error message
		errMsg.innerHTML = "";
			getSelect.style.border = "1px solid black";
			getRname.style.border = "1px solid black";
			getCname.style.border = "1px solid black";
			
		//get error messages
		var messageArray = [];
		//select validation for par
		if(getSelect.value === "--Choose Par--"){
			var selectError = "Please choose a par.";
			getSelect.style.border = "1px solid red";
			messageArray.push(selectError);
		}
		
		//Reviewer name validation
		if(getRname.value === ""){
			var rNameError = "Please enter a Reviewer name.";
			getRname.style.border = "1px solid red";
			messageArray.push(rNameError);
		}
		
		//course name validation
		if(getCname.value === ""){
			var cNameError = "Please enter a Course name.";
			getCname.style.border = "1px solid red";
			messageArray.push(cNameError);
		}
		
		//reg exp, didn't have an email field for this.
		/*var regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(regExp.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageArray.push(emailError);
		}*/
		
		//if errors are present display on screen
		/*if(messageArray.length >= 1){
			for(var i=0, j=messageArray.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageArray[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//If valid, save data
			storeData(this.key);
		}	
	}*/

	var parScore = ["--Choose Par--", "Par3", "Par4", "Par5"],
		targetsValue
		favoriteValue = "No"
		errMsg = ge("errors");
	;
	
	//make par call from vfw	
	/*makePar();*/
	
	
	//Set link and Submit click events
	var displayLink = ge("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = ge("clearLink");
	clearLink.addEventListener("click", clearLocal);
	/*var save = ge("submit");
	save.addEventListener("click", parseReviewForm);*/


});