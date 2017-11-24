var accounts = [];

// fetcheeeeeees json
fetch("./accounts.json")
.then(function(response)
{
    return response.json();
})
.then(function(accountsJson)
{
    accounts = accountsJson;
});

$(document).ready(function () {

    status();

    //login function in navbar
    $(".login").click(function(){

        var userUndPass = null;

        // LOOPS THRU JSONarray 2 CHECK IF USERNAME EXISTS
        $.each(accounts, function(index, value) {

            if ( value.username == $(".user").val() ){

                sessionStorage.user = $(".user").val();
                userUndPass = value;
                return false;

            }
            });

            console.log(userUndPass);

        if ( userUndPass != null && $(".pass").val() == userUndPass.password) {

            sessionStorage.loggedin = "true";
            sessionStorage.user = $(".user").val();
            status();

        }
        else {

            wrong();
         }
    });

    //function that calls if user + pass is right
    function right() {

        

        var text = $("<h1></h1>").text("Välkommen");

        $("#form").hide();
        $("#login").append("<button class='logout'>Logga ut</button>");
        $("#main").empty();
        $("#main").append(text);
        

        //logout function
        $(".logout").click(function(){
            sessionStorage.loggedin = "false";
            sessionStorage.user = "false";
            $("#form").show();
            $(".logout").hide();
            startpage();
        });


        list();

    }

    //function that calls if user or pass is wrong
    function wrong() {

        alert("Fel användarnamn eller Lösenord! ")
        $("#main").empty();
        $("#main").append("<p>Glömt lösenord eller användarnamn?!</p><a href='#'>Klicka här!</a>");
    }

    //checks status if logged in or not
    function status() {

         if (sessionStorage.loggedin == "true") {

            right();
        }

        else {

            startpage();
        }
    }

    //startpage
    function startpage() {

        $("#main").empty();
        $("#main").append("<h2>Hej och välkommen</h2>");
        $("#main").append("<p>Detta är en Todo sida, för att ta del av listan måste du logga in.</p>");

    }

    //function to loop the todo-list
    function list() {

        
      

        $("#main").append("<h4>Att göra:</h4>");
        $("#main").append("<ul class='stuffList'></ul>");

        var stuffToDo = [];

        
        if(localStorage.getItem(sessionStorage.user) == null){

            var stuffToDo = ["Klipp gräset",
            "Betala räkningar",
            "Köp mjölk",
            "Spika upp tavlor",
            "Rasta hundarna",
            "Ge hundarna mat",];

            localStorage.setItem(sessionStorage.user, JSON.stringify(stuffToDo));

            $.each(stuffToDo, function(index, value) {
                
                $(".stuffList").append("<li>" + value + "<i class='fa fa-check' aria-hidden='true'></i></li>");
                
                });
            }

        else{

            stuffToDo = JSON.parse(localStorage.getItem(sessionStorage.user));

            $.each(stuffToDo, function(index, value) {
                $(".stuffList").append("<li>" + value + "<i class='fa fa-check' aria-hidden='true'></i></li>");

                });
            }
            
          //creates inputform and button for the list
          $("#main").append("<input class='add' type='text'/>");
          $("#main").append("<button class='addBtn'>Lägg till</button>");

          
            hoverLi();
        //function to add things to list
          $(".addBtn").click(function(){

            $(".stuffList").empty();

            stuffToDo.push($(".add").val());
            localStorage.setItem(sessionStorage.user, JSON.stringify(stuffToDo));

            $.each(stuffToDo, function(index, value) {

                $(".stuffList").append("<li>" + value + " <i class='fa fa-check' aria-hidden='true'></i></li>");});
            
               hoverLi();
               $('.add').val("");

            });

              //function to delete from list
              $(".stuffList").on('dblclick', 'li', function() {
                var $entry = $(this);
                stuffToDo.splice($entry.index(), 1);
                $entry.remove();
                localStorage.setItem(sessionStorage.user, JSON.stringify(stuffToDo));
            }); 
    }

    //gets actuall date and time
    $('#date').text((new Date()).toLocaleDateString());


    //hoover function for listobjects
    function hoverLi(){

        $( "li" ).hover(
            function() {
             $(".fa-check", this).hide();
              $( this ).append( $( " <i class='fa fa-check-square-o' aria-hidden='true'></i>" ) );
            }, function() {
                $(".fa-check").show();  
              $( this ).find( "i:last" ).remove();
            });



    }

});










