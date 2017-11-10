/*!
 * SharePointFormSubmit
 *
 * Jan 17, 2011 Alex Sadomov
 * Edited Nov 9, 2017 Katrina Fox
 * 
 * http://sadomovalex.blogspot.com/2011/01/submit-html-form-using-content-editor.html
 * 
*/

(function($){
		$(document).ready(function(){
		$.fn.SharePointFormSubmit = function(element,method,action, target) {
		alert("got into the SPFS code");
         var e; // new input element
         var URL;
         var f = document.createElement("form"); // form
             f.method = method;
             f.action = action;
			 f.target = target;			 
             f.setAttribute("style","display:none");
			 alert("Created Form");
  
             $(element).find("input").each (function(){
                 e = document.createElement("input")
                URL = action + "?" + $(this).attr("name") + "=" + $(this).val();
                alert(URL);
             });
			 alert(URL);
			 alert("Ending Form");
             var newWin = window.open(URL);
			 alert("submitted Form");
     };
 });})(jQuery);