import { Resource } from "fhir/r4";
import * as Array from "fp-ts/Array";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { map, Option } from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { Pool, QueryResult } from "pg";

const pool = new Pool();

pool.on("error", (error) => {
  console.error(error);
  process.exit(-1);
});

interface Row {
  resource: Resource;
  fhirbase_create?: Resource;
  fhirbase_update?: Resource;
  fhirbase_delete?: Resource;
}

type Operations = "fhirbase_create" | "fhirbase_update" | "fhirbase_delete";

export type DatabaseResult<T> = Promise<E.Either<string, T>>;

const onDatabaseError = (): string => "Database error";

const getSingleRowResult =
  (operation: Operations) => (result: QueryResult<Row>) =>
    result.rows?.[0]?.[operation];

const create =
  (pool: Pool) =>
  async (resource: Resource): DatabaseResult<Resource> =>
    pipe(
      await TE.tryCatch(
        () =>
          pool.query<Row>("SELECT fhirbase_create($1::jsonb)", [
            JSON.stringify(resource),
          ]),
        onDatabaseError
      )(),
      E.map(getSingleRowResult("fhirbase_create"))
    );

const update =
  (pool: Pool) =>
  async (resource: Resource): DatabaseResult<Resource> =>
    pipe(
      await TE.tryCatch(
        () =>
          pool.query("SELECT fhirbase_update($1::jsonb)", [
            JSON.stringify(resource),
          ]),
        onDatabaseError
      )(),
      E.map(getSingleRowResult("fhirbase_update"))
    );

const del = (pool: Pool) => (resourceType: string) => async (id: string) =>
  pipe(
    await TE.tryCatch(
      () => pool.query("SELECT fhirbase_delete($1, $2)", [resourceType, id]),
      onDatabaseError
    )(),
    E.map(getSingleRowResult("fhirbase_delete"))
  );

const getById =
  (pool: Pool) =>
  (entity: string) =>
  async (id: string): DatabaseResult<Option<Resource>> =>
    pipe(
      await TE.tryCatch(
        () =>
          pool.query<Row>(
            `SELECT *
                                 FROM public.${entity} AS entity
                                 WHERE entity.id = $1
                                 ORDER BY txid DESC
                                 LIMIT 1;`,
            [id]
          ),
        onDatabaseError
      )(),
      E.map((result) => pipe(Array.head(result.rows), map(getResource)))
    );

const getAll =
  (pool: Pool) =>
  (entity: string) =>
  async (): Promise<E.Either<string, Resource[]>> =>
    pipe(
      await TE.tryCatch(
        () =>
          pool.query<Row>(
            `SELECT *
                                 FROM public.${entity} AS entity
                                 ORDER BY txid DESC;
                                `
          ),
        onDatabaseError
      )(),
      E.map((r: QueryResult) => r.rows),
      E.map(Array.map(getResource))
    );

const getResource = (row: Row) => row.resource;

const createFhirbase = (pool: Pool, entity: string): Fhirbase => ({
  getById: getById(pool)(entity),
  getAll: getAll(pool)(entity),
  create: create(pool),
  update: update(pool),
  delete: del(pool)(entity),
});

interface Fhirbase {
  getById: (id: string) => DatabaseResult<Option<Resource>>;
  getAll: () => DatabaseResult<Resource[]>;
  create: (resource: Resource) => DatabaseResult<Resource>;
  update: (r: Resource) => DatabaseResult<Resource>;
  delete: (id: string) => DatabaseResult<Resource>;
}

export const fhirbase = (entity: string): Fhirbase =>
  createFhirbase(pool, entity);
