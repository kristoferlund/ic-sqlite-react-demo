use candid::CandidType;
use ic_rusqlite::ToSql;
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Serialize, Deserialize, Debug, Validate, CandidType)]
pub struct Person {
    pub id: i64,

    pub name: String,

    pub age: u32,

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

#[derive(Clone, Deserialize, Debug, CandidType)]
#[serde(try_from = "u32", into = "u32")]
pub struct Age(u32);

impl TryFrom<u32> for Age {
    type Error = String;
    fn try_from(value: u32) -> Result<Self, Self::Error> {
        if (0..=150).contains(&value) {
            Ok(Age(value))
        } else {
            Err("age must be between 0 and 150".into())
        }
    }
}

impl From<Age> for u32 {
    fn from(age: Age) -> u32 {
        age.0
    }
}

impl AsRef<u32> for Age {
    fn as_ref(&self) -> &u32 {
        &self.0
    }
}

impl ToSql for Age {
    fn to_sql(&self) -> ic_rusqlite::Result<ic_rusqlite::types::ToSqlOutput<'_>> {
        Ok(ic_rusqlite::types::ToSqlOutput::Owned(
            ic_rusqlite::types::Value::Integer(self.0 as i64),
        ))
    }
}

#[derive(Deserialize, Debug, CandidType)]
pub struct PersonCreateDto {
    pub name: Name,
    pub age: Age,
}

#[derive(Deserialize, Debug, CandidType)]
pub struct PersonUpdateDto {
    pub id: i64,
    pub name: Option<Name>,
    pub age: Option<Age>,
}

#[derive(Serialize, Deserialize, Debug, CandidType)]
pub struct QueryParamsDto {
    pub limit: u32,
    pub offset: u32,
}
