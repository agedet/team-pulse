import { Injectable, OnModuleInit } from "@nestjs/common";
// import { Sql } from "postgres";
const postgres = require('postgres');


@Injectable()
export class SupabaseService implements OnModuleInit {
  private sql; 

  onModuleInit() {
    this.sql = postgres(process.env.DATABASE_URL!, {
      ssl: 'require',
      max: 10,
    });
  }

  get client() {
    return this.sql;
  }

  async query (strings: TemplateStringsArray, ...params: any[])  {
    return this.sql(strings, ...params);
  }
}