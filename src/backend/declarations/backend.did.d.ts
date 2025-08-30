import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Person {
  'id' : number,
  'age' : number,
  'updated_at' : bigint,
  'name' : string,
  'created_at' : bigint,
}
export interface PersonCreateDto { 'age' : number, 'name' : string }
export interface PersonUpdateDto {
  'id' : number,
  'age' : [] | [number],
  'name' : [] | [string],
}
export interface QueryParamsDto { 'offset' : number, 'limit' : number }
export type Result = { 'Ok' : Person } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Array<Person> } |
  { 'Err' : string };
export interface _SERVICE {
  'person_create' : ActorMethod<[PersonCreateDto], Result>,
  'person_delete' : ActorMethod<[number], Result>,
  'person_query' : ActorMethod<[QueryParamsDto], Result_1>,
  'person_update' : ActorMethod<[PersonUpdateDto], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
