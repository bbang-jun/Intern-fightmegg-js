import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api';
import { DDragon } from '@fightmegg/riot-api';

// JSON 파일을 import 시 assert 구문을 추가함으로써 throw new ERR_IMPORT_ASSERTION_TYPE_MISSING(url, validType); 오류 해결
const config = await import('./config/config.json', {assert: { type: 'json' }});

(async () => {
    const XRiotToken = config.default['X-Riot-Token'];
    const rAPI = new RiotAPI(XRiotToken);

    try {

        // 소환사명과 태그로 puuid 조회
        // /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
        // Get account by riot id
        const summoner = await rAPI.account.getByRiotId(
            {
              region: PlatformId.ASIA, 
              gameName: "빵준갓", 
              tagLine: "KR1",
            }
        );

        console.log("summoner:", summoner);

        // summoner id로 match id 조회
        // MATCH-V5 /lol/match/v5/matches/by-puuid/{puuid}/ids
        // Get a list of match ids by puuid
        const matchesIds = await rAPI.matchV5.getIdsByPuuid(
          {
            cluster: PlatformId.ASIA,
            puuid: summoner.puuid,
            params: {
              count: 20
            },
          }
        );

        console.log("MatcheIds:", matchesIds);


        let normalMatchIds = [];
        let rankMatchIds = [];

        // match id로 match 정보 조회하고 랭겜, 일반겜 각각 최대 10개까지 저장
        // /lol/match/v5/matches/{matchId}
        // Get a match by match id
        for (const matchId of matchesIds){
          
          if (normalMatchIds.length === 10 && rankMatchIds.length === 10) {
            break;
          }

          const matchInformation = await rAPI.matchV5.getMatchById(
            {
            cluster: PlatformId.ASIA,
            matchId: matchId
            }
          );

          // console.log("MatcheId:", matchId);
          // console.log(matchInformation.info.queueId);
          
          if (matchInformation.info.queueId === 420){ // rank
            if(rankMatchIds.length == 10){
              continue;
            }
            rankMatchIds.push(matchId);
          }
          else if (matchInformation.info.queueId === 490){ // normal
            if(normalMatchIds.length == 10){
              continue
            }
            normalMatchIds.push(matchId);
          }
          // console.log(`match info about ${matchId}:`, JSON.stringify(matchInformation));
        }

        console.log("rank game matchId:", rankMatchIds);
        console.log("normal game matchId:", normalMatchIds);

    } catch (error) {
        console.error(error);
    }
})();
