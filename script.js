// Simulate a click on the hidden file input when the "Browse files" button is clicked
document.getElementById('browse-btn').addEventListener('click', function() {
    document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('uploaded-image').src = e.target.result;
            document.getElementById('uploaded-image').style.display = 'block';
            document.getElementById('file-name').textContent = file.name;
            document.getElementById('remove-btn').style.display = 'block';
            document.getElementById('classify-btn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('remove-btn').addEventListener('click', function() {
    document.getElementById('file-upload').value = '';
    document.getElementById('uploaded-image').style.display = 'none';
    document.getElementById('file-name').textContent = '';
    document.getElementById('remove-btn').style.display = 'none';
    document.getElementById('classify-btn').disabled = true;
});

document.getElementById('classify-btn').addEventListener('click', function() {
    document.getElementById('prediction').style.display = 'block';
});

// ------------------------------------------------------------------------------------------------

const imageInput = document.getElementById("uploaded-image");
const submitButton = document.getElementById("classify-btn");
const predictionPlantName = document.getElementById("prediction-plant-name");
const predictionStatus = document.getElementById("prediction-status");
const predictionCure = document.getElementById("prediction-cure");

// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   const imageFile = imageInput.files[0];
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   fetch("http://127.0.0.1:3000/predict", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.prediction);
//       const [predictedClass, confidence] = data.prediction;
//       predictionText.innerHTML = `Prediction: ${predictedClass}`;
//       confidenceText.innerHTML = `Confidence: ${confidence}%`;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// });

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const imageFile = imageInput.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
  
    fetch("http://127.0.0.1:3000/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.prediction);
        const [predictedClass, confidence] = data.prediction;
        predictionPlantName.innerHTML = `Predicted plant name: ${predictedClass}`;
        predictionStatus.innerHTML = `Predicted plant status: ${confidence}% confidence`;
        predictionCure.innerHTML = `Cure: Suggested remedy here`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Simulate a click on the hidden file input when the "Browse files" button is clicked