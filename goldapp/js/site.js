//Nathan Baker
//ASD Term 08/2012 week 1

/* Unused 
$(function(){

	var navList = $('#nav li')
		.fadeOut()
		.fadeIn()
		.animate({fontSize:30},1000)
	;

	$()  <--  jQuery Factory

});
*/

$(document).ready(function(){
	//Site Code here...

	//Validator Functions 1
		$(document).bind("pageinit", function(){
		var rcform = $('#courseReview');
		rcform.validate({
			invalidHandler: function(form, validator){},
			//Save to Local Storage
			submitHandler: function(form, data){
			
				var data = rcform.serializeArray();
				
				$.each(data, function(i, obj){
					localStorage.setItem(obj.name, obj.value);
				
				});
			},
		});
	});
});