
<h1 align="center">Halo Stream Overlay with Discord & Twitch integration</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D12.19.0-blue.svg" />
  <img src="https://img.shields.io/badge/yarn-%3E%3D1.22.5-blue.svg" />
  <a href="https://choosealicense.com/licenses/gpl-3.0/" target="_blank">
    <img alt="License: GNU GPLv3" src="https://img.shields.io/badge/License-GNU GPLv3-yellow.svg" />
  </a>
  <img src="https://img.shields.io/maintenance/yes/2021" />
  <br />
  <a href="https://discord.gg/74UAq84" target="_blank">
    <img src="https://img.shields.io/discord/443833089966342145?color=7289DA&label=Halo%20Cr%C3%A9ation&logo=Discord" />
  </a>
  <a href="https://twitter.com/HaloCreation" target="_blank">
    <img src="https://img.shields.io/twitter/follow/HaloCreation?color=%232da1f3&logo=Twitter&style=flat-square" />
  </a>
</p>
A webapp providing Halo-themed overlays you can add as browser sources in OBS. It can shows the people in a Discord voice chat and display alerts whenever the channel gets a new follower or subscriber.

## Disclaimer
- Because of how Twitch works, you must host this app on a server. 
- Some basic knowledge on how to deploy a website is required, but feel free to contact us on [Discord](https://discordapp.com/invite/74UAq84) if you'd like some help. 
- This webapp runs on NodeJS ([download](https://nodejs.org/en/))

## 1. Discord Setup
TBD

## 2. Twitch Setup
TBD

## 4. Install
```bash
# clone the project
git clone TBD

cd halocrea-twitch-discord-overlay

# set the required environment variables 
$ cp .env.dist .env

# provide the proper values to the required environment variables
$ vi .env 
```
Please note that you **must** provide the environment variables in the `.env` file.
```bash
# install dependencies
$ yarn

# build the project
$ yarn build

# start the webapp
$ yarn start
```

## 5. Deploy with Docker & Traefik
If you want to run and deploy this app using Docker & Traefik, follow these steps:
1. in the `.env` file, provide your domain name with the `DOMAIN_NAME` variable.
2. `$ docker build . -t halo-stream-overlay`
3. `$ docker-compose up -d` 

## 6. Credits
- Icyhotspartin for the default sub alert sounds: https://soundcloud.com/icyhot_mus (used with permission)
- Feather Icons for most icons: https://feathericons.com/
- Font Awesome for a few others: https://fontawesome.com/
- "Halo Theme Kazoo Orchestrea (ft. my desk) by joosebox: https://www.youtube.com/watch?v=l_DfCFHOD9E 