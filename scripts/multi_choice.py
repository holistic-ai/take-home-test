import torch
import numpy as np
from transformers import LongformerTokenizer, LongformerForMultipleChoice
from langchain.document_loaders import UnstructuredFileLoader


def prepare_answering_input(
    tokenizer,  # longformer_tokenizer
    question,  # str
    options,  # List[str]
    context,  # str
    max_seq_length=4096,
):
    c_plus_q = context + " " + tokenizer.bos_token + " " + question
    c_plus_q_4 = [c_plus_q] * len(options)
    tokenized_examples = tokenizer(
        c_plus_q_4,
        options,
        max_length=max_seq_length,
        padding="longest",
        truncation=True,
        return_tensors="pt",
    )
    input_ids = tokenized_examples["input_ids"].unsqueeze(0)
    attention_mask = tokenized_examples["attention_mask"].unsqueeze(0)
    example_encoded = {
        "input_ids": input_ids,
        "attention_mask": attention_mask,
    }
    return example_encoded


tokenizer = LongformerTokenizer.from_pretrained(
    "potsawee/longformer-large-4096-answering-race"
)

model = LongformerForMultipleChoice.from_pretrained(
    "potsawee/longformer-large-4096-answering-race"
)


question = "What is the use case for this project?"
options = [
    "Employment or training decisions",
    "Image processing",
    "Biometric processing",
    "Credit Scoring",
    "None of the above",
]

loader = UnstructuredFileLoader("candidate_assessment_tool_doc.pdf")
docs = loader.load()

inputs = prepare_answering_input(
    tokenizer=tokenizer,
    question=question,
    options=options,
    context=docs[0].page_content,
)

outputs = model(**inputs)

prob = torch.softmax(outputs.logits, dim=-1)[0].tolist()

selected_answer = options[np.argmax(prob)]


print(selected_answer)
