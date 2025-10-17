use ic_cdk::export_candid;
use ic_cdk::{init, post_upgrade, pre_upgrade};
use ic_rusqlite::{close_connection, with_connection, Connection};

use person::person_types::*;

mod person;
mod seeds;

static MIGRATIONS: &[ic_sql_migrate::Migration] = ic_sql_migrate::include_migrations!();

fn run_migrations_and_seeds() {
    with_connection(|mut conn| {
        let conn: &mut Connection = &mut conn;
        ic_sql_migrate::sqlite::migrate(conn, MIGRATIONS).unwrap();
        ic_sql_migrate::sqlite::seed(conn, seeds::SEEDS).unwrap();
    });
}

#[init]
fn init() {
    run_migrations_and_seeds();
}

#[pre_upgrade]
fn pre_upgrade() {
    close_connection();
}

#[post_upgrade]
fn post_upgrade() {
    run_migrations_and_seeds();
}

export_candid!();
