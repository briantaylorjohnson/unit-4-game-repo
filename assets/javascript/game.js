$(document).ready(function() {


    
    // Global variables which need to be instantiated and reset when the player wishes to play again
    var toons = [];
    var toonPickedId = "";
    var oppPickedId = "";
    var boostedAp = 0;
    var oppHealth = 0;
    var playerHealth = 0;

    // Playable toons onbjects and their attributes
    var mickeyObj = {id: "mickey", name: "Mickey", hp: 100, ap: 10, cap: 5, attackMove: "Ear Slap"};
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

    // primaryAttack() function to reduce the picked toon's health points and opponent's health points 
    function primaryAttack(toonPickedId, oppPickedId)
    {
                boostedAp = boostedAp + getToonAp(toonPickedId);
                oppHealth = oppHealth - boostedAp;
                console.log("Attack Power: " + boostedAp);
                console.log("Opponent Health: " + oppHealth);
                
                $("#picked-opponent").find(".hp").empty();
                $("#picked-opponent").find(".hp").append(oppHealth);

                playerHealth = playerHealth - getToonCap(oppPickedId);
                console.log("Counter Attack Power: " + getToonCap(oppPickedId));
                console.log("Player Health: " + playerHealth);

                $("#your-character").find(".hp").empty();
                $("#your-character").find(".hp").append(playerHealth);

                // Updates the DOM with the attack damage read out of the player's toon to the picked opponent
                $("#pl-dmg-dealt").empty();
                $("#pl-dmg-dealt").append("You attack " + getToonName(oppPickedId) + " with " + getToonName(toonPickedId) + "'s " + getToonAttackMove(toonPickedId) + " dealing " + boostedAp + " damage.");

                // Updates the DOM with the counter attack damage read out of the picked opponent to the player's toon
                $("#pl-dmg-taken").empty();
                $("#pl-dmg-taken").append(getToonName(oppPickedId) + " counter attacks you with " + getToonAttackMove(oppPickedId) + " dealing " + getToonCap(oppPickedId) + " damage.");
    }

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

    function getToonStats()
    {
        $(".hp").each(function()
        {
            toonId = $(this).parent().attr("toonId");
            console.log(toonId);
            $(this).append(getToonHp(toonId));
        });
    };

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
            else
            {
                oppPickedId = $(this).attr("toonId");    
                pickOpponent(oppPickedId);           
                console.log("Opponent Picked: " + getToonName(oppPickedId));
                $(this).prependTo("#picked-opponent");
            }
        }

        if (toonPickedId == "")
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
        }
        else
        {
            alert("You must pick a character and opponent first!");
        }
    });
    
});