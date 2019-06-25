# Kingdom Hearts RPG (Homework 4)
### Overview
The Kingdom Hearts RPG is the Homework 4 submission for Taylor Johnson in the Georgia Tech Coding Bootcamp. It uses HTML, CSS, Bootstrap, JavaScript, and jQuery to build an RPG (Role Playing Game) based on charaters or toons from the video game, *Kingdom Hearts*. 

In the game, the player is presented four toons from the *Kingdom Hearts* universe which he can pick. The remaining three toons then become the opponents which the player will battle with his toon. The player can then choose which opponent he wishes to battle first. The player will battle each opponent until all three opponents are knocked out or until the player is knocked out.

### Mechanics
When the application loads, the game board is initialized with all possible toons and their health. The player must then select which toon he wishes to battle with. After making a selection, the remaining toons are moved to the opponents space with updated red borders indicating they are no longer friendly.

To start the game, the player must choose which opponent he wishes to battle first. After knocking out an opponent, the player gets to choose another opponent to battle. Once all three opponents have been knocked out, the player wins the game. If the player is knocked out himself, then he loses. After winning or losing the game, the player can restart the game by clicking the "Restart" button. 

After selecting the an opponent, it is time for the player to battle with the selected opponent. In order to do this, the player clicks the "Attack" button. A spinner will display indicating that the attack is underway. Once the attack has been completed, the a damage recount will be displayed to the player. For every attack from the player, there is also a counter attack from the opponent which does damage to the player. Only if the player knocks out the opponent first is counter attack damage not taken.

There are three main stats for all toons:
1. Health Pool (HP): This is the amount of damage the toon can take before being knocked out
2. Attack Power (AP): This is the base amount of damage inflicted for each attack the player's toon deals to the opponent
3. Counter Attack Power (CAP): This is the amount of damage inflicted to the player's toon after a successful attack -- unless the player knocks out the opponent first

One important mechanic is that the AP for the player's toon increases by the base amount for every successful attack. After multiple successful attacks without being knocked out, the player's toon can have substantial AP which can be used to knock out opponents with large amounts of HP. The CAP for opponents remain constant and do not increase.

Once the game has been won, the player can restart the game and begin again by picking a new toon to play with. All base stats for the toons are reset.

Also, note that there are checks to ensure the player is guided to the correct action. Before attacking, the player must choose a toon to play with as well as an opponent. The player also can not choose to battle the toon he chose to play. He must pick one of the three other toons. 

### Legal
Kingdom Hearts and the toons represented in this project are property of Disney Interactive and Square Enix. The sole purpose of this project is for eductional furtherment in software engineering technologies. The owner of this project or any other collaborators take no credit for the artwork or naming of the characters. This project will not be used for commercial purposes.