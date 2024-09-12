import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const imagesDir = '../assets/imgs'; // Pasta onde você vai adicionar as imagens

async function loadImagesToDatabase() {
  const files = fs.readdirSync(imagesDir); // Lista os arquivos na pasta

  for (const file of files) {
    const modelName = path.parse(file).name; // Usa o nome do arquivo como nome do modelo
    const imageData = fs.readFileSync(path.join(imagesDir, file)); // Lê os dados binários da imagem

    // Insere a imagem no banco de dados
    await prisma.Smartphone.upsert({
      where: { model: modelName },
      update: { image: imageData },
      create: { model: modelName, image: imageData },
    });

    console.log(`Imagem do modelo ${modelName} carregada no banco de dados`);
  }
}

loadImagesToDatabase()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
