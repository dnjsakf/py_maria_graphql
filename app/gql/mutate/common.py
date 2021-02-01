import graphene

from uuid import uuid4
from app.database import session

from .base import input_to_dictionary
from ..types.common import (
  ParentCodeType,
  CodeType,
)

__all__ = [
  'CodeMutation'
]

class CodeInput(graphene.InputObjectType):
  code_type_id   = graphene.String()
  code_id        = graphene.String()
  code_nm        = graphene.String()
  code_desc      = graphene.String()
  use_yn         = graphene.String()
  sort_order     = graphene.Int()

class CodeTypeInput(graphene.InputObjectType):
  code_type_id   = graphene.String()
  code_type_nm   = graphene.String()
  code_type_desc = graphene.String()
  use_yn         = graphene.String()
  sort_order     = graphene.Int()
  codes          = graphene.List(CodeInput)

class CreateParentCode(graphene.Mutation):
  class Arguments:
    input = CodeTypeInput(required=True)

  code_type = graphene.Field(lambda: ParentCodeType)
  success = graphene.Boolean()
  
  @staticmethod
  def mutate(self, info, input):
    # data = input_to_dictionary(input)

    code_type = ParentCodeType._meta.model(
      code_type_id=input.get("code_type_id"),
      code_type_nm=input.get("code_type_nm"),
      code_type_desc=input.get("code_type_desc"),
      use_yn=input.get("use_yn"),
      sort_order=input.get("sort_order"),
    )

    codes = input.get("codes")
    for code in codes:
      code_type.code.append(
        CodeType._meta.model(
          code_id=code.get("code_id"),
          code_nm=code.get("code_nm"),
          code_desc=code.get("code_desc"),
          use_yn=code.get("use_yn"),
          sort_order=code.get("sort_order")
        )
      )

    session.add(code_type)
    session.commit()
    success = True

    return CreateParentCode(code_type=code_type, success=success)

class CreateCode(graphene.Mutation):
  class Arguments:
    input = CodeInput(required=True)

  code = graphene.Field(lambda: CodeType)
  success = graphene.Boolean()
  
  @staticmethod
  def mutate(self, info, input):
    code = CodeType._meta.model(**dict(input))

    session.add(code)
    session.commit()
    success = True

    return CreateParentCode(code=code, success=success)

class UpdateParentCode(graphene.Mutation):
  class Arguments:
    input = CodeTypeInput(required=True)

  code_type = graphene.Field(lambda: ParentCodeType)
  success = graphene.Boolean()
  
  @staticmethod
  def mutate(self, info, input):

    code_type = ParentCodeType._meta.model(
      code_type_id=input.get("code_type_id"),
      code_type_nm=input.get("code_type_nm"),
      code_type_desc=input.get("code_type_desc"),
      use_yn=input.get("use_yn"),
      sort_order=input.get("sort_order"),
    )

    codes = input.get("codes", None)
    if codes is not None:
      for code in codes:
        code_type.code.append(
          CodeType._meta.model(
            code_id=code.get("code_id"),
            code_nm=code.get("code_nm"),
            code_desc=code.get("code_desc"),
            use_yn=code.get("use_yn"),
            sort_order=code.get("sort_order")
          )
        )

    session.merge(code_type)
    session.commit()
    success = True
    
    return UpdateParentCode(code_type=code_type, success=success)

class UpdateCode(graphene.Mutation):
  class Arguments:
    input = CodeInput(required=True)

  code = graphene.Field(lambda: CodeType)
  success = graphene.Boolean()
  
  @staticmethod
  def mutate(self, info, input):
    code = CodeType._meta.model(**dict(input))

    session.add(code)
    session.commit()
    success = True

    return UpdateCode(code=code, success=success)


class CodeMutation(graphene.ObjectType):
  createParentCode = CreateParentCode.Field()
  updateParentCode = UpdateParentCode.Field()

  createCode = CreateCode.Field()
  updateCode = UpdateCode.Field()