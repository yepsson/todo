
sessionStorage.userName = "test";
sessionStorage.passWord = "password";

$(document).ready(function () {

    status();

    
    //login function in navbar
    $(".login").click(function(){

        if ($(".user").val() == sessionStorage.userName && $(".pass").val() == sessionStorage.passWord) {

            sessionStorage.loggedin = "true";
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

        var stuffToDo = ["Klipp gräset",
            "Betala räkningar",
            "Köp mjölk",
            "Spika upp tavlor",
            "Rasta hundarna",
            "Ge hundarna mat",];

        localStorage.setItem("stuffToDo", JSON.stringify(stuffToDo));
        stuffToDo = JSON.parse(localStorage.getItem("stuffToDo"));
        
        $(".stuffList").on('dblclick', 'li', function() {
            var $entry = $(this);
            stuffToDo.splice($entry.index(), 1);
            $entry.remove();
        });
       
            
        $.each(stuffToDo, function(value, index) {
            $(".stuffList").append("<li>" + index + "</li>");

            
          });
          
          $("#main").append("<input class='add' type='text'/>");
          $("#main").append("<button class='addBtn'>Lägg till</button>");
  
          $(".addBtn").click(function(){
            stuffToDo.push($(".add").val());
             //$().add($(".add").val());
             console.log($(".add").val());
              });

         

    }
    //gets actuall date and time
    document.getElementById("date").innerHTML = Date();

});










