# ViNiInvest

- Inspired by the Robinhood investment website, I developed a small stock simulation trading website, especially suitable for novices to start their stock investment journey!

- As a lightweight investment website, I focus on a few core features:

  - Portfolio: You can create different types of portfolios. When you trade, select a specific portfolio and your trades will be aggregated into your portfolio.

  - Stock: You have the option to browse for particular stocks that align with your preferences. Upon accessing the stock's page, you can input its details, designate it as a favorite, and initiate trading. Each stock is accompanied by a price chart and your transaction history pertaining to it. Additionally, you can access analysts' opinions on the stock and even share your own analysis report. Furthermore, you can stay updated with news relevant to the stock.

  - Transaction: To initiate a stock trade, you must access the details page of the stock, where you'll find the trading form. Once you've submitted your order, you'll need to confirm the transaction by clicking. You'll have the option to modify or delete the transaction before confirming it. Once confirmed, orders cannot be altered or canceled. Conversely, when you wish to divest from the stock, you can opt to sell it.

  - Watchlist: On the details page of a particular stock, you have the option to include it in your customized watchlist. Multiple watchlists can be established to organize and monitor various stocks accordingly. Your portfolio page provides an overview of all your watchlists, where you can manage them by editing their contents, altering their names, or deleting redundant watchlists.

## Website Hosted On
[![Render](https://img.shields.io/badge/Render-%46E3B7.svg?logo=render&logoColor=white)](https://viniinvest.onrender.com)

## Contact Me
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicky-li/)
![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white)
![Gmail](https://img.shields.io/badge/happylemonlcm@gmail.com-gray?logoColor=white)

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?logo=python&logoColor=ffdd54)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?logo=reacthookform&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?logo=redux&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?logo=flask&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-aws&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?logo=npm&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?logo=markdown&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?logo=render&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?logo=visual-studio-code&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?logo=github&logoColor=white)

## Database Schema Design

![viniinvest-database-schema]

[viniinvest-database-schema]: ./react-vite/public/images/vini_invest_schema.jpg

## Installation Guide

1. Clone this repository (only main branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Demo

## Technologies
* Framework and DB
  * Python
  * JavaScript
  * Flask
  * React
  * Postgres (production)
  * Sqlite (development)
  * Redux (state management)
* Third-party APIs
  * Alpha Vantage API
    * Time Series Stock Data APIs
      * Fetch stock prices
  * Polygon.io News API
    * Fetch stock news
* SQLAlchemy
  * ORM for easier CRUD operations on the database
* AWS
  * Cloud hosting service for image(s) uploading
* Boto3 & Botocore
  * Used to create, configure, and manage AWS services
* Redux State Hydration
  * Avoid unecessary fetches from the database, speed up application, and increase users' experience while ensuring data integrity across pages
* CSRF Protection
  * By exchanging tokens for non-GET requests
* Prevent SQL injections
  * By sanitize queries input
* Prevent Rainbow Table attacks
  * By salt and hash passwords before storing in the database
  * Prevent XSS attacks
  * Force all inputs to be text
  * Also applied csrf practice mentioned above for extra layer of protection
* CORS
  * Enabled during development
* DBDiagram
  * Used for design and sketch database schema, assign associations amongst tables
* Chart.js
  * Simple yet flexible JavaScript charting library for the modern web


## Features
 - See github wiki page

## API Documentation
