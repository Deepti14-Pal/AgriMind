// Play Magic Sound
function playMagicSound() {
  const audio = new Audio('../assets/magic.mp3');
  audio.play();
}

// Upload Preview & Interaction
const fileElem = document.getElementById('fileElem');
const dropArea = document.getElementById('drop-area');
const previewContainer = document.getElementById('preview-container');
const preview = document.getElementById('preview');
const removeImageBtn = document.getElementById('remove-image');

dropArea.addEventListener('click', () => fileElem.click());

fileElem.addEventListener('change', handleFiles);
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('bg-purple-900', 'bg-opacity-20');
});
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('bg-purple-900', 'bg-opacity-20');
});
dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('bg-purple-900', 'bg-opacity-20');
  const files = e.dataTransfer.files;
  fileElem.files = files;
  handleFiles();
});

function handleFiles() {
  const file = fileElem.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    previewContainer.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

removeImageBtn.addEventListener('click', () => {
  previewContainer.classList.add('hidden');
  preview.src = '';
  fileElem.value = '';
});

// Cast Spell Button
const castBtn = document.getElementById('cast-spell-btn');
const resultSection = document.getElementById('results');
const resultContent = document.getElementById('result-content');
const tryAgainBtn = document.getElementById('try-again-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const buttonText = document.getElementById('button-text');

castBtn.addEventListener('click', () => {
  if (!fileElem.files.length) {
    alert("Please select an image first.");
    return;
  }

  playMagicSound(); // Magic sound plays here ✨

  buttonText.textContent = "Casting...";
  loadingSpinner.classList.remove('hidden');

  // Simple JSON request to backend
  fetch("http://localhost:8080/api/diagnose", {
    method: "POST",
    body : formData,
    
  })
  .then(response => response.text())
  .then(data => {
    resultContent.innerHTML = `
      <h3 class="text-2xl font-bold mb-4">${data}</h3>
    `;
    resultSection.classList.remove('hidden');
    loadingSpinner.classList.add('hidden');
    buttonText.textContent = "Cast Diagnosis Spell";
  })
  .catch(error => {
    resultContent.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    resultSection.classList.remove('hidden');
    loadingSpinner.classList.add('hidden');
    buttonText.textContent = "Cast Diagnosis Spell";
  });
});

tryAgainBtn.addEventListener('click', () => {
  resultSection.classList.add('hidden');
  previewContainer.classList.add('hidden');
  preview.src = '';
  fileElem.value = '';
});
