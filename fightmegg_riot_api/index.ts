import config from './config/config.json';

import { RiotAPI, PlatformId } from '@fightmegg/riot-api';

(async () => {
    const XRiotToken: string = config['X-Riot-Token'];
    const rAPI: RiotAPI = new RiotAPI(XRiotToken);

    try {
        const summoner = await rAPI.account.getByRiotId({
            region: PlatformId.ASIA, 
            gameName: "빵준갓", 
            tagLine: "KR1",
        });

        console.log("summoner:", summoner);

        const matchesIds: string[] = await rAPI.matchV5.getIdsByPuuid({
            cluster: PlatformId.ASIA,
            puuid: summoner.puuid,
            params: { count: 20 },
        });

        console.log("MatchIds:", matchesIds);

        let normalMatchIds: string[] = [];
        let rankMatchIds: string[] = [];

        for (const matchId of matchesIds) {
            if (normalMatchIds.length === 10 && rankMatchIds.length === 10) break;

            const matchInformation = await rAPI.matchV5.getMatchById({
                cluster: PlatformId.ASIA,
                matchId,
            });

            if (matchInformation.info.queueId === 420) { // Rank
                if (rankMatchIds.length < 10) rankMatchIds.push(matchId);
            } else if (matchInformation.info.queueId === 490) { // Normal
                if (normalMatchIds.length < 10) normalMatchIds.push(matchId);
            }
        }

        console.log("Rank game matchIds:", rankMatchIds);
        console.log("Normal game matchIds:", normalMatchIds);

    } catch (error) {
        console.error(error);
    }
})();
