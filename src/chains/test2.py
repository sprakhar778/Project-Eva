# from langgraph.prebuilt import create_react_agent
# from src.tools.general_file_tools import write_file, read_file, run_cmd, list_files
# from src.llm.llm_providers import get_groq_model

# tools = [write_file, read_file, run_cmd, list_files]

# agent = create_react_agent(
#     model=get_groq_model(),
#     tools=tools,
# )

# # Define tasks
# tasks = [
#     "Check if `src/components/Calculator.js` exists. If yes, read it; if not, create it.",
#     "Generate React Calculator component with TailwindCSS styling neon theme.",
#     "Update `src/App.js` to import and render Calculator, center with Tailwind.",
#     "Validate Tailwind responsiveness and colors.",
#     "Optional: Add keyboard support and running expression display."
# ]

# # Loop through tasks, asking for user confirmation after each
# for i, task in enumerate(tasks):
#     print(f"\nTask {i+1}: {task}\n")
    
#     response = agent.invoke({
#         "messages": [
#             {"role": "user", "content": f"""
#             You already have a React + TailwindCSS project. Do NOT reinstall dependencies.

#             Task:
#             {task}

#             Output fully functional plain JavaScript (.js) React + Tailwind components.
#             """}
#         ]
#     })
    
#     print(response)  # Show the generated code or result
    
#     # Ask user to confirm before continuing
#     user_input = input("\nDo you want to continue to the next task? (y/n): ").strip().lower()
#     if user_input != "y":
#         print("Stopping execution. You can resume later.")
#         break
