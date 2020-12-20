const Discord = require("discord.js");
const {prefix, token, stockApiKey, weatherApiKey} = require('./config.json');
const client = new Discord.Client;
const https = require('https');
const stockUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
const stockUrl_key = "&apikey=" + stockApiKey;
const weatherUrl = "https://api.weatherapi.com/v1/current.json?q=";
const weatherUrl_key = "&key=" + weatherApiKey;


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
    } else if(primaryCommand.toLowerCase() == "weather"){
        weatherCommand(arguements, receivedMessage);
    } else {

        const embedMessage1 = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('Unknown command');
        const embedMessage2 = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('Try  `50!-help`  for the commands');

        receivedMessage.channel.send(embedMessage1);     
        receivedMessage.channel.send(embedMessage2);     
    }
}

function helpCommand(arguements, receivedMessage){
    if (arguements.length > 0){
        const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('Please try just  `50!-help`');

        receivedMessage.channel.send(embedMessage); 
    } else {
        // receivedMessage.channel.send("help is on its way");

        const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
            .setTitle('COMMANDS')
            .setAuthor('AR50', 'https://i.imgur.com/d0ROR0E.png')
            .setDescription(
                '`50!-add` - adds two or more numbers \n' +
                '`50!-multiply` - multiplies two or more numbers \n' +
                '`50!-difference` - calculates the diference between two numbers \n' +
                '`50!-divide` - divides two numbers \n' +
                '`50!-subtract` - subtracts two numbers \n\n' +
                '`50!-sq_area` - calculates the area of a square \n' +
                '`50!-rect_area` - calculates the area of a rectangle \n' +
                '`50!-cicle_area` - calculates the area of a circle \n' + 
                '`50!-sq_perimeter` - calculates the perimeter of a square \n' +
                '`50!-rect_perimeter` - calculates the perimeter of a rectangle \n' +
                '`50!-circle_perimeter` - calculates the perimeter of a circle \n\n' +
                '`50!-factorial` - calculates the factorial of a number \n' +
                '`50!-square` - calculates the square of a number \n' +
                '`50!-sqrt` - calculates the square-root of a number \n' +
                '`50!-power` - calculates number raised to the power of another number \n\n' +
                '`50!-stock` - gets the stock price of a publically traded company\n\n' +
                '`50!-weather` - gets the current weather of a place \n'
            );

        receivedMessage.channel.send(embedMessage);
    }
}


function weatherCommand(arguements, receivedMessage){
    if (arguements.length < 1){
        receivedMessage.channel.send("Atleast one arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-weather Paris`");
        return;
    }

    https.get((weatherUrl + arguements[0] + weatherUrl_key), (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {

            let data_obj = JSON.parse(data);
            let currentTempInC = data_obj["current"]["temp_c"];
            let currentTempInF = data_obj["current"]["temp_f"];
            let feelsLikeTempInC = data_obj["current"]["feelslike_c"];
            let feelsLikeTempInF = data_obj["current"]["feelslike_f"];
            let condition = data_obj["current"]["condition"]["text"];
            let imageLink = "https:" + data_obj["current"]["condition"]["icon"];

            const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle("__" + arguements[0].toUpperCase() + "__")
                .addFields(
                    { name: 'Weather', value: "***" + condition + "***"},
                    { name: 'Current Temperature', value: "* **" + currentTempInC + "**°C *" + "/" + "* **" + currentTempInF + "**°F *", inline: true},
                    // { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'Feels Like', value: "* **" + feelsLikeTempInC + "**°C *" + "/" + "* **" + feelsLikeTempInF + "**°F *", inline: true},
                )
                .setImage(imageLink)
                .setTimestamp();

            receivedMessage.channel.send(embedMessage);
        });    
    }).on("error", (err) => {
        receivedMessage.channel.send("Error: " + err.message);
    });
}

function stockCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-stock AAPL`");
        return;
    }

    https.get((stockUrl + arguements[0] + stockUrl_key), (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        resp.on('end', () => {

            let data_obj = JSON.parse(data);
            let lastRefresh = data_obj["Meta Data"]["3. Last Refreshed"];
            let price = data_obj["Time Series (Daily)"][lastRefresh]["4. close"];
            let prevPrice = Object.values(Object.values(Object.values(data_obj)[1])[1])[3];
            let change = price - prevPrice;
            let changePercentage = (change / prevPrice) * 100;
            let arrow = "";

            change = (change).toFixed(2);
            changePercentage = (changePercentage).toFixed(2);

            if (change > 0){
                arrow = "▲";
            } else if (change < 0){
                arrow = "▼";
            }

            const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle("__" + arguements[0].toUpperCase() + "__")
                .addFields(
                    { name: 'Stock Price', value: "$***" + price + "*** " + arrow},
                    { name: 'Net-Change', value: "***" + change + "***" +  " (***" + changePercentage + "***%)"},
                )
                .setTimestamp();

            receivedMessage.channel.send(embedMessage);
        });    
    }).on("error", (err) => {
        receivedMessage.channel.send("Error: " + err.message);
    });
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

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The factorial of the number ' + arguements + ' is  __***' + fact.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function squareCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-square 10`");
        return;
    }

    let sq = Math.pow(arguements[0], 2);

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The square of the number ' + arguements + ' is  __***' + sq.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function squarerootCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-sqrt 16`");
        return;
    }

    let sqr = Math.sqrt(arguements[0]);

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The square-root of of the number ' + arguements + ' is  __***' + sqr.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function powerCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-power 10 3`");
        return;
    }

    let pow = Math.pow(arguements[0], arguements[1]);

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle(arguements[0] + ' ^ ' + arguements[1] + ' is equal to  __***' + pow.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function squarePerimeterCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-sq_perimeter 10`");
        return;
    }

    let peri = 4 * arguements[0];

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The perimeter of square with a side ' + arguements + ' is  __***' + peri.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function rectanglePerimeterCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-rect_perimeter 10 8`");
        return;
    }

    let peri = 2 * (parseFloat(arguements[0]) + parseFloat(arguements[1]));

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The perimeter of rectangle with a sides ' + arguements + ' is  __***' + peri.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function circlePerimeterCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-circle_perimeter 10`");
        return;
    }

    let peri = 2 * 3.14 * (arguements[0]);

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The perimeter of circle with a radius ' + arguements + ' is  __***' + peri.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function squareAreaCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-sq_area 10`");
        return;
    }

    let area = Math.pow(arguements[0], 2);

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The area of square with a side ' + arguements + ' is  __***' + area.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function rectangleAreaCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-rect_area 10 7`");
        return;
    }

    let area = (arguements[0] * arguements[1]);

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The area of rectangle with a sides ' + arguements + ' is  __***' + area.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function circleAreaCommand(arguements, receivedMessage){
    if (arguements.length !== 1){
        receivedMessage.channel.send("One arguement is required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-cicle_area 10`");
        return;
    }

    let area = 3.14 * (Math.pow(arguements[0], 2));

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The area of circle with a radius ' + arguements + ' is  __***' + area.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function divideCommand(arguements, receivedMessage){
    if (arguements.length < 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-divide 10 2`");
        return;
    } 

    let quotient = arguements[0] / arguements[1]; 

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The quotient of  ' + arguements[0] + ' / ' + arguements[1] + '  is  __***' + quotient.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
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

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The product of ' + arguements + ' is  __***' + product.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function diffCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-difference 35 23`");
        return;
    }

    let diff = Math.abs(arguements[0] - arguements[1]);

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The difference of  ' + arguements[0] + ' and ' + arguements[1] + '  is  __***' + diff.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}

function subtractCommand(arguements, receivedMessage){
    if (arguements.length !== 2){
        receivedMessage.channel.send("Two arguements are required. " + 
        "The number of arguements given are " + arguements.length + 
        "\n Try `50!-subtract 94 34`");
        return;
    }

    let subt = arguements[0] - arguements[1];

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The subtraction of  ' + arguements[1] + ' from ' + arguements[0] + '  is  __***' + subt.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
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

    const embedMessage = new Discord.MessageEmbed().setColor('#FF004D')
                .setTitle('The sum of ' + arguements + ' is  __***' + sum.toString() + '***__');

    receivedMessage.channel.send(embedMessage);
}


client.login(token);