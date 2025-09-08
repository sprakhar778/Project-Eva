from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()



def get_groq_model(model_name="openai/gpt-oss-120b"):
    # model=ChatGroq(model=model_name,max_tokens=8000,temperature=0.3)
    model=ChatOpenAI(model="gpt-4o",max_completion_tokens=8000,temperature=0.3)
    return model