# Guess the Price - Zillow Listing Guessing Game

## End-Goal
Have a guessing game that fetches a random Zillow listing and has the user guess the price based on the images and location. This web app uses Python on the back-end and Flask as the web framework to send info to the front-end, where I am rendering the user interface using HTML/CSS/JS. 

## Components
This project involves multiple components of web scraping to fetch Zillow data.

### main.py
Fetches a random zipcode and uses a submodule Python file (zillow.py) to return a dataframe full of listings.

### RandomZipcode.py
Searches the provided Excel spreadsheet of 30,000+ zipcodes and returns a random one.

### Referenced Code
Zillow.py - URL: https://github.com/maxwellbade/zillow_scrape_python
Edited to fit my needs, this file is used to take in a random zipcode and return a dataframe (max 40) of listings.

## Progress
I will be working on this project when I can, and I aim to make it a fun game! 😄

Note: The referenced code (zillow.py) is used with permission from the original author (https://github.com/maxwellbade).
