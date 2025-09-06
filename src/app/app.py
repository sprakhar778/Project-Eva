# app.py
import streamlit as st
from src.graph.workflow import workflow
from src.tools.general_file_tools import list_files, read_file, init_project_root
import pathlib
PROJECT_ROOT = pathlib.Path.cwd() / "generated_project"


def safe_path_for_project(path: str) -> pathlib.Path:
    p = (PROJECT_ROOT / path).resolve()
    if PROJECT_ROOT.resolve() not in p.parents and PROJECT_ROOT.resolve() != p.parent and PROJECT_ROOT.resolve() != p:
        raise ValueError("Attempt to write outside project root")
    return p



def read_file(path: str) -> str:
    """Reads content from a file at the specified path within the project root."""
    p = safe_path_for_project(path)
    if not p.exists():
        return ""
    with open(p, "r", encoding="utf-8") as f:
        return f.read()


def get_current_directory() -> str:
    """Returns the current working directory."""
    return str(PROJECT_ROOT)


def list_files(directory: str = ".") -> str:
    """Lists all files in the specified directory within the project root."""
    p = safe_path_for_project(directory)
    if not p.is_dir():
        return f"ERROR: {p} is not a directory"
    files = [str(f.relative_to(PROJECT_ROOT)) for f in p.glob("**/*") if f.is_file()]
    return "\n".join(files) if files else "No files found."


# Initialize project directory
init_project_root()

st.set_page_config(page_title="Eva Workflow Runner", layout="wide")
st.title("⚡ Eva AI Project Generator")
st.write("Runs the LangGraph workflow and previews generated files.")

# --- User Input ---
user_input = st.text_input("Enter a project idea:", "Make a calculator")

if st.button("🚀 Run Workflow"):
    with st.spinner("Running workflow... this may take a while"):
        result = workflow.invoke({"user_input": user_input}, {"recursion_limit": 100})
        st.success("Workflow finished!")
        # st.json(result)

# --- Sidebar: File List ---
st.sidebar.header("📂 Generated Files")
files = list_files(".")
if files and files != "No files found.":
    file_list = files.split("\n")
    selected_file = st.sidebar.selectbox("Select a file to preview", file_list)
else:
    st.sidebar.info("No files found yet. Run the workflow first.")
    selected_file = None

# --- Main Area: Tabs for File Preview ---
if selected_file:
    content = read_file(selected_file)
    file_ext = selected_file.split(".")[-1].lower()

    # Create tabs
    tabs = st.tabs(["Preview", "Raw Code"])
    
    with tabs[0]:   
        if file_ext == "html":
            # Collect all CSS and JS files in the project
            all_files = list_files(".").split("\n")
            css_content = ""
            js_content = ""
            for f in all_files:
                ext = f.split(".")[-1].lower()
                if ext == "css":
                    css_content += f"<style>\n{read_file(f)}\n</style>\n"
                elif ext == "js":
                    js_content += f"<script>\n{read_file(f)}\n</script>\n"

            # Inject CSS and JS into HTML
            full_html = f"""
            <head>
            {css_content}
            </head>
            <body>
            {content}
            {js_content}
            </body>
            """

            st.components.v1.html(full_html, height=600, scrolling=True)
        else:
            st.code(content, language=file_ext)

    with tabs[1]:
        st.code(content, language=file_ext)
