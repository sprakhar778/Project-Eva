from typing import Optional, TypedDict
from src.schemas.planner_chain_schema import Plan
from src.schemas.architect_chain_schema import TaskPlan


class CoderState(TypedDict, total=False):
    task_plan: TaskPlan                # The plan for the task to be implemented
    current_step_idx: int              # Index of the current step
    current_file_content: Optional[str]  # Content of file being edited
    status: str                        # "IN_PROGRESS" or "DONE"


class EvaState(TypedDict, total=False):
    user_input: str                    # User's request

    plan: Optional[Plan]               # Structured app plan
    architecture: Optional[TaskPlan]   # Detailed implementation plan

    coder_state: Optional[CoderState]
