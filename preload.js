/* eslint-disable @typescript-eslint/no-var-requires */
window.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = require('electron');

  // Exemplo de uso do ipcRenderer
  ipcRenderer.on('example', (event, arg) => {
    console.log(arg); // Log do argumento recebido
  });
});
