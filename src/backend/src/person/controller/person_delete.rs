use crate::person::{person_manager::PersonManager, person_types::Person};
use ic_cdk::update;

#[update]
pub fn person_delete(id: i64) -> Result<Person, String> {
    PersonManager::delete(id)
}
