CREATE TABLE IF NOT EXISTS person (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL CHECK (length(name) BETWEEN 3 AND 50),
    age         INTEGER CHECK (age >= 0 AND age <= 150),
    created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    updated_at  INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);
