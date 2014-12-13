window.onload = function(){
	var elem = document.querySelector(".back-top");

	elem.addEventListener("click", function(event){
		event.preventDefault();
		setTimeout(function(){
			document.body.scrollTop = document.body.scrollTop - 200;

			if (document.body.scrollTop > 0) {
				setTimeout(arguments.callee, 50);
			}

		}, 50);
	}, false);

	document.addEventListener("scroll", function(){

		clearTimeout(tId);
		var tId = setTimeout(function(){
			if (document.body.scrollTop < 100) {
				elem.style.display = "none";
			}
			if (document.body.scrollTop >= 100){
				elem.style.display = "inline";
			}

		}, 200);	
	}, false);



};
	// elem.addEventListener("click", function(event){
	// 	event.preventDefault();
	    
	// 	var tId = setInterval(function(){
	// 		if (document.body.scrollTop < 0) {
	// 			clearInterval(tId);
	// 			console.log("stop");
	// 		}

	// 		document.body.scrollTop = document.body.scrollTop - 100;
			
	// 	},50);		
	// },false );

	
	// function throttle(method, context){
	//   clearTimeout(method.tId);

	//   method.tId = setTimeout(function(){
	//     method.call(context);
	//   }, 100);
	// }	

	// elem.addEventListener("click", scrollTop, false);

	// function scrollTop(event){
	// 	event.preventDefault();
	//     var scroll = document.body.scrollTop || document.documentElement.scrollTop;
	// 	throttle(function(){
	// 		setTimeout(function(){
	// 			scroll = scroll -10;
	// 		},100);
			
	// 	});			
	// }

	



// 事件对象、运动框架
// setTimeout setInterval
// var e = document.body.scrollTop;

// 注意区别【持续发生】和【间歇调用】