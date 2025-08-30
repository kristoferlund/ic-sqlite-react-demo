export const idlFactory = ({ IDL }) => {
  const PersonCreateDto = IDL.Record({ 'age' : IDL.Nat32, 'name' : IDL.Text });
  const Person = IDL.Record({
    'id' : IDL.Int32,
    'age' : IDL.Int32,
    'updated_at' : IDL.Int64,
    'name' : IDL.Text,
    'created_at' : IDL.Int64,
  });
  const Result = IDL.Variant({ 'Ok' : Person, 'Err' : IDL.Text });
  const QueryParamsDto = IDL.Record({
    'offset' : IDL.Nat32,
    'limit' : IDL.Nat32,
  });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Vec(Person), 'Err' : IDL.Text });
  const PersonUpdateDto = IDL.Record({
    'id' : IDL.Nat32,
    'age' : IDL.Opt(IDL.Nat32),
    'name' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'person_create' : IDL.Func([PersonCreateDto], [Result], []),
    'person_delete' : IDL.Func([IDL.Nat32], [Result], []),
    'person_query' : IDL.Func([QueryParamsDto], [Result_1], ['query']),
    'person_update' : IDL.Func([PersonUpdateDto], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
