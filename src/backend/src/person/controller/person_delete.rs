use crate::person::{person_manager::PersonManager, person_types::Person};
use ic_cdk::update;

#[update]
pub fn person_delete(id: u32) -> Result<Person, String> {
    PersonManager::delete(id)
}
