# Life tracker

Use this to find out where all your time has gone.

## Setup

`npm install`

in the `client` and `server` folders. Or

`pnpm recursive install --link-workspace-packages`

in the root folder.

## Running

`npm start`

in the `server` and `client` folders to start them individually. By default, the server runs on port 8080, change the `PORT` variable in the `server.js` file to change the port, you will also need to change the `proxy` in the `client` folder's `package.json` file.

Built on ReactJS with and an ExpressJS RESTful API server by [Steffan Tucker](https://github.com/steffantucker), [Vlad Tsoy](https://github.com/vladislavtsoy), and [Michael Halstead](https://github.com/redmanedigital)
