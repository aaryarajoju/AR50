// require('dotenv').config(); 
const Discord = require("discord.js");
const {prefix, token,} = require('./config.json');
const client = new Discord.Client;

// const prefix = "50!-";


client.once('ready', () => {
    console.log("The bot is online! Connected as " + client.user.tag);
    client.user.setActivity("50!", {type: "LISTENING"});
   });
client.once('reconnecting', () => {
    console.log("The bot is reconnecting! Reconnecting as " + client.user.tag);
   });
client.once('disconnect', () => {
    console.log("The bot is disconnected!");
   });


client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) return;

    if (receivedMessage.content.startsWith(prefix)){
        processCommand(receivedMessage);
    }
})

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(4);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguements = splitCommand.slice(1);

    if (primaryCommand == "help"){
        helpCommand(arguements, receivedMessage);
    } else if(primaryCommand == "multiply"){
        multiplyCommand(arguements, receivedMessage);
    } else if(primaryCommand == "add"){
        addCommand(arguements, receivedMessage);
    } else if(primaryCommand == "difference"){
        diffCommand(arguements, receivedMessage);
    } else if(primaryCommand == "subtract"){
        subtractCommand(arguements, receivedMessage);
    } else if(primaryCommand == "divide"){
        divideCommand(arguements, receivedMessage);
    } else {
        receivedMessage.channel.send("Unknown command. \
                                    Try `50!-help` or \
                                    `50!-multiply` or \
                                    `50!-add` or \
                                    `50!-difference` or \
                                    `50!-divide` or \
                                    `50!-subtract` or \
                                    `50!-power` or \
                                    ");
    }
}


function divideCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Not enough arguements. Try `>divide 2 10`");
        return;
    }

    if (arguements.length > 2){
        receivedMessage.channel.send("Too many arguements. Try `>divide 2 10`");
        return;
    }

    let quotient = 1;
    
    quotient = arguements[0] / arguements[1];

    receivedMessage.channel.send("The quotient of " + arguements + " is " + quotient.toString());
}

function multiplyCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Not enough arguements. Try `>multiply 2 10`");
        return;
    }

    let product = 1;
    arguements.forEach((value) => {
      product = product * parseFloat(value);  
    })
    receivedMessage.channel.send("The product of " + arguements + " is " + product.toString());
}

function diffCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Not enough arguements. Try `>difference 2 10`");
        return;
    }

    if (arguements.length > 2){
        receivedMessage.channel.send("Too many arguements. Try `>difference 2 10`");
        return;
    }

    let diff = Math.abs(arguements[0] - arguements[1]);
    
    receivedMessage.channel.send("The difference of " + arguements + " is " + diff.toString());
}

function subtractCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Not enough arguements. Try `>difference 2 10`");
        return;
    }

    if (arguements.length > 2){
        receivedMessage.channel.send("Too many arguements. Try `>difference 2 10`");
        return;
    }

    let subt = 0;
    
    subt = arguements[0] - arguements[1];

    receivedMessage.channel.send("The subtraction of " + arguements + " is " + subt.toString());
}

function addCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Not enough arguements. Try `>add 2 10`");
        return;
    }

    let sum = 0;
    arguements.forEach((value) => {
      sum = sum + parseFloat(value);  
    })
    receivedMessage.channel.send("The sum of " + arguements + " is " + sum.toString());
}

function helpCommand(arguements, receivedMessage){
    if (arguements.length == 0){
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`");
    } else {
        receivedMessage.channel.send("It looks like you need help with " + arguements);
    }
}



client.login(token);