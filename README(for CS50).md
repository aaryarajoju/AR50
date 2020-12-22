# AR50

<p align="center"> <img width='100' src="https://i.imgur.com/d0ROR0E.png"/> </p>

## Introduction

AR50 is a discord bot built using [Discord.JS](https://discord.js.org/#/), capable of doing a lot of miscellaneous tasks, like showing the current weather, getting stock details, and some mathematical functions.
[Link to the GitHub Repository](https://github.com/aaryarajoju/AR50)

---

## How I Made It

I started by learning JavaScript through YouTube. After that, I learnt using the Discord.JS library by making some test bots.
Once I become comfortable with coding in JavaScript and using Discord.JS, I started to think about what commands I wanted to add to the bot. I settled on some mathematical functions, along with a weather command, and a stock command.

For the weather command, I took help of the [Weather API](https://www.weatherapi.com/), and from that data, I took the current temperature, the weather condition, the feels-like temperature and the icon, and showed that as a response to the user.

For the stock command, I took help of the API from [Alpha Vantage](https://www.alphavantage.co/), and from that data, filtered the two latest stock prices (current day and previous day), showing the user, the stock price on that day, and also the net change from the previous day.

For the mathematical commands, I used the arithmetic functions, loops, and also the JavaScript Math library.

---

## How The Bot Works

The bot uses the Discord.JS library to communicate with the Discord API.
When a message starts with the bot prefix, which is `50!-` in this case, the program processes the message into a primary command, and a setof arguements. If the primary command doesn't match any of the commands, the bot tells that it is an unknown command.
If the primary command, does however match a command, the program then checks if the number of arguements are of the right length, if not, the bot tells how to use that particular command. And, if the arguements are of the right length, it then goes on to do that command.

The Stock command, sends an API call to Alpha Vantage with the keyword of the company that the user searches, and it gets a JSON file as a response. From that JSON file, the program finds the stock prices of the current day and the previous day. Then, it shows the current stock price and the net change as the reponse to the user.

The Weather command sends an API call to Weather API with the place as a search query, and gets a JSON file as a response. From that JSON file, the program takes the value of the current temperature (in both °C and °F), the feels like temperature, and the current weather condition, along with an icon, and shows that as a response to the user.

The Mathematical commands work on simple arithmatic operators, and loops.

---

## Usage

### Commands

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
