-- Only seed if table is empty
INSERT INTO person (name, age)
SELECT * FROM (
    SELECT 'Alice' as name, 30 as age
    UNION ALL SELECT 'Bob', 25
    UNION ALL SELECT 'Charlie', 35
    UNION ALL SELECT 'Diana', 28
    UNION ALL SELECT 'Eve', 40
) AS seed_data
WHERE NOT EXISTS (SELECT 1 FROM person);
