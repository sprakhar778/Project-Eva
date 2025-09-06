from src.llm.llm_providers import get_groq_model
from src.prompts.planner_chain_prompt import PLANNER_PROMPT
from src.schemas.planner_chain_schema import Plan
from langchain.prompts import PromptTemplate
# from langchain.output_parsers import PydanticOutputParser, OutputFixingParser
import json



# parser=PydanticOutputParser(pydantic_object=Plan)


planner_llm=get_groq_model()

planner_llm=planner_llm.with_structured_output(Plan,method="function_calling")



prompt=PromptTemplate(

    template=PLANNER_PROMPT,
    input_variables=["user_input"],
    # partial_variables={"format_instructions": parser.get_format_instructions()},
)
# fixing_parser = OutputFixingParser.from_llm(parser=parser, llm=planner_llm)

planner_chian= prompt | planner_llm 




# result=planner_chian.invoke({"user_input":"create a calculator app"})

# x=result.model_dump_json()

# print(x)