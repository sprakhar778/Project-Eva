from src.llm.llm_providers import get_groq_model
from src.prompts.coder_chain_prompt import CODER_PROMPT
from langgraph.prebuilt import create_react_agent
from src.tools.general_file_tools import (
    get_current_directory,
    write_file,
    read_file,
    run_cmd,
    list_files,
)
from src.graph.state import EvaState

llm = get_groq_model()


def coder_agent(state: EvaState) -> EvaState:
    """LangGraph tool-using coder agent."""
    coder_state = state.get("coder_state")

    # Initialize coder_state if missing
    if coder_state is None:
        coder_state = {
            "task_plan": state["architecture"],
            "current_step_idx": 0,
            "current_file_content": None,
            "status": "IN_PROGRESS",
        }

    steps = coder_state["task_plan"].implementation_steps

    # If all steps are done, mark completion
    if coder_state["current_step_idx"] >= len(steps):
        coder_state["status"] = "DONE"
        return {"coder_state": coder_state, "status": "DONE"}

    # Get current task
    current_task = steps[coder_state["current_step_idx"]]
    existing_content = read_file.run(current_task.filepath)

    system_prompt = CODER_PROMPT
    user_prompt = (
        f"Task: {current_task.task_description}\n"
        f"File: {current_task.filepath}\n"
        f"Existing content:\n{existing_content}\n"
        "Use write_file(path, content) to save your changes."
    )

    coder_tools = [read_file, write_file, list_files, get_current_directory]
    react_agent = create_react_agent(llm, coder_tools)

    # Run the LLM agent on the current step
    react_agent.invoke({
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]
    })

    # Move to the next step
    coder_state["current_step_idx"] += 1
    coder_state["status"] = (
        "DONE" if coder_state["current_step_idx"] >= len(steps) else "IN_PROGRESS"
    )

    return {"coder_state": coder_state, "status": coder_state["status"]}
