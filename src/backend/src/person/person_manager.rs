use super::person_types::{Person, PersonCreateDto, PersonUpdateDto, QueryParamsDto};
use ic_rusqlite::with_connection;

pub struct PersonManager {}

impl PersonManager {
    pub fn get(id: i64) -> Result<Person, String> {
        with_connection(|conn| {
            let sql = r#"
                SELECT
                  id,
                  name,
                  age,
                  created_at,
                  updated_at
                FROM person
                WHERE id = ?1
            "#;

            conn.query_row(sql, (id,), |row| {
                Ok(Person {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    age: row.get::<_, i64>(2)? as u32,
                    created_at: row.get(3)?,
                    updated_at: row.get(4)?,
                })
            })
            .map_err(|e| e.to_string())
        })
    }

    pub fn create(dto: PersonCreateDto) -> Result<Person, String> {
        with_connection(|conn| {
            let sql = r#"
            INSERT INTO person (name, age)
            VALUES (?1, ?2)
            RETURNING
              id,
              name,
              age,
              created_at,
              updated_at
        "#;

            conn.query_row(sql, (dto.name.as_ref(), dto.age), |row| {
                Ok(Person {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    age: row.get::<_, i64>(2)? as u32,
                    created_at: row.get(3)?, // epoch seconds
                    updated_at: row.get(4)?,
                })
            })
            .map_err(|e| e.to_string())
        })
    }

    pub fn update(dto: PersonUpdateDto) -> Result<Person, String> {
        with_connection(|conn| {
            let sql = r#"
                UPDATE person
                SET name = COALESCE(?1, name),
                    age = COALESCE(?2, age),
                    updated_at = strftime('%s','now')
                WHERE id = ?3
                RETURNING id, name, age, created_at, updated_at
            "#;

            conn.query_row(
                sql,
                (dto.name.as_ref().map(|n| n.as_ref()), dto.age, dto.id),
                |row| {
                    Ok(Person {
                        id: row.get(0)?,
                        name: row.get(1)?,
                        age: row.get::<_, i64>(2)? as u32,
                        created_at: row.get(3)?,
                        updated_at: row.get(4)?,
                    })
                },
            )
            .map_err(|e| e.to_string())
        })
    }

    pub fn delete(id: i64) -> Result<Person, String> {
        with_connection(|conn| {
            let sql = r#"
                DELETE FROM person
                WHERE id = ?1
                RETURNING id, name, age, created_at, updated_at
            "#;

            conn.query_row(sql, (id,), |row| {
                Ok(Person {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    age: row.get::<_, i64>(2)? as u32,
                    created_at: row.get(3)?,
                    updated_at: row.get(4)?,
                })
            })
            .map_err(|e| e.to_string())
        })
    }

    pub fn query(params: QueryParamsDto) -> Result<Vec<Person>, String> {
        with_connection(|conn| {
            let sql = r#"
            SELECT
              id,
              name,
              age,
              created_at,
              updated_at
            FROM person
            ORDER BY id
            LIMIT ?1 OFFSET ?2
        "#;

            let mut stmt = conn.prepare(sql).map_err(|e| e.to_string())?;

            let rows = stmt
                .query_map((params.limit as i64, params.offset as i64), |row| {
                    Ok(Person {
                        id: row.get(0)?,
                        name: row.get(1)?,
                        age: row.get::<_, i64>(2)? as u32,
                        created_at: row.get(3)?,
                        updated_at: row.get(4)?,
                    })
                })
                .map_err(|e| e.to_string())?;

            // Collect all Person results (propagate row mapping errors)
            rows.collect::<ic_rusqlite::Result<Vec<_>>>()
                .map_err(|e| e.to_string())
        })
    }

    pub fn count() -> Result<i32, String> {
        with_connection(|conn| {
            conn.query_row("SELECT COUNT(*) FROM person", [], |row| {
                row.get(0).map(|c: i64| c as i32)
            })
            .map_err(|e| e.to_string())
        })
    }
}
