from langgraph.graph import StateGraph,START,END
from src.nodes.architect_node import architect_node
from src.nodes.planner_node import planner_node
from src.agents.coder_agent import coder_agent
from src.graph.state import EvaState



def check_condition(EvaState):
    coder_state=EvaState.get("coder_state")
    if coder_state.get("status")=="DONE":
        return "END"
    else:
        return "coder"
    
graph=StateGraph(EvaState)


graph.add_node("planner_node",planner_node)
graph.add_node("architect_node",architect_node)
graph.add_node("coder_node",coder_agent)

graph.add_edge(START,"planner_node")
graph.add_edge("planner_node","architect_node")
graph.add_edge("architect_node","coder_node")

graph.add_conditional_edges(
    "coder_node",
     check_condition,
    {"END": END, "coder": "coder_node"}
)


workflow=graph.compile()

# result=workflow.invoke({"user_input":"Make a calculator"},{"recursion_limit": 100})

# print(result)


# python -m src.graph.workflow