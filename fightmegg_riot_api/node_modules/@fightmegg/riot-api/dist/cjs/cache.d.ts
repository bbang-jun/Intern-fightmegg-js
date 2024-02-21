import { Redis, RedisOptions } from "ioredis";
export declare class RedisCache {
    readonly client: Redis;
    readonly keyPrefix: string;
    constructor(redisClientOpts: RedisOptions | string);
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: object, ttl: number): Promise<string>;
    flush(): Promise<string>;
}
export declare class MemoryCache {
    cache: {
        [key: string]: {
            expires: number;
            value: object;
        };
    };
    constructor();
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: object, ttl: number): Promise<"OK">;
    flush(): Promise<string>;
}
