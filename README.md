# AR50

[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/aaryarajoju/ar50)

<p align="center"> <img width='100' src="https://i.imgur.com/d0ROR0E.png"/> </p>

## Introduction

AR50 is a discord bot built using [Discord.JS](https://discord.js.org/#/), capable of doing a lot of miscellaneous tasks, like showing the current weather, getting stock details, and some mathematical functions.

## Add it to your server

<i>[NOTE: the bot won't be up 24/7]</i> <br>
[Invite the bot to your server](https://discord.com/api/oauth2/authorize?client_id=786238151509016628&permissions=182336&scope=bot) <br>
(You need to have the `Manage Server` permission for the server you want to add the bot to)

## Commands

`50!-` is the command prefix for the bot

<br>

The list of commands are as follows:

* `50!-help` - shows all of the available commands.

<p align="center"> <img width='300' src="https://i.imgur.com/ykGzjsK.png"/> </p>

* `50!-weather` - gets the weather details of a location using the [Weather API](https://www.weatherapi.com/) and displays the current weather condition, the current temperature, the temperature it feels like, and a picture of the weather condition.

<p align="center"> <img width='250' src="https://i.imgur.com/6z5E0A3.png"/> </p>

* `50!-stock` - gets the stock details of a publically traded entity, using the [Alpha Vantage API](https://www.alphavantage.co/), and shows the current stock price, along with the net change and net change percentage.

<p align="center"> <img width='250' src="https://i.imgur.com/J0SLBFT.png"/> </p>

* `50!-factorial` - calculates the factorial of a number

* `50!-power` - calculates the value of raising a number to the power of a second number

* `50!-square`, and `50!-sqrt` - calculates the square and square root of a number, respectively

* `50!-sq_area`, `50!-rect_area`, and `50!-circle_area` - calculates the area of a square, rectangle and a circle, respectively

* `50!-sq_perimeter`, `50!-rect_perimeter`, and `50!-circle_perimeter` - calculates the perimeter of a square, rectangle and a circle, respectively

* `50!-add`, `50!-multiply`, `50!-difference`, `50!-subtract`, and `50!-divide`

---

## The v1.0

* [x] Stock Figures
* [x] Weather
* [x] Basic Mathematical functions

---

## Run it for yourself

Prerequisites: [Node.JS](https://nodejs.org/en/) (and [npm](https://www.npmjs.com/)), your bot's token, an api key from [Alpha Vantage](https://www.alphavantage.co/), and an api key from [Weather API](https://www.weatherapi.com/).

Fork [the repository](https://github.com/aaryarajoju/AR50), and then clone it to your local device. <br>
In that directory, install [Discord.JS](https://discord.js.org/#/) with the command `npm install discord.js`. <br>
And then, add a file called `config.json` in the same directory, which should contain the following code:

````json
{
    "prefix": "50!-", 
    "token": "<the bot token>",
    "stockApiKey": "<the api key from Alpha Vantage>",
    "weatherApiKey": "<the api key from Weather API>"
}
````

(*You can change the prefix, if you wish*)

For running the program, use the command `node index.js` in the same directory.

<br>

---

Note: The program is [licensed under the MIT open source license](https://github.com/aaryarajoju/AR50/blob/main/LICENSE).

---

## For Contributors

If you wish to contribute to the project, you can create an issue and also send pull requests.

For any suggestions, please contact code.aarya@gmail.com

---
