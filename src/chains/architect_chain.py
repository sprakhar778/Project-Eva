from src.llm.llm_providers import get_groq_model
from src.prompts.architecture_prompt import ARCHITECT_PROMPT
from src.schemas.architect_chain_schema import TaskPlan
from langchain.prompts import PromptTemplate
from langchain.output_parsers import OutputFixingParser,PydanticOutputParser


architect_llm=get_groq_model()
architect_llm=architect_llm.with_structured_output(TaskPlan,method="function_calling")

# parser=PydanticOutputParser(pydantic_object=TaskPlan)

prompt=PromptTemplate(
    template=ARCHITECT_PROMPT,
    input_variable=["plan"],
    # partial_variables={"format_instructions": parser.get_format_instructions()},
)

# fixing_parser=OutputFixingParser.from_llm(parser=parser,llm=architect_llm)

architect_chain=prompt | architect_llm 


# result=architect_chain.invoke({"plan":"CalcPro is a fast, responsive web calculator built with React, TypeScript, Vite, and Tailwind CSS.It supports basic arithmetic with operator precedence, history reuse, keyboard input, and dark/light themes."})

# print(result.model_dump_json(indent=2))

#$ python -m src.chains.architect_chain