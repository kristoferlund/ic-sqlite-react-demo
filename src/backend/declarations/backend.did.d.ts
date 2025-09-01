import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Person {
  'id' : bigint,
  'age' : number,
  'updated_at' : bigint,
  'name' : string,
  'created_at' : bigint,
}
export interface PersonCreateDto { 'age' : number, 'name' : string }
export interface PersonUpdateDto {
  'id' : bigint,
  'age' : [] | [number],
  'name' : [] | [string],
}
export interface QueryParamsDto { 'offset' : number, 'limit' : number }
export type Result = { 'Ok' : number } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Person } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : Array<Person> } |
  { 'Err' : string };
export interface _SERVICE {
  'person_count' : ActorMethod<[], Result>,
  'person_create' : ActorMethod<[PersonCreateDto], Result_1>,
  'person_delete' : ActorMethod<[bigint], Result_1>,
  'person_get' : ActorMethod<[bigint], Result_1>,
  'person_query' : ActorMethod<[QueryParamsDto], Result_2>,
  'person_update' : ActorMethod<[PersonUpdateDto], Result_1>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
