angular.module('app.controllers', [])
  
.controller('perfilCtrl', function($scope) {

})
   
.controller('buscadorCtrl', function($scope) {
	$("#tinderslide").jTinder({
		// dislike callback
		onDislike: function (item) {
			// set the status text
			$('#status').html('Dislike image ' + (item.index()+1));
			
			if(item.index() == 0){
				angular.element($('[ng-view]')).scope().mas();
			}
		},
		// like callback
		onLike: function (item) {
			// set the status text
			$('#status').html('Like image ' + (item.index()+1));
			if(item.index() == 0){
				angular.element($('[ng-view]')).scope().mas();
			}
		},
		animationRevertSpeed: 200,
		animationSpeed: 400,
		threshold: 1,
		likeSelector: '.like',
		dislikeSelector: '.dislike'
	});

	/**
	 * Set button action to trigger jTinder like & dislike.
	 */
	$('.actions .like, .actions .dislike').click(function(e){
		e.preventDefault();
		$("#tinderslide").jTinder($(this).attr('class'));
	});
})
   
.controller('conversacionesCtrl', function($scope) {

})
      
.controller('rankingCtrl', function($scope) {

})
   
.controller('preferenciasCtrl', function($scope) {

})
 