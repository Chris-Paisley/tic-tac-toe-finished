$(document).ready(function() {
    let x;
    let o;
    let turn;
    let moveCount;
    var startGame;
    var win;
    var flag;

    //Collect all the td of the table 
    var sp1 = $('#squ1');
    var sp2 = $('#squ2');
    var sp3 = $('#squ3');
    var sp4 = $('#squ4');
    var sp5 = $('#squ5');
    var sp6 = $('#squ6');
    var sp7 = $('#squ7');
    var sp8 = $('#squ8');
    var sp9 = $('#squ9');
    
    //Hold all possible wins
    const winHere = 
        [[sp1, sp2, sp3], 
        [sp4, sp5, sp6], 
        [sp7, sp8, sp9],
        [sp1, sp4, sp7],
        [sp2, sp5, sp8],
        [sp3, sp6, sp9],
        [sp1, sp5, sp9],
        [sp3, sp5, sp7]
    ];
   
    function reset () {
        x = '';
        o = '';
        turn = 0;
        moveCount = 0;
        startGame = false;
        win = false;
        flag = true;
        return;
    }
    
    function setUp () {
        reset();
        newGame();
    }   
    
    setUp();
    
    
    function newGame () {
        //make two players type in there names
            //press choose to go to choose x or o
        $(document).on('click', '#myBtn', function() {
            if($('#player1').val() != "" && $('#player2').val() != "") {
                $("#wholeForm").hide();
                let capName = $("#player1").val();
                let capName2 = $("#player2").val();
                $(".pName").text(capName.charAt(0).toUpperCase() + capName.slice(1));
                $(".p2Name").text(capName2.charAt(0).toUpperCase() + capName2.slice(1));
                $(".chooseX").show();
                return false;
            } else {
                alert("Please fill in names first!");
            }
        });
        
        //Make x or o buttons assign player one's name to the button clicked and p2 the other 
        $(document).on('click', '.btnX', function(){
            startGame = true;
            if(startGame == true) {
                play();
            }
            x = $("#player1").val();
            o = $("#player2").val();
            $('.chooseX').hide();
            $('.xTurn').show();
            turn = 0;
        });
    
        $(document).on('click', '.btnO', function(){
            startGame = true;
            if(startGame == true) {
                play();
            }
            o = $("#player1").val();
            x = $("#player2").val();
            $('.chooseX').hide();
            $('.oTurn').show();
            turn = 1;
        });
    }
   
   
    function play(){    
        $('#aTable').on('click', 'td', function() {
            
            //Counts moves 
            moveCount = moveCount + 1;
            
            //Makes sure players can't click in a space thats already filled
            if ($(this).html() !== '') {
                return;
            }
            
            // Switches between players and marks the correct symbol in the td clicked
            if (turn == 0 && win == false) {
                $(this).text('X');
                $(this).addClass('spaceX');
                $('.xTurn').hide();
                $('.oTurn').show();
                turn = 1;
            }else if (turn == 1 && win == false){
                $(this).text('O');
                $(this).addClass('spaceO');
                $('.oTurn').hide();
                $('.xTurn').show();
                turn = 0;
            }
    
            //Loops through winHere combos to see if the move was a winning move
            //if it is display win message
                //Uses the winners name in win message
                    //Makes sure win message only fires once
            for(var i =0; i< winHere.length; i++){
                if(winHere[i][0].hasClass('spaceX') && winHere[i][1].hasClass('spaceX') && winHere[i][2].hasClass('spaceX')){
                    win = true;
                    $('.oTurn').hide();
                    
                    if(x == $("#player1").val()){
                        $('.xWins').show();
                        
                        if(flag){
                            $("<h4 class='over pName'> wins!</h4> <button id='rBtn' class='restarting' >Restart</button>").appendTo('.xWins');
                            flag = false;
                        }
                    }else {
                        $('.oWins').show();  
                        
                        if(flag){
                            $("<h4 class='over p2Name'> wins!</h4><button id='rBtn' class='restarting' >Restart</button>").appendTo('.oWins');
                            flag = false;
                        }
                    }
                
                
                } else if (winHere[i][0].hasClass('spaceO') && winHere[i][1].hasClass('spaceO') && winHere[i][2].hasClass('spaceO')){
                    win = true;
                    $('.xTurn').hide();
                    
                    if(o == $("#player1").val()){
                        $('.xWins').show();
                        
                        if(flag){
                            $("<h4 class='over pName'> wins!</h4><button id='rBtn' class='restarting' >Restart</button>").appendTo('.xWins');
                            flag = false;
                        }
                    }else {
                        $('.oWins').show(); 
                        
                        if(flag){
                            $("<h4 class='over p2Name'> wins!</h4><button id='rBtn' class='restarting' >Restart</button>").appendTo('.oWins');
                            flag = false;
                        }
                    }
             
                }else if( moveCount == 9 && win == false) {
                    $('.oTurn').hide();
                    $('.xTurn').hide();
                    
                    if(flag){
                        $(".nWins ").html("<h4 class='btnX'> Cats</br> game</h4></br> <button id='rBtn' class='restarting' >Restart</button>");
                        flag = false;
                    }
                   $('.nWins').show();
                } 
            }
            
             //lets restart game 
            if(moveCount == 9 || win == true){
                $('pAgain').show();
                $(document).on('click', '#rBtn', function(){
                    location.reload();
                });
            }
            });
    }
});       