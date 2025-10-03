# requiring modules
import json
import os
import random
from flask import Flask, render_template, request, jsonify
from sentence_transformers import SentenceTransformer, util

# initialize Flask
app = Flask(__name__)

with open("data.json", "r", encoding="utf-8") as f:
    qa_data = json.load(f)

# Initialize embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')
questions = [item["question"] for item in qa_data]
question_embeddings = model.encode(questions, convert_to_tensor=True)
idk = [
    "I am sorry?",
    "Could you rephrase that?",
    "I didn’t quite get that. I think this is out of my scope, you can contact +251968604557 if you want more information.",
    "Hmm, not sure I understand. Maybe you should try contacting +251968604557. You can get the full information from the first person.",
    "Can you say it differently?",

    "Sorry, that went over my head.",
    "I don’t have enough info on that one.",
    "That seems outside of my knowledge. You can reach out to +251968604557.",
    "I couldn’t follow that, could you simplify it?",
    "Not sure I can give the right answer here.",
    "I might be missing context. Try contacting +251968604557.",
    "That’s tricky… maybe +251968604557 can help you better.",
    "I don’t have the details on that. Please check with +251968604557.",
    "Hmm, I can’t provide a clear answer for that.",
    "I didn’t catch your point. Could you say it another way?",
    "Looks like this is beyond me. Best to ask +251968604557.",
    "That’s outside my scope. Maybe +251968604557 can guide you.",
    "I’m not confident answering that one.",
    "Sorry, I can’t give you a proper answer for now.",
    "I wish I could help more, but you should ask +251968604557.",
    "I don’t think I’m the right source for that question.",
    "I’m a bit lost here. Try reaching out to +251968604557.",
    "That’s unclear to me. Could you reframe it?",
    "Sorry, that’s not in my wheelhouse. +251968604557 can assist you.",
    "I don’t have an answer right now. Let +251968604557 handle that."
]


# Function to find best answer
def find_relevant_answer(user_input, qa_data):
    query_embedding = model.encode(user_input, convert_to_tensor=True)
    cos_scores = util.cos_sim(query_embedding, question_embeddings)

    best_idx = cos_scores.argmax()
    best_score = cos_scores[0][best_idx]
   
    if best_score >= 0.5:
        return qa_data[best_idx]["answer"]
    else:
         return random.choice(idk)

# Routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/form", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    answer = find_relevant_answer(user_input, qa_data)
    return jsonify({"response": answer})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)