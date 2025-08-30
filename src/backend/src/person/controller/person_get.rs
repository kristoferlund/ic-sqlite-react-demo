use crate::person::{person_manager::PersonManager, person_types::Person};
use ic_cdk::update;

#[update]
pub fn person_get(id: u32) -> Result<Person, String> {
    PersonManager::get(id)
}
