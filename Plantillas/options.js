// options.js

document.addEventListener("DOMContentLoaded", () => {
  const templateInput = document.getElementById("templateInput");
  const saveButton = document.getElementById("saveButton");
  const templateList = document.getElementById("templateList");

  // Cargar plantillas existentes desde el almacenamiento
  chrome.storage.sync.get(["templates"], (data) => {
    const templates = data.templates || {};
    for (const key in templates) {
      const templateItem = document.createElement("li");
      templateItem.textContent = key;
      templateList.appendChild(templateItem);
    }
  });

  // Manejar el clic en el botón Guardar
  saveButton.addEventListener("click", () => {
    const newTemplate = templateInput.value.trim();
    if (newTemplate) {
      // Guardar la nueva plantilla en el almacenamiento
      chrome.storage.sync.get(["templates"], (data) => {
        const templates = data.templates || {};
        templates[newTemplate] = newTemplate;
        saveTemplates(templates);

        // Actualizar la lista de plantillas
        const templateItem = document.createElement("li");
        templateItem.textContent = newTemplate;
        templateList.appendChild(templateItem);

        // Limpiar el campo de entrada
        templateInput.value = "";
      });
    }
  });
});


  