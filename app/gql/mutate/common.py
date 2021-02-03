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

    parent_query = ParentCodeType.get_query(info).filter_by(code_type_id=input.get("code_type_id"))

    # Update CodeType Info
    parent_query.update(dict(
      code_type_nm=input.get("code_type_nm"),
      code_type_desc=input.get("code_type_desc"),
      use_yn=input.get("use_yn"),
      sort_order=input.get("sort_order")
    ))

    # Delete to Insert
    CodeType.get_query(info).filter_by(code_type_id=input.get("code_type_id")).delete()
    codes = input.get("codes", None)
    if codes is not None:
      for code in codes:
        print( code )
        child = CodeType._meta.model(**dict(
          code_type_id=input.get("code_type_id"),
          code_id=code.get("code_id"),
          code_nm=code.get("code_nm"),
          code_desc=code.get("code_desc"),
          use_yn=code.get("use_yn"),
          sort_order=code.get("sort_order")
        ))
        session.add(child)

    # Update or Insert
    # codes = input.get("codes", None)
    # if codes is not None:
    #   for code in codes:
        # child_query = CodeType.get_query(info).filter_by(
        #   code_type_id=input.get("code_type_id"),
        #   code_id=input.get("code_id")
        # )

        # child = None
        # if child_query.first() is not None:
        #   child = CodeType.update(dict(
        #     code_nm=code.get("code_nm"),
        #     code_desc=code.get("code_desc"),
        #     use_yn=code.get("use_yn"),
        #     sort_order=code.get("sort_order")
        #   ))
        # else:
        #   child = CodeType._meta.model(**dict(
        #     code_type_id=input.get("code_type_id"),
        #     code_id=code.get("code_id"),
        #     code_nm=code.get("code_nm"),
        #     code_desc=code.get("code_desc"),
        #     use_yn=code.get("use_yn"),
        #     sort_order=code.get("sort_order")
        #   ))

        # session.merge(child)

    session.commit()
    success = True
    
    return UpdateParentCode(code_type=parent_query.first(), success=success)

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

class DeleteParentCode(graphene.Mutation):
  class Arguments:
    input = CodeTypeInput(required=True)

  delete_count = graphene.Int()
  success = graphene.Boolean()

  @staticmethod
  def mutate(self, info, input):
    code_type_id = input.get("code_type_id")
    
    deleted = ParentCodeType.get_query(info).filter_by(code_type_id=code_type_id).delete(synchronize_session=False)
    session.commit()
    
    return DeleteParentCode(delete_count=deleted, success=True)


class UpdateParentCodeUseYnInput(graphene.InputObjectType):
  code_type_id   = graphene.String()
  use_yn         = graphene.String()

class UpdateParentCodeUseYn(graphene.Mutation):
  class Arguments:
    input = UpdateParentCodeUseYnInput(required=True)

  update_count = graphene.Int()
  success = graphene.Boolean()

  @staticmethod
  def mutate(self, info, input):
    code_type_id = input.get("code_type_id")
    use_yn = input.get("use_yn")
    
    updated = ParentCodeType.get_query(info).filter_by(code_type_id=code_type_id).update({
      "use_yn": use_yn
    })
    session.commit()
    
    return UpdateParentCodeUseYn(update_count=updated, success=True)


class CodeMutation(graphene.ObjectType):
  createCodeType = CreateParentCode.Field()
  updateCodeType = UpdateParentCode.Field()
  deleteCodeType = DeleteParentCode.Field()
  updateCodeTypeUseYn = UpdateParentCodeUseYn.Field()

  createCode = CreateCode.Field()
  updateCode = UpdateCode.Field()
