from transformers import pipeline

text = "Place get's crowded but you get good beer"
classifier = pipeline("sentiment-analysis")
r = classifier(text)
print(r)

classifier = pipeline("zero-shot-classification")
r = classifier(text, candidate_labels=["food", "education", "business"])
print(r)

generator = pipeline("text-generation", model="distilgpt2")
t = "Ample Bangalore is a modern and vibrant office space located in the heart of Bangalore, India's bustling technology hub. The office boasts a spacious and open layout, with high ceilings and plenty of natural light to promote productivity and creativity. It offers a range of seating options, including private offices, dedicated desks, and open seating areas, to suit the needs of its employees. In addition to its stylish and functional design, the Ample Bangalore office is equipped with a range of amenities to cater to the needs of its employees. These include a fully-equipped gym and yoga studio, a games room, and a cafeteria serving a variety of meals and snacks. The office also has a quiet room for meditation and relaxation, as well as a rooftop terrace with stunning views of the city. The Ample Bangalore office also has a number of social spaces, including a lounge area and outdoor seating, and regularly organizes events and activities to foster a sense of camaraderie and teamwork among employees. Overall, the Ample Bangalore office is a dynamic and engaging place to work, with facilities and amenities that support the needs of its employees and clients."

r = generator(t, max_length=2000)

print(r)

ner = pipeline("ner", grouped_entities=True)

r = ner(t)

print(r)

summarizer = pipeline("summarization")

r = summarizer(t)

print(r)


# Review thing
