use ic_cdk::export_candid;
use ic_cdk::{init, post_upgrade, pre_upgrade};
use ic_rusqlite::{close_connection, with_connection, Connection};

use person::person_types::*;

mod person;

static MIGRATIONS: &[ic_sql_migrate::Migration] = ic_sql_migrate::include!();

fn run_migrations() {
    with_connection(|mut conn| {
        let conn: &mut Connection = &mut conn;
        ic_sql_migrate::up(conn, MIGRATIONS).unwrap();
    });
}

#[init]
fn init() {
    run_migrations();
}

#[pre_upgrade]
fn pre_upgrade() {
    close_connection();
}

#[post_upgrade]
fn post_upgrade() {
    run_migrations();
}

export_candid!();
