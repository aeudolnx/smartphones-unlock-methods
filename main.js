import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  console.log('Criando janela...');
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: false, // Impede redimensionamento
    maximizable: false, // Impede maximização
    fullscreenable: false, // Impede fullscreen
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true, // Oculta a barra de menu
  });

  win
    .loadFile(path.join(__dirname, 'dist', 'index.html'))
    .then(() => {
      console.log('Arquivo index.html carregado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao carregar index.html:', error);
    });

  // Remover a barra de menu completamente
  Menu.setApplicationMenu(null);
}

// Inicialização da aplicação
app.whenReady().then(() => {
  console.log('Aplicação pronta.');
  createWindow();
});

// Fechar a aplicação quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Reabrir a janela quando a aplicação for ativada (no macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
