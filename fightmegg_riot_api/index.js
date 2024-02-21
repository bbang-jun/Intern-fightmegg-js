import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api'

// JSON 파일을 import 시 assert 구문을 추가함으로써 throw new ERR_IMPORT_ASSERTION_TYPE_MISSING(url, validType); 오류 해결
const config = await import('./config/config.json', {
  assert: { type: 'json' }
});

(async () => {
    const XRiotToken = config.default['X-Riot-Token'];
    const rAPI = new RiotAPI(XRiotToken);

    try {
      const summoner = await rAPI.summoner.getBySummonerName({
          region: PlatformId.KR,
          summonerName: "빵준갓",
      });

      console.log(summoner);
  } catch (error) {
      console.error(error);
  }
})()