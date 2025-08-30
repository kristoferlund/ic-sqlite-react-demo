fn main() {
    ic_sql_migrate::list(Some("migrations")).unwrap();
}
