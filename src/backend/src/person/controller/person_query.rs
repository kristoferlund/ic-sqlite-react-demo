use crate::person::{
    person_manager::PersonManager,
    person_types::{Person, QueryParamsDto},
};
use ic_cdk::query;

#[query]
pub fn person_query(dto: QueryParamsDto) -> Result<Vec<Person>, String> {
    PersonManager::query(dto)
}
