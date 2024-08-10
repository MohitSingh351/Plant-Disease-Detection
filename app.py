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


from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your trained model
model = tf.keras.models.load_model('model.pt')

# Print model summary to understand the architecture
model.summary()

# Define class labels (replace with actual class names from the PlantVillage dataset)
class_labels = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
    'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch',
    'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

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