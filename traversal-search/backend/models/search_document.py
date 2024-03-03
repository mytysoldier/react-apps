from typing import NamedTuple, List
from dataclasses import dataclass
from pydantic import BaseModel

# @dataclass
class SearchDocumentResponse(BaseModel):
    count: int
    result: List['SearchDocumentResult']

# @dataclass
class SearchDocumentResult(BaseModel):
    file_name: str
    text: str