import { Resource } from "fhir/r2";
import { Pool } from "pg";

const pool = new Pool();

pool.on("error", (error) => {
  console.error(error);
  process.exit(-1);
});

const create =
  (pool: Pool) =>
  async (resource: Resource): Promise<Resource> => {
    const query = await pool.query("SELECT fhirbase_create($1::jsonb)", [
      JSON.stringify(resource),
    ]);
    return query.rows[0].fhirbase_create;
  };

const update =
  (pool: Pool) =>
  async (resource: Resource): Promise<Resource> => {
    const query = await pool.query("SELECT fhirbase_update($1::jsonb)", [
      JSON.stringify(resource),
    ]);
    return query.rows[0].fhirbase_update;
  };

const del = async (pool: Pool) => async (resource: Resource) => {
  const query = await pool.query("SELECT fhirbase_delete($1, $2)", [
    resource.resourceType,
    resource.id,
  ]);
  return query.rows[0].fhirbase_delete;
};

const getById =
  (pool: Pool) =>
  (entity: string) =>
  async (id: string): Promise<Resource> => {
    const response = await pool.query(
      `SELECT * FROM public.${entity} AS entity 
     WHERE entity.id = $1 ORDER BY txid DESC LIMIT 1;`,
      [id]
    );

    return response.rows[0];
  };

const getAll =
  (pool: Pool) =>
  async (entity: string): Promise<Resource[]> => {
    const response = await pool.query(
      `SELECT * FROM public.${entity} AS entity 
     ORDER BY txid DESC;`
    );
    return response.rows;
  };

const createFhirbase = (pool: Pool) => ({
  getById: getById(pool),
  getAll: getAll(pool),
  create: create(pool),
  update: update(pool),
  delete: del(pool),
  query: pool.query.bind(pool),
});

export const fhirbase = createFhirbase(pool);
