# AI Agent Instructions

Comprehensive instructions for AI agents working with this Internet Computer (IC) application - a full-stack Web3 CRUD system with SQLite persistence.

## Tech Stack

**Backend:** Rust, IC CDK, SQLite (ic-rusqlite)  
**Frontend:** React 19, TypeScript, Vite 6, Tailwind 4, shadcn/ui, Tanstack Query/Router, SWC

## Project Structure

```
ic-sqlite-tanstack-db_1/
├── src/
│   ├── backend/
│   │   ├── src/
│   │   │   └── person/
│   │   │       ├── controller/      # IC endpoint handlers
│   │   │       ├── person_manager.rs # Business logic
│   │   │       └── person_types.rs   # Data types
│   │   ├── backend.did  # Auto-generated Candid interface (DO NOT edit manually)
│   │   └── Cargo.toml
│   └── frontend/
├── scripts/
│   └── build-backend.sh  # Compiles Rust → WASM → IC, extracts Candid
└── dfx.json
```

## Critical Workflow Rules

### After Backend Changes
1. Run `dfx build backend` - This automatically:
   - Compiles Rust to WebAssembly
   - Converts WASI to IC-compatible WASM
   - Extracts Candid interface to backend.did
   - Generates TypeScript declarations
2. Fix ALL compilation errors before proceeding
3. Deploy: `dfx deploy backend`
4. Test: `dfx canister call backend <function> '(<args>)'`

### After Frontend Changes
1. Run `dfx build frontend`
2. Fix ALL TypeScript/build errors
3. Deploy: `dfx deploy frontend`
4. For dev with hot reload: `pnpm run dev`

**NEVER mark a task complete with errors present.**

## Architecture Patterns

### Three-Layer Validation (Required at ALL levels)

1. **SQL Level:** Database constraints
   ```sql
   name TEXT NOT NULL CHECK(LENGTH(name) BETWEEN 3 AND 50)
   ```

2. **Controller Level:** Rust new types
   ```rust
   pub struct Name(String);
   impl Name {
       pub fn new(s: String) -> Result<Self, String> {
           if s.len() < 3 || s.len() > 50 {
               return Err("Name must be between 3 and 50 characters".to_string());
           }
           Ok(Name(s))
       }
   }
   ```

3. **Frontend Level:** Form validation for immediate user feedback

### Manager Pattern
Static methods for all database operations:
```rust
impl PersonManager {
    pub fn create(dto: PersonCreateDto) -> Result<Person, String>
    pub fn get(id: u32) -> Result<Person, String>
    pub fn update(dto: PersonUpdateDto) -> Result<Person, String>
    pub fn delete(id: u32) -> Result<Person, String>
    pub fn query(params: QueryParamsDto) -> Result<Vec<Person>, String>
    pub fn count() -> Result<i32, String>
}
```

### Controller Pattern
```rust
#[query]  // Read operations
pub fn person_get(id: u32) -> Result<Person, String>

#[update] // Write operations
pub fn person_create(dto: PersonCreateDto) -> Result<Person, String>
```

## Type Guidelines

- Use `i32` for IDs and numbers (avoids JavaScript BigInt issues)
- Use `i64` only for timestamps
- Use `String` for text
- Convert `i64` from SQLite to `i32` when needed

## SQL Best Practices

- Always use `RETURNING` clause for INSERT/UPDATE/DELETE
- Use parameterized queries (SQL injection prevention)
- Use `COALESCE` for optional updates
- Transactions for multi-step operations

## Adding New Entities

1. Create types: `src/backend/src/<entity>/<entity>_types.rs`
2. Create manager: `src/backend/src/<entity>/<entity>_manager.rs`
3. Create controllers: `src/backend/src/<entity>/controller/`
4. Run `dfx build backend` (auto-generates .did and TypeScript types)
5. Create frontend components and hooks

## Quick Reference

```bash
# Environment
dfx start --background       # Start local IC
dfx stop                     # Stop local IC

# Build & Deploy
dfx build backend            # Build backend (generates .did)
dfx build frontend           # Build frontend
dfx deploy                   # Deploy all

# Development
pnpm run dev                 # Frontend hot reload
cargo test                   # Backend tests
pnpm test                   # Frontend tests

# Debug
dfx canister logs backend    # View logs
dfx canister call backend <fn> '(<args>)'  # Test functions
```

## Key Reminders

1. **ALWAYS** build after changes (`dfx build backend/frontend`)
2. **NEVER** proceed with compilation errors
3. **NEVER** manually edit `backend.did`
4. **ALWAYS** implement three-layer validation
5. Use `i32` to avoid BigInt issues
6. Follow existing patterns
7. Test functionality before marking complete