// background.js

chrome.runtime.onInstalled.addListener(() => {
  const parentMenuId = "templates";

  // Crear el menú principal
  chrome.contextMenus.create({
    id: parentMenuId,
    title: "Plantillas",
    contexts: ["editable"]
  });

  // Cargar plantillas desde el almacenamiento y agregarlas como opciones de submenu
  chrome.storage.sync.get(["templates"], (data) => {
    const templates = data.templates || {};
    for (const key in templates) {
      chrome.contextMenus.create({
        id: key,
        title: key,
        parentId: parentMenuId,
        contexts: ["editable"]
      });
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.parentMenuItemId && info.parentMenuItemId === "templates") {
    const templateId = info.menuItemId;

    chrome.storage.sync.get(["templates"], (data) => {
      const templates = data.templates || {};
      const template = templates[templateId];
      if (template) {
        // Enviar un mensaje al content script para copiar y pegar la plantilla
        chrome.tabs.sendMessage(tab.id, { action: "pasteTemplate", template: template });
      }
    });
  }
});









  
  
  
  
  
  
  
  