from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

sentences = [
    "The weather is lovely today.",
    "It's so sunny outside!",
    "He drove to the stadium.",
]

embeddings = model.encode(sentences)

print(embeddings.shape)

query = "It's sunny"

query_embedding = model.encode(query)
similarties = model.similarity(embeddings, query_embedding)

print(similarties)
