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
    var mickeyObj = {id: "mickey", name: "Mickey", hp: 100, ap: 1000, cap: 5, attackMove: "Ear Slap"};
    var donaldObj = {id: "donald", name: "Donald", hp: 125, ap: 5, cap: 15, attackMove: "Wing Flap"};
    var goofyObj = {id: "goofy", name: "Goofy", hp: 75, ap: 15, cap: 15, attackMove: "Seismic Chuckle"};
    var peteObj = {id: "pete", name: "Pete", hp: 150, ap: 5, cap: 10, attackMove: "Belly Bounce"};

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

    // primaryAttack() function to reduce the picked toon's health points and opponent's health points, as well as update the DOM accordingly 
    function primaryAttack(toonPickedId, oppPickedId)
    {
                
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
                playerHealth = playerHealth - getToonCap(oppPickedId);
                console.log("Counter Attack Power: " + getToonCap(oppPickedId));
                console.log("Player Health: " + playerHealth);

                // Updates the DOM with the player toon's health after receiving counter attack damage
                $("#your-character").find(".hp").empty();
                $("#your-character").find(".hp").append(playerHealth);

                // Updates the DOM with the attack damage read out to the opponent's toon
                $("#pl-dmg-dealt").empty();
                $("#pl-dmg-dealt").append("You attack " + getToonName(oppPickedId) + " with " + getToonName(toonPickedId) + "'s " + getToonAttackMove(toonPickedId) + " dealing " + boostedAp + " damage.");

                // Updates the DOM with the counter attack damage read out to the player's toon
                $("#pl-dmg-taken").empty();
                $("#pl-dmg-taken").append(getToonName(oppPickedId) + " counter attacks you with " + getToonAttackMove(oppPickedId) + " dealing " + getToonCap(oppPickedId) + " damage.");
    }

    // Need to make changes to this because it is redundant with getToonHp()
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

    // Need to make changes to this because it is redundant with getToonHp()
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


    function toonKnockedOut()
    {
        if (playerHealth <= 0)
        {
            playerHealth = 0;

            $("#your-character").find(".hp").empty();
            $("#your-character").find(".hp").append(playerHealth);

            $("#pl-dmg-taken").empty();
            $("#pl-dmg-dealt").empty();
            $("#pl-dmg-dealt").append("You have been knocked out by " + getToonName(oppPickedId) + "! Gameover."); 
        }
        else if (oppHealth <= 0)
        {
            oppHealth = 0;
            
            $("#picked-opponent").find(".hp").empty();
            $("#picked-opponent").find(".hp").append(oppHealth);

            $("#pl-dmg-taken").empty();
            $("#pl-dmg-dealt").empty();
            $("#pl-dmg-dealt").append("You have  knocked out " + getToonName(oppPickedId) + "! Pick a new opponent."); 
            
            $("#picked-opponent > .toon").appendTo("#your-opponents");
            oppPickedId = "";
            victories++;
        }
    }

    // Invokes the buildToonArray() function to populate the list of playable toons and their attributes
    buildToonArray();

    // Invokes the getToonStats() function to load the initial stats for the toons
    getToonStats();


    // Returns the toons array in the console for debugging and validation if new toons are added
    console.log(toons);

    $(".toon").on("click", function()
    {

        if (toonPickedId != "" && oppPickedId == "")
        {
            if ($(this).attr("toonId") == toonPickedId)
            {
                alert("You can't fight yourself, silly!");
            }
            else if (parseInt($(this).find(".hp").text()) == 0)
            {
                alert("This opponent has been knocked out! Pick a different opponent.");
            }
            else
            {
                oppPickedId = $(this).attr("toonId");    
                pickOpponent(oppPickedId);           
                console.log("Opponent Picked: " + getToonName(oppPickedId));
                $(this).prependTo("#picked-opponent");
            }
        }

        else if (toonPickedId == "" && oppPickedId == "")
        {
            toonPickedId = $(this).attr("toonId");
            pickToon(toonPickedId);
            console.log("Toon Picked: " + getToonName(toonPickedId));
            $(".toon").appendTo("#your-opponents");
            $(this).prependTo("#your-character");
        }
    });

    $("#primary-attack").on("click", function()
    {
        if(toonPickedId != "" && oppPickedId != "")
        {
            alert("Fire in the hole!");
            primaryAttack(toonPickedId, oppPickedId);
            toonKnockedOut();
            
            if( victories == 3)
            {
                $("#pl-dmg-dealt").empty();
                $("#pl-dmg-dealt").append("Congratulations, " + getToonName(toonPickedId) + "!");
                $("#pl-dmg-taken").append("You have knocked out all three opponents. Pick a toon to play again.");
                $(".toon").appendTo("#your-opponents");

                toonPickedId = "";
                oppPickedId = "";
                boostedAp = 0;
                victories = 0;

                getToonStats();
            }
        }
        else
        {
            alert("You must pick a character and opponent first!");
        }
    });
    
});