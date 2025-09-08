from langgraph.prebuilt import create_react_agent
from src.tools.general_file_tools import write_file, read_file, run_cmd, list_files
from src.llm.llm_providers import get_groq_model

tools = [write_file, read_file, run_cmd, list_files]

agent = create_react_agent(
    model=get_groq_model(),
    tools=tools,
)

print("Interactive multi-step React + Tailwind agent. Type 'exit' to quit.\n")

while True:
    task = input("Enter the next task for the agent: ").strip()
    
    if task.lower() == "exit":
        print("Exiting agent.")
        break
    
    if not task:
        print("Please enter a valid task.")
        continue
    
    # Invoke the agent for the user-provided task
    response = agent.invoke({
        "messages": [
            {"role": "user", "content": f"""
            You already have a React + TailwindCSS project. Do NOT reinstall dependencies.

            Task:
            {task}

            Output fully functional plain JavaScript (.js) React + Tailwind components.
            """}
        ]
    })
    
    print("\nAgent output:\n")
    print(response)
    
    # Ask for confirmation before continuing
    user_input = input("\nDo you want to continue to the next task? (y/n): ").strip().lower()
    if user_input != "y":
        print("Stopping execution. You can resume later.")
        break
