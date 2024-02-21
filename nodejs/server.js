const axios = require('axios');
const config = require('./config/config.json')

const summonerName = encodeURIComponent('빵준갓'); 
const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

const headers = {
    "X-Riot-Token": config['X-Riot-Token']
};

axios.get(url, { headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
