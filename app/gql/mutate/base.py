from graphql_relay.node.node import from_global_id

__all__ = [
  'input_to_dictionary'
]

def input_to_dictionary(input):
  """Method to convert Graphene inputs into dictionary"""
  dictionary = {}
  for key in input:
    # Convert GraphQL global id to database id
    if key[-2:] == 'id':
      input[key] = from_global_id(input[key])[1]
    dictionary[key] = input[key]
  return dictionary
  return dict(input)
