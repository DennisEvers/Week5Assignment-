
// Created the main class Player for a D&D party making orginizer.
//I created the Player class with arguments in it for names skills and pets
class Player {
    constructor(name, skill, pet){
        this.name = name;
        this.skill = skill;
        this.pet = pet;
    
    }
    //this describe is a method i can call to see what the characters name skill and type of pet are in string form
    describe(){
        return `${this.name} is a ${this.skill} with a ${this.pet} companion.`;
    }
}

// i then created another class is  Party class and it will hold Players inside of the party class including 
// a blank array that we will be able to push created playes to.
class Party {
    constructor(name) {
        this.name = name;
        this.players = []
    }
    //  I then created the addPlayer method that allows me to push players into the blank array when needed

    addPlayer(player) {
        if (player instanceof Player){
            this.players.push(player);
        } else {
            throw new Error (`you can only add a player. Argument is not a player:  ${player}`);
            // this is an if else function that alows an error to be thrown if the user tried to add something that
            // is not a player this just makes it more user freindly 

        }
        }
        // added another describe method that returns the party and players if you need it for the console log.
        describe(){
            return `${this.name} has a party of ${this.players}.`
        }
    }

    // Created another class that is a menu that will pull from the other classes in order to use the functions
    // as well as acess the information in the objects
    class Menu {
        constructor(){
            this.partys = [];
            this.selectedParty = null;
        }
        //this is the start function created inside the menu. I did top down building with this like the video
        //and created the menu and items in the menu before i made the methods in order to know what methods i
        // would need to create.

        start() {
            let selection = this.showMainMenuOptions();
            while (selection != 0) {
                switch (selection) {
                    case '1':
                    this.createParty();
                    break;
                    case '2':
                    this.viewParty();
                    break;
                    case '3':
                    this.deleteParty();
                    break;
                    case '4' :
                    this.displayParty();
                    break;
                    default:
                        selection = 0;

                }
                selection = this.showMainMenuOptions();
                //this switch allows the menu to display the options you will have to select once the methods are created
            }
            alert('No Party Selected, your quest is doomed to fail')
            // this alert is here so if you select nothing in the menu and dont due anything it alerts you your doomed
        }

        //this is the menu listed out in prompt for so it displays when the web page is activated 
        showMainMenuOptions() {
           return prompt(`
            0) exit
            1) Create New Party
            2) View Party
            3) Delete Party
            4) Display all Parties
           `);
        }
        //this is the menu prompt that appears when you select the view party index you want

        showPartyMenuOptions(partyinfo){
            return prompt(`
            0) back
            1) Create Player
            2) Delete Player
            -----------------
            ${partyinfo}
            `);
        }
        // this is the method used when you select the display party option
        // I created a for loop so it would iterate through the partys until all the parties are found 
        // and displayed 
        displayParty() {
            let partyString = '';
            for(let i = 0; i <this.partys.length; i++) {
                partyString += i + ') ' + this.partys[i].name + '\n';
            }
            alert(partyString);
        }
        // this is the create party option when selected i created a prompt that would let you create the 
        // party and then used the push method to add it to the party array
        createParty() {
            let name = prompt('Enter Name for New Party:');
            this.partys.push(new Party(name));
        }
        // I then did the view party option  this was more complex and needed multiple methods.
        // the first method was used after the prompt to ask what index you want
        // was a if statement. the statement made sure that as long as you selected an index that existed
        //as it was greater them -1 and less the the partys length it would allow it. this just helps keep 
        // errors or bugs away. then used a for loop in order to iterate through the selected party
        // and show each player in the party on different lines using the \n
        // the last was an added selection that allows you to create and delete players inside of this menu
        //by using a switch i could display the options then later on create them.
    
        viewParty() {
            let index = prompt('Enter the index of the Party you would like to view:');
            if(index > -1 && index < this.partys.length) {
                this.selectedParty = this.partys[index];
                let description = 'Party Name: ' + this.selectedParty.name + '\n';

                for (let i = 0; i < this.selectedParty.players.length; i++) {
                    description += i + ') ' + this.selectedParty.players[i].name 
                    + ' - ' + '\n' + this.selectedParty.players[i].skill  + ' - ' + '\n' + this.selectedParty.players[i].pet  + " - " + '\n';
                }
                let selection = this.showPartyMenuOptions(description)
                switch (selection) {
                    case '1':
                        this.createPlayer();
                        break;
                    case '2':
                        this.deletePlayer();
                        
                }
            }
        }
        // first up was the delete party method. This was not to hard and just used a simple splice method
        //making sure you were on the sleceted parties index and that it would only delete one object deleted

        deleteParty() {
            let index = prompt('Enter the index of the Party you wish to expell from your Guild:');
            if (index > -1 && index < this.partys.length) {
                this.partys.splice(index, 1);
        }
    }
    // create a player was SUPER similar to delete player the main difference being that we used push rather then
    // slice in order to push the object and i pushed 3 data types being skill name and pet to the player creation


        createPlayer() {
            let name = prompt('Enter name for new Player:');
            let skill = prompt('Enter skill for new Player:');
            let pet = prompt('Enter Type of Pet for new Player:');
            this.selectedParty.players.push(new Player(name, skill, pet));
        }
        // delete player was just like delete party but just for a player just made sure the index existed 
        // so it would not error and then spliced out the selected player.

        deletePlayer() {
            let index = prompt('Enter the index of the Player you wish to expell from your quest:');
            if (index > -1 && index < this.selectedParty.players.length) {
                this.selectedParty.players.splice(index, 1);
            }
        }
    }
// after everything we needed to call the menu to run so we did the new menu and called the function.

let menu = new Menu();
menu.start();


