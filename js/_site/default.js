//back-to-top
$(function(){
    $("#back-to-top").hide();
    $(function(){
        $(window).scroll(function(){
            if($(window).scrollTop() > 100){
                $("#back-to-top").fadeIn(800);
            }
            else{
                $("#back-to-top").fadeOut("fast");
            }
        });
        $("#back-to-top").click(function(){
            $('body,html').animate({scrollTop:0}, 1000);
            return false;
        });
    });
})
