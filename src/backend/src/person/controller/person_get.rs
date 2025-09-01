use crate::person::{person_manager::PersonManager, person_types::Person};
use ic_cdk::query;

#[query]
pub fn person_get(id: i64) -> Result<Person, String> {
    PersonManager::get(id)
}
