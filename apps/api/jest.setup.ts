import type { Config } from '@jest/types';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { exec } from 'node:child_process';
import { Client } from 'pg';
import { exit } from 'process';
import { promisify } from 'util';

dotenv.config({ path: '.env.testing' });
const execSync = promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: Config.ProjectConfig) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(config);

    const dbUser = process.env.POSTGRES_USER;
    const dbPass = process.env.POSTGRES_PASSWORD;
    const dbName = process.env.POSTGRES_DB;

    if (!dbUser || !dbPass || !dbName) {
      throw new Error(
        `Env variables for testing not found. Forgot to create .env.testing file?`,
      );
      exit(1);
    }

    const dbHost = 'localhost';
    const dbPort = '5432';

    this.schema = `test_${randomUUID()}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
