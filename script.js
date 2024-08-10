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
  const fileInput = document.getElementById("file-upload");
  const imageFile = fileInput.files[0];

  if (!imageFile) {
      alert("Please upload an image first.");
      return;
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  // Update the URL to point to your Flask backend
  fetch("http://localhost:5000/submit", {  // Change this to your deployed URL after deployment
      method: "POST",
      body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
      console.log(data);

      // Display the prediction details
      document.getElementById('prediction').style.display = 'block';
      document.getElementById("prediction-plant-name-and-disease").innerText = `Disease: ${data.title}`;
      document.getElementById("prediction-confidence").innerText = `Confidence: ${data.confidence}%`;
      document.getElementById("prediction-cure").innerText = `Cure: ${data.prevent}`;
  })
  .catch((error) => {
      console.error("Error:", error);
      alert("There was an error processing your request.");
  });
});

// ------------------------------------------------------------------------------------------------

const fileInput = document.getElementById("file-upload");
const submitButton = document.getElementById("classify-btn");
const predictionPlantNameAndDisease = document.getElementById("prediction-plant-name-and-disease");
const predictionConfidence = document.getElementById("prediction-confidence");
const predictionCure = document.getElementById("prediction-cure");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const imageFile = fileInput.files[0];
  if (!imageFile) {
      alert("Please upload an image first.");
      return;
  }
  const formData = new FormData();
  formData.append("image", imageFile);

  fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      const [predictedClass, confidence] = data.prediction;
      predictionPlantNameAndDisease.innerHTML = `Predicted plant name and disease: ${predictedClass}`;
      predictionConfidence.innerHTML = `Confidence: ${confidence}%`;
      predictionCure.innerHTML = `Cure: ${data.cure}`;
  })
  .catch((error) => {
      console.error("Error:", error);
  });
});