chrome.runtime.onInstalled.addListener(() => {
    console.log("WortGym instalado.");
});

// Escuchar mensajes de los content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getFileUrl') {
        const fileUrl = chrome.runtime.getURL(message.filePath);
        sendResponse({ url: fileUrl });
    }
});
