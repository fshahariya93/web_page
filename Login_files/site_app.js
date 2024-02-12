jQuery(document).ready(function($) {
	
	/*var headerHome = $('#header').hasClass('headerHome');
	
	if(headerHome){
		// fixed navigation on scroll
		$(window).scroll(function () {
			var topHeight = 40;
			if ($(window).scrollTop() > topHeight) {
				$('#header.headerHome').addClass('navbarFixed');
			}
			if ($(window).scrollTop() < topHeight) {
				$('#header.headerHome').removeClass('navbarFixed');
			}
	 	});
	}*/
	
	$('.owl-carousel').owlCarousel({
	    loop:true,
	    autoplay:false,
	    margin:15,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    }
	})
	
	$('#supporterList').on('click', '.read-more', function() {
		var donateid = $(this).data('id');
		$(this).hide();
		$('.supporter-info .sm'+donateid).removeClass('supporter--comment');
	});
	
	getcampaign(0);

	$('#load_more_campaign').click(function(e){
		e.preventDefault();
		var page = $(this).data('val');
		getcampaign(page);

	});
	
	getusercampaign(0);

	$('#user_load_more_campaign').click(function(e){
		e.preventDefault();
		var page = $(this).data('val');
		getusercampaign(page);

	});
	//getcountry();	
	
	getcommentlist(0);

	$('#load_more_donate').click(function(e){
		e.preventDefault();
		var page = $(this).data('val');
		getcommentlist(page);

	});
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var getcampaign = function(page){
	$("#loader_campaign_text").css('display','none');
	$("#loader_campaign").css('display','inline-block');
	$.ajax({
		url:"http://bestworkhub.com/home/getloadcampaign",
		type:'GET',
		data: {page:page}
	}).done(function(response){
		$("#ajax_data_campaign").append(response);
		$("#loader_campaign").hide();
		$("#loader_campaign_text").show();
		$('#load_more_campaign').data('val', ($('#load_more_campaign').data('val')+1));
		scroll();
	});
};

var getusercampaign = function(page){
	$("#user_loader_campaign_text").css('display','none');
	$("#user_loader_campaign").css('display','inline-block');
	
	var user = getUrlParameter('user');
	
	$.ajax({
		url:"http://bestworkhub.com/photo/getuserloadcampaign",
		type:'GET',
		data: {page:page, username:user}
	}).done(function(response){
		$("#user_ajax_data_campaign").append(response);
		$("#user_loader_campaign").hide();
		$("#user_loader_campaign_text").show();
		$('#user_load_more_campaign').data('val', ($('#user_load_more_campaign').data('val')+1));
		scroll();
	});
};


var getcommentlist = function(page){
	$("#loader_donate_text").css('display','none');
	$("#loader_donate").css('display','inline-block');
	var camid = $('#supporterList').data('val');
	$.ajax({
		url:"http://bestworkhub.com/home/commentlists",
		type:'GET',
		data: {camid:camid, page:page}
	}).done(function(response){
		$("#supporterList").append(response);
		$("#loader_donate").hide();
		$("#loader_donate_text").show();
		$('#load_more_donate').data('val', ($('#load_more_donate').data('val')+1));
		scroll();
	});
};

/*var scroll  = function(){
	$('html, body').animate({
		scrollTop: $('#load_more_campaign').offset().top
	}, 1000);
};*/