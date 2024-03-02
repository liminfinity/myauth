import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()
export class DAL {
    protected pool: pg.Pool
    constructor() {
        this.pool = new pg.Pool({
            database: 'auth',
            host: process.env.DB_HOST,
            port: +(process.env.DB_PORT || 5432),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            max: 20,
            idleTimeoutMillis: 1 * 60 * 1000
        })
        process.on('SIGINT', () => {
            this.pool.end()
        })
    }
}

