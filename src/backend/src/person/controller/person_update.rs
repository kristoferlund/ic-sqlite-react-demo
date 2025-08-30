use crate::person::{
    person_manager::PersonManager,
    person_types::{Person, PersonUpdateDto},
};
use ic_cdk::update;

#[update]
pub fn person_update(person_update_dto: PersonUpdateDto) -> Result<Person, String> {
    PersonManager::update(person_update_dto)
}
