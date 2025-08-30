#!/bin/bash

set -e          # Exit immediately if a command exits with a non-zero status
set -u          # Treat unset variables as an error
set -o pipefail # Ensure errors propagate in pipelines

cargo build --target wasm32-wasip1 --release

wasi2ic target/wasm32-wasip1/release/backend.wasm target/wasm32-wasip1/release/backend_wasi2ic.wasm

candid-extractor target/wasm32-wasip1/release/backend_wasi2ic.wasm >./src/backend/backend.did

dfx generate backend
