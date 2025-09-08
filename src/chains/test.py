from langgraph.prebuilt import create_react_agent
from src.tools.general_file_tools import write_file, read_file, run_cmd, list_files
from src.llm.llm_providers import get_groq_model


tools = [write_file, read_file, run_cmd, list_files]

agent = create_react_agent(
    model=get_groq_model(),
    tools=tools,
)
















response = agent.invoke({
    "messages": [
        {"role": "user", "content": """
You already have a React + TailwindCSS project set up. Do NOT initialize a new project or reinstall dependencies.

Task:

1. Create a **Calculator** component in `src/components/Calculator.js` using React hooks:
   - Display area for input and result.
   - Buttons for digits `0-9`, operations `+`, `-`, `*`, `/`, decimal `.`, `C` (clear), and `=` (calculate).
   - Implement calculation logic and clear functionality.
   - Style with Tailwind: grid layout, distinct colors for digits/operations, rounded buttons, hover effects, responsive.

2. Update `src/App.js` to import and render `Calculator`:
   - Center the calculator with Tailwind (`flex`, `justify-center`, `items-center`).
   - Add padding/margin for clean layout.

3. Tailwind best practices:
   - Responsive for mobile and desktop.
   - Clear color contrast.
   - Smooth hover/focus transitions.

Optional: Show running expression while typing, add keyboard support.

Output must be fully functional in React + Tailwind, using **plain JavaScript (.js)** files.
"""}
    ]
})



# response = agent.invoke({
#     "messages": [
#         {"role": "user", "content": """
# You already have a React + TailwindCSS project set up. 
# Do NOT initialize a new project or reinstall dependencies. 

# 👉 Your task:
# 1. Create a **Navbar** component in `src/components with responsive Tailwind styling.  
# 2. Create a **Hero** component in `src/components with a big headline, subtext, and a button.  
# 3. Update `src/App.tsx` to import and render both `Navbar` and `Hero`.  
# 4. Ensure styling matches Tailwind best practices.  
# """}
#     ]
# })

print(response)


#python  -m src.chains.test