# Using node-github-pr-automation

## Setting up the tool

1. `$ git clone git@github.com:dixieio/node-github-pr-automation.git`
2. `$ mv .env.example .env`
3. Update the `.env` file with your variables
4. `$ nodemon index.js`
5. Authenticate you application through the browser

## Setting up github
1. Create a Oauth application in the org. settings
2. Set the github call back url to the <your.server>.com/oath/github/callback
3. Set up the webhooks that your heart desire

Enjoy a the tool :)
