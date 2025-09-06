from src.graph.state import EvaState
from src.chains.planner_chain import planner_chian



def planner_node(state:EvaState)->EvaState:
    user_input=state["user_input"]

    chain_input={
        "user_input":user_input,
    }

    plan=planner_chian.invoke(chain_input)

    return {"plan":plan}