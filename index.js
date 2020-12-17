const Discord = require("discord.js");
const {prefix, token, apikey} = require('./config.json');
const client = new Discord.Client;
const https = require('https');
const url = "https://www.alphavantage.co/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=";
const url_key = "&apikey=" + apikey;

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
    let fullCommand = receivedMessage.content.substr(prefix.length);
    let splitCommand = fullCommand.split(" ");
    let primaryCommand = splitCommand[0];
    let arguements = splitCommand.slice(1);

    if (primaryCommand.toLowerCase() == "help"){
        helpCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "multiply"){
        multiplyCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "add"){
        addCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "difference"){
        diffCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "subtract"){
        subtractCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "divide"){
        divideCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "sq_area"){
        squareAreaCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "rect_area"){
        rectangleAreaCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "circle_area"){
        circleAreaCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "sq_perimeter"){
        squarePerimeterCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "rect_perimeter"){
        rectanglePerimeterCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "circle_perimeter"){
        circlePerimeterCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "factorial"){
        factorialCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "square"){
        squareCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "sqrt"){
        squarerootCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "power"){
        powerCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "stock"){
        stockCommand(arguements, receivedMessage);
    } else if(primaryCommand.toLowerCase() == "buy"){
        buyCommand(arguements, receivedMessage);
    } else {
        receivedMessage.channel.send("Unknown command. \n\n Try  `50!-help`  for the commands");
    }
}

function helpCommand(arguements, receivedMessage){
    if (arguements.length > 0){
        receivedMessage.channel.send("Please try just `50!-help`");
    } else {
        // receivedMessage.channel.send("help is on its way");
        receivedMessage.channel.send("The following commands are available: \n\n" +
            "`50!-add` - adds two or more numbers \n" +
            "`50!-multiply` - multiplies two or more numbers \n" +
            "`50!-difference` - calculates the diference between two numbers \n" +
            "`50!-divide` - divides two numbers \n" +
            "`50!-subtract` - subtracts two numbers \n\n" +
            "`50!-sq_area` - calculates the area of a square \n" +
            "`50!-rect_area` - calculates the area of a rectangle \n" +
            "`50!-cicle_area` - calculates the area of a circle \n" +
            "`50!-sq_perimeter` - calculates the perimeter of a square \n" +
            "`50!-rect_perimeter` - calculates the perimeter of a rectangle \n" +
            "`50!-circle_perimeter` - calculates the perimeter of a circle \n\n" +
            "`50!-factorial` - calculates the factorial of a number \n" +
            "`50!-square` - calculates the square of a number \n" +
            "`50!-sqrt` - calculates the square-root of a number \n" +
            "`50!-power` - calculates the value of raising a number to the power of another number \n\n" +
            "`50!-stock` - gets the stock price with a trading symbol\n" //+
            // "`50!-buy` - gets the price and a buying link of a product \n" +
            // "`50!-add` - adds two or more numbers \n" +
            // "`50!-add` - adds two or more numbers \n" +
            // "`50!-add` - adds two or more numbers \n" +
            // "`50!-add` - adds two or more numbers \n"                                         
        );
    }
}


function stockCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-stock AAPL`");
        return;
    }

    https.get((url + arguements[0] + url_key), (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {

            let data_obj = JSON.parse(data);
            let lastRefresh = data_obj["Meta Data"]["3. Last Refreshed"];
            let price = data_obj["Time Series (5min)"][lastRefresh]["4. close"];

            receivedMessage.channel.send("The stock price of " + arguements[0] + " is $ " + price);
        });    
    }).on("error", (err) => {
        receivedMessage.channel.send("Error: " + err.message);
    });
}

function buyCommand(arguements, receivedMessage){
    
}

function factorialCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-factorial 10`");
        return;
    }

    let fact = 1;
    for(i = 1; i <= arguements[0]; i++){
        fact = fact * i;
    }
    receivedMessage.channel.send("The factorial of the number " + arguements + 
    " is " + fact.toString());
}

function squareCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-square 10`");
        return;
    }

    let sq = Math.pow(arguements[0], 2);
    receivedMessage.channel.send("The square of the number " + arguements + 
    " is " + sq.toString());
}

function squarerootCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-sqrt 16`");
        return;
    }

    let sqr = Math.sqrt(arguements[0]);
    receivedMessage.channel.send("The square-root of of the number " + arguements + 
    " is " + sqr.toString());
}

function powerCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-power 10 3`");
        return;
    }

    let pow = Math.pow(arguements[0], arguements[1]);
    receivedMessage.channel.send(arguements[0] + "^" + arguements[1] + 
    " is equal to " + pow.toString());
}

function squarePerimeterCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-sq_perimeter 10`");
        return;
    }

    let peri = 4 * arguements[0];
    receivedMessage.channel.send("The perimeter of square with a side " + arguements + 
    " is " + peri.toString());
}

function rectanglePerimeterCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-rect_perimeter 10 8`");
        return;
    }

    let peri = 2 * (parseFloat(arguements[0]) + parseFloat(arguements[1]));
    receivedMessage.channel.send("The perimeter of rectangle with a sides " + 
    arguements + " is " + peri.toString());
}

function circlePerimeterCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-circle_perimeter 10`");
        return;
    }

    let peri = 2 * 3.14 * (arguements[0]);
    receivedMessage.channel.send("The perimeter of circle with a radius " + 
    arguements + " is " + peri.toString());
}

function squareAreaCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-sq_area 10`");
        return;
    }

    let area = Math.pow(arguements[0], 2);
    receivedMessage.channel.send("The area of a square with a side " + arguements + 
    " is " + area.toString());
}

function rectangleAreaCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-rect_area 10 7`");
        return;
    }

    let area = (arguements[0] * arguements[1]);
    receivedMessage.channel.send("The area of rectangle with a sides " + arguements + 
    " is " + area.toString());
}

function circleAreaCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-cicle_area 10`");
        return;
    }

    let area = 3.14 * (Math.pow(arguements[0], 2));
    receivedMessage.channel.send("The area of circle with a radius " + arguements + 
    " is " + area.toString());
}

function divideCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-divide 10 2`");
        return;
    } 

    let quotient = arguements[0] / arguements[1]; 
    receivedMessage.channel.send("The quotient of " + arguements + 
    " is " + quotient.toString());
}

function multiplyCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Atleast two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-multiply 2 10`");
        return;
    }

    let product = 1;
    arguements.forEach((value) => {
      product = product * parseFloat(value);  
    })
    receivedMessage.channel.send("The product of " + arguements + 
    " is " + product.toString());
}

function diffCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-difference 35 23`");
        return;
    }

    let diff = Math.abs(arguements[0] - arguements[1]);
    receivedMessage.channel.send("The difference of " + arguements + 
    " is " + diff.toString());
}

function subtractCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-subtract 94 34`");
        return;
    }

    let subt = arguements[0] - arguements[1];
    receivedMessage.channel.send("The subtraction of " + arguements + 
    " is " + subt.toString());
}

function addCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Atleast two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-add 2 10`");
        return;
    }

    let sum = 0;
    arguements.forEach((value) => {
      sum = sum + parseFloat(value);  
    })
    receivedMessage.channel.send("The sum of " + arguements + 
    " is " + sum.toString());
}


client.login(token);