use crate::person::{
    person_manager::PersonManager,
    person_types::{Person, PersonCreateDto},
};
use ic_cdk::update;

#[update]
pub fn person_create(input: PersonCreateDto) -> Result<Person, String> {
    PersonManager::create(input)
}
