from src.graph.state import EvaState
from src.chains.architect_chain import architect_chain



def architect_node(state:EvaState)->EvaState:
    plan=state["plan"]

    chain_input={
        "plan":plan,
    }

    architecture=architect_chain.invoke(chain_input)

    return {"architecture":architecture}