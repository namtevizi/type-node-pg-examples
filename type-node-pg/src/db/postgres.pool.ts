import pg from "pg";

export default class PostgresPool {
  pool: pg.Pool;

  constructor(dbConfig: pg.PoolConfig) {
    this.pool = new pg.Pool(dbConfig);

    this.pool.on("error", function (err: Error, _client: any) {
      console.log(`Idle-Client Error:\n${err.message}\n${err.stack}`);
    });
  }

  /**
   * Create a client using one of the pooled connections
   *
   * @return client
   */
  async connect(): Promise<pg.PoolClient> {
    const client = await this.pool.connect();
    return client;
  }

  /**
   * Drain the pool of all active clients, disconnect them, and shut down 
   * any internal timers in the pool.
   * 
   * @return Promise<void>
   */
  async end(): Promise<void> {
    return this.pool.end();
  }
}
