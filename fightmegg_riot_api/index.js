import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import { DDragon } from '@fightmegg/riot-api';

// JSON 파일을 import 시 assert 구문을 추가함으로써 throw new ERR_IMPORT_ASSERTION_TYPE_MISSING(url, validType); 오류 해결
const config = await import('./config/config.json', {
  assert: { type: 'json' }
});

(async () => {
    const XRiotToken = config.default['X-Riot-Token'];
    const rAPI = new RiotAPI(XRiotToken);

    try {
        // 소환사 정보 조회
        const summoner = await rAPI.summoner.getBySummonerName({
            region: PlatformId.KR,
            summonerName: "빵준갓",
        });

        console.log("Summoner:", summoner);

        const matches = await rAPI.matchV5.getIdsByPuuid({
            cluster: PlatformId.ASIA,
            puuid: summoner.puuid,
        });

        console.log("Matches:", matches);
    } catch (error) {
        console.error(error);
    }
})();
