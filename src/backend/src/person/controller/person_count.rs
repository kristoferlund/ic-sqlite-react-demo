use crate::person::person_manager::PersonManager;
use ic_cdk::query;

#[query]
pub fn person_count() -> Result<i32, String> {
    PersonManager::count()
}
