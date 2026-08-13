from pydantic import BaseModel


class State(BaseModel):
    messages: list[str] | None
    tasks: list[str] | None
