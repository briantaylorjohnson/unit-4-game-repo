$(document).ready(function() {

    // Global variables which need to be instantiated and reset when the player wishes to play again
    var toons = [];
    var toonPickedId = "";
    var oppPickedId = "";
    var boostedAp = 0;
    var oppHealth = 0;
    var playerHealth = 0;
    var victories = 0;

    // Playable toons onbjects and their attributes
    var mickeyObj = {id: "mickey", name: "Mickey", hp: 100, ap: 15, cap: 5, attackMove: "Ear Slap"};
    var donaldObj = {id: "donald", name: "Donald", hp: 125, ap: 10, cap: 10, attackMove: "Wing Flap"};
    var goofyObj = {id: "goofy", name: "Goofy", hp: 100, ap: 15, cap: 5, attackMove: "Seismic Chuckle"};
    var peteObj = {id: "pete", name: "Pete", hp: 150, ap: 5, cap: 20, attackMove: "Belly Bounce"};

    // Retrieves the stats for all of the toons available to the player when the game loads and updates the DOM accordingly
    function getToonStats()
    {
        $(".hp").each(function()
        {
            $(this).empty();
            toonId = $(this).parent().attr("toonId");
            console.log(toonId);
            $(this).append(getToonHp(toonId));
        });
    }

    // When a toon is picked by the player, the toon's health is set for the game
    function pickToon(toonId)
    {
        for (i = 0; i < toons.length; i++)
        {
            if (toons[i].id == toonId)
            {
                playerHealth = toons[i].hp;
            }
        }
    }

    // When an opponent toon is picked by the player, the opponent's health is set for the game
    function pickOpponent(toonId)
    {
        for (i = 0; i < toons.length; i++)
        {
            if (toons[i].id == toonId)
            {
                oppHealth = toons[i].hp;
                console.log("Opp Initial Health: " + oppHealth);
            }
        }
    }

    // Builds the array of playable toons to easily retrieve attributes for each toon during gameplay
    function buildToonArray()
    {
        toons.push(mickeyObj);
        toons.push(donaldObj);
        toons.push(goofyObj);
        toons.push(peteObj);
    }

    // Retrieves any toon's name by passing the toon's ID
    function getToonName(toonId)
    {
        for (i = 0; i < toons.length; i++)
        {
            if (toons[i].id == toonId)
            {
                return toons[i].name;
            }
        }
    }

    // Retrieves any toon's health points by passing the toon's ID
    function getToonHp(toonId)
    {
        for (i = 0; i < toons.length; i++)
        {
            if (toons[i].id == toonId)
            {
                return toons[i].hp;
            }
        }
    }

    // Retrieves any toon's attack power by passing the toon's ID
    function getToonAp(toonId)
    {
        for (i = 0; i < toons.length; i++)
        {
            if (toons[i].id == toonId)
            {
                return toons[i].ap;
            }
        }
    }

    // Retrieves any toon's counter attack power by passing the toon's ID
    function getToonCap(toonId)
    {
        for (i = 0; i < toons.length; i++)
        {
            if (toons[i].id == toonId)
            {
                return toons[i].cap;
            }
        }
    }

    // Retrieves any toon's counter attack power by passing the toon's ID
    function getToonAttackMove(toonId)
    {
        for (i = 0; i < toons.length; i++)
        {
            if (toons[i].id == toonId)
            {
                return toons[i].attackMove;
            }
        }
          
    }

    // Function which initiates the attack on the opponent with the Attack Spinner and then outputs the damage
    function attackStart()
    {
        $("#pl-dmg-dealt").empty();
        $("#pl-dmg-taken").empty();

        // Attack Spinner showed to player when he initiates an attack
        $("#primary-attack").hide();
        $(".spinner-grow").show();
        console.log("Attacking...");

        $("#pl-dmg-taken").append("Attacking...");

        // Invokes primaryAttack() to calculate attack and counter attack damage and then display to player
        setTimeout(function()
        {
            primaryAttack(toonPickedId, oppPickedId);
            toonKnockedOut();

            // Determines when the player has defeated three opponents and wins the game
            if( victories == 3)
            {
                $("#pl-dmg-dealt").empty();
                $("#pl-dmg-dealt").append("Congratulations, " + getToonName(toonPickedId) + "!");
                $("#pl-dmg-taken").append("You have knocked out all three opponents. Pick a toon to play again.");
                $(".toon").show();
                $(".toon").appendTo("#your-opponents");

                $("#primary-attack").hide();
                $("#restart-game").show();
            }
        }, 1000);
    }

    // primaryAttack() function to reduce the picked toon's health points and opponent's health points, as well as update the DOM accordingly 
    function primaryAttack(toonPickedId, oppPickedId)
    {
                // Hides the Attack Spinner once the attack and counter attack have been performed
                $(".spinner-grow").hide();
                $("#pl-dmg-taken").empty();     

                // Increases the attack power of the player's toon after a successful primary attack (as defined in the functional specification/instructions)
                boostedAp = boostedAp + getToonAp(toonPickedId);
                
                // Calculates the opponent toon's health after receiving primary attack damage
                oppHealth = oppHealth - boostedAp;
                console.log("Attack Power: " + boostedAp);
                console.log("Opponent Health: " + oppHealth);
                
                // Updates the DOM with the opponent toon's health after receiving primary attack damage from the player's toon
                $("#picked-opponent").find(".hp").empty();
                $("#picked-opponent").find(".hp").append(oppHealth);

                // Calculates the player toon's health after receiving counter attack damage
                // (Only if player toon did not knock out oppoonent first)
                if (oppHealth > 0)
                {
                    playerHealth = playerHealth - getToonCap(oppPickedId);
                    console.log("Counter Attack Power: " + getToonCap(oppPickedId));
                    console.log("Player Health: " + playerHealth);
                }

                // Updates the DOM with the player toon's health after receiving counter attack damage
                $("#your-character").find(".hp").empty();
                $("#your-character").find(".hp").append(playerHealth);

                // Updates the DOM with the attack damage read out to the opponent's toon
                $("#pl-dmg-dealt").append("You attack " + getToonName(oppPickedId) + " with " + getToonName(toonPickedId) + "'s " + getToonAttackMove(toonPickedId) + " dealing " + boostedAp + " damage.");

                // Updates the DOM with the counter attack damage read out to the player's toon
                $("#pl-dmg-taken").append(getToonName(oppPickedId) + " counter attacks you with " + getToonAttackMove(oppPickedId) + " dealing " + getToonCap(oppPickedId) + " damage.");
    }

    // Determines if a toon has been knocked out (player or opponent) and updates the DOM accordingly
    function toonKnockedOut()
    {
        if (playerHealth <= 0)
        {
            // Prevents player from having negative health
            playerHealth = 0;

            // Updates player's toon HP in DOM
            $("#your-character").find(".hp").empty();
            $("#your-character").find(".hp").append(playerHealth);

            // Tells the player that the game is over because his toon has been knocked out
            $("#pl-dmg-taken").empty();
            $("#pl-dmg-dealt").empty();
            $("#pl-dmg-dealt").append("You have been knocked out by " + getToonName(oppPickedId) + "! Gameover."); 

            // Hides the Attack button and shows the Restart game button
            $("#primary-attack").hide();
            $("#restart-game").show();
        }
        else if (oppHealth <= 0)
        {
            // Prevents opponent from having negative health
            oppHealth = 0;
            
            // Updates opponents's toon HP in DOM
            $("#picked-opponent").find(".hp").empty();
            $("#picked-opponent").find(".hp").append(oppHealth);

            // Tells the player that he has successfully knocked out the opponent
            $("#pl-dmg-taken").empty();
            $("#pl-dmg-dealt").empty();
            $("#pl-dmg-dealt").append("You have knocked out " + getToonName(oppPickedId) + "! Pick a new opponent."); 
            
            // Removes the knocked out opponent from the game board
            $("#picked-opponent > .toon").hide();

            // Ensures Attachkbutton is continuing to show
            $("#primary-attack").show();
            
            // Setting the OppPickedId to an empty string allows the player to pick the next opponent
            oppPickedId = "";
            
            // Counts successful knockouts -- once three has been reached, the player has knocked out all opponents
            victories++;
        }
        else
        {
            $("#primary-attack").show();
        }
    }

    // Invokes the buildToonArray() function to populate the list of playable toons and their attributes
    buildToonArray();

    // Invokes the getToonStats() function to load the initial stats for the toons
    getToonStats();

    // Hides the Attack Spinner before the player initiates an attack
    $(".spinner-grow").hide();
    
    // Hides the Restart button until the player wins/loses the game
    $("#restart-game").hide();

    // Returns the toons array in the console for debugging and validation if new toons are added
    console.log(toons);

    $(".toon").on("click", function()
    {
        // Conditional that allows the player to pick an opponent after he has picked his toon
        if (toonPickedId != "" && oppPickedId == "")
        {
            // Conditional that prevents the player from picking his toon as an opponent
            if ($(this).attr("toonId") == toonPickedId)
            {
                $('#cantFightSelf').modal();
            }

            // Conditional that prevents the player from picking a knocked out opponent
            else if (parseInt($(this).find(".hp").text()) == 0)
            {
                $('##oppKnockedOut').modal();
            }

            // When the player picks a valid opponent, this moves the toon to the defender space on the game board
            else
            {
                oppPickedId = $(this).attr("toonId");    
                pickOpponent(oppPickedId);           
                console.log("Opponent Picked: " + getToonName(oppPickedId));
                $(this).prependTo("#picked-opponent");
            }
        }

        // Conditional that allows the player to pick his toon
        else if (toonPickedId == "" && oppPickedId == "")
        {
            toonPickedId = $(this).attr("toonId");
            pickToon(toonPickedId);
            console.log("Toon Picked: " + getToonName(toonPickedId));
            
            // Moves unpicked toons to opponnents space on game board
            $(".toon").appendTo("#your-opponents");
            $(this).prependTo("#your-character");

            // Updates CSS borders for opponents (to red)
            $(".toon").toggleClass("border-success");
            $(".toon").toggleClass("border-danger");
            $(this).toggleClass("border-success");
            $(this).toggleClass("border-danger");

        }
    });

    // Listener for clicks on the Attack button when it is active
    $("#primary-attack").on("click", function()
    {
        // Conditional which checks to see if the player has picked a toon and an opponent
        if(toonPickedId != "" && oppPickedId != "")
        {
            attackStart();
        }
        // Alerts the player if he has not picked a toon to play with or an opponent to battle against
        else
        {
            $('#mustPickToon').modal();  
        }
    });
    
    // Listener for clicks on the Restart button when it is active
    $("#restart-game").on("click", function()
    {
        // Empties the damage recount in DOM
        $("#pl-dmg-taken").empty();
        $("#pl-dmg-dealt").empty();

        // Hides Restart button and shows the Attack button
        $("#restart-game").hide();
        $("#primary-attack").show();

        // Updates the CSS borders in the DOM for the toons when game is restarted
        $(".toon").removeClass("border-danger");
        $(".toon").addClass("border-success");

        // Shows all toons and moves them to the correct space on gameboard for the player to play again
        $(".toon").show();
        $(".toon").prependTo("#your-character");

        // Resets global variables for a new game and also resets all toon stats 
        toonPickedId = "";
        oppPickedId = "";
        boostedAp = 0;
        victories = 0;
        getToonStats();
    });
});