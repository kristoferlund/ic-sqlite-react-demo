use candid::CandidType;
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Serialize, Deserialize, Debug, Validate, CandidType)]
pub struct Person {
    pub id: i32,

    pub name: String,

    pub age: i32,

    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(Clone, Deserialize, Debug, CandidType)]
#[serde(try_from = "String", into = "String")]
pub struct Name(String);

impl TryFrom<String> for Name {
    type Error = String;
    fn try_from(s: String) -> Result<Self, Self::Error> {
        let n = s.chars().count();
        if (3..=50).contains(&n) {
            Ok(Name(s))
        } else {
            Err("name length must be 3..=50".into())
        }
    }
}
impl AsRef<str> for Name {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

#[derive(Deserialize, Debug, CandidType)]
pub struct PersonCreateDto {
    pub name: Name,
    pub age: u32,
}

#[derive(Deserialize, Debug, CandidType)]
pub struct PersonUpdateDto {
    pub id: u32,
    pub name: Option<Name>,
    pub age: Option<u32>,
}

#[derive(Serialize, Deserialize, Debug, CandidType)]
pub struct QueryParamsDto {
    pub limit: u32,
    pub offset: u32,
}
