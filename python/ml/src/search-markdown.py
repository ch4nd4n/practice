from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
md_file = '/Users/chandan/code/personal/github/docs/003-general-notes.md'

# Open the file in read mode
with open(md_file, "r") as file:
    # Read the contents of the file
    content = file.read()

# Print the file content
print(content)
embeddings = model.encode(content)

print(embeddings.shape)


query = "There is no user manual to life"

query_embedding = model.encode(query)
similarties = model.similarity(embeddings, query_embedding)

print(similarties)
