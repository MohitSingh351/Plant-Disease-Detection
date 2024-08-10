from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import tensorflow as tf
from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# model = load_model("plant_disease_model.h5")

# class_labels = ["Healthy", "Powdery", "Rust"]


# @app.route("/predict", methods=["POST"])
# def predict():
#     file = request.files["image"]
#     image = tf.image.decode_image(file.read(), channels=3)
#     image = tf.image.resize(image, [128, 128])
#     image = image / 255.0  # Normalize the image

#     image = tf.expand_dims(image, 0)
#     prediction = model.predict(image)

#     predicted_class = class_labels[np.argmax(prediction[0])]
#     confidence = round(100 * np.max(prediction[0]), 2)

#     return jsonify({"prediction": [predicted_class, confidence]})


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=3000)
#     # app.run(debug=False, port=3000)


import tensorflow as tf
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)
# Load your trained model
model = tf.keras.models.load_model('plant_disease_model.h5')

# Print model summary to understand the architecture
model.summary()

# Define class labels
class_labels = ['Class1', 'Class2', 'Class3']  # Replace with your actual class labels

@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files["image"]
        image = tf.image.decode_image(file.read(), channels=3)
        image = tf.image.resize(image, [128, 128])
        image = image / 255.0  # Normalize the image

        image = tf.expand_dims(image, 0)
        prediction = model.predict(image)

        predicted_class = class_labels[np.argmax(prediction[0])]
        confidence = round(100 * np.max(prediction[0]), 2)

        return jsonify({"prediction": [predicted_class, confidence]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)