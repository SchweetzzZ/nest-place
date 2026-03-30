import { Injectable, Inject } from "@nestjs/common"
import Redis from "ioredis"

@Injectable()
export class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) { }
    async get<T>(key: string): Promise<T | null> {
        const data = await this.redis.get(key)
        return data ? JSON.parse(data) : null
    }
    async set<T>(key: string, value: any, ttl = 60) {
        await this.redis.set(key, JSON.stringify(value), 'EX', ttl)
    }
    async del(key: string) {
        return this.redis.del(key)
    }
}
