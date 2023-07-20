import type {
  SqliteDatabase as KyselySqliteDatabase,
  SqliteStatement as KyselySqliteStatement,
} from "kysely";
import { open } from "react-native-quick-sqlite";
import type {
  QueryResult,
  QuickSQLiteConnection,
} from "react-native-quick-sqlite";

export class SqliteDatabase implements KyselySqliteDatabase {
  #connection: QuickSQLiteConnection;

  constructor(options: { name: string; location?: string }) {
    this.#connection = open(options);
  }

  close(): void {
    this.#connection.close();
  }

  prepare(sql: string): KyselySqliteStatement {
    return new SqliteStatement(this.#connection, sql);
  }
}

class SqliteStatement implements KyselySqliteStatement {
  readonly #connection: QuickSQLiteConnection;
  readonly #query: string;
  readonly reader: boolean;

  constructor(connection: QuickSQLiteConnection, query: string) {
    this.#connection = connection;
    this.#query = query;
    this.reader = query.toLowerCase().startsWith("select");
  }

  all(parameters: readonly unknown[]): unknown[] {
    const result = this.#connection.execute(
      this.#query,
      this.sanitize(parameters)
    );
    return this.parseRows(result);
  }

  run(parameters: readonly unknown[]): {
    changes: number | bigint;
    lastInsertRowid: number | bigint;
  } {
    const result = this.#connection.execute(
      this.#query,
      this.sanitize(parameters)
    );

    return {
      changes: result.rowsAffected,
      lastInsertRowid: result.insertId ?? 0,
    };
  }

  private sanitize(parameters: readonly unknown[]): any[] {
    return parameters.map((value) => {
      if (value instanceof Uint8Array) {
        // `react-native-quick-sqlite` uses ArrayBuffer for blob columns.
        // `dwn-sql-store` uses Uint8Array for blob columns.
        // Provide the parameters to `react-native-quick-sqlite` in the format it expects.
        return value.buffer;
      } else {
        return value;
      }
    });
  }

  private parseRows(result: QueryResult): unknown[] {
    return (
      result.rows?._array.map((row) => {
        for (const key of Object.keys(row)) {
          const value = row[key];
          if (value instanceof ArrayBuffer) {
            // `react-native-quick-sqlite` uses ArrayBuffer for blob columns.
            // `dwn-sql-store` uses Uint8Array for blob columns.
            // Provide the resultant rows back to `dwn-sql-store` in the format it expects.
            row[key] = new Uint8Array(value);
          }
        }
        return row;
      }) ?? []
    );
  }
}
