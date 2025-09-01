export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Int32, 'Err' : IDL.Text });
  const PersonCreateDto = IDL.Record({ 'age' : IDL.Nat32, 'name' : IDL.Text });
  const Person = IDL.Record({
    'id' : IDL.Int64,
    'age' : IDL.Nat32,
    'updated_at' : IDL.Int64,
    'name' : IDL.Text,
    'created_at' : IDL.Int64,
  });
  const Result_1 = IDL.Variant({ 'Ok' : Person, 'Err' : IDL.Text });
  const QueryParamsDto = IDL.Record({
    'offset' : IDL.Nat32,
    'limit' : IDL.Nat32,
  });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Vec(Person), 'Err' : IDL.Text });
  const PersonUpdateDto = IDL.Record({
    'id' : IDL.Int64,
    'age' : IDL.Opt(IDL.Nat32),
    'name' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'person_count' : IDL.Func([], [Result], ['query']),
    'person_create' : IDL.Func([PersonCreateDto], [Result_1], []),
    'person_delete' : IDL.Func([IDL.Int64], [Result_1], []),
    'person_get' : IDL.Func([IDL.Int64], [Result_1], ['query']),
    'person_query' : IDL.Func([QueryParamsDto], [Result_2], ['query']),
    'person_update' : IDL.Func([PersonUpdateDto], [Result_1], []),
  });
};
export const init = ({ IDL }) => { return []; };
