fn main() {
    ic_sql_migrate::Builder::new()
        .with_migrations_dir("migrations")
        .with_seeds_dir("src/seeds")
        .build()
        .unwrap();
}
