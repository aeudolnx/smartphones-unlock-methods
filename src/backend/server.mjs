import express from 'express';
import cors from 'cors';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(cors());

// Middleware para processar os uploads
app.post('/smartphone', (req, res) => {
  const form = formidable({
    //uploadDir: path.join(__dirname, 'uploads'), // Define o diretório para os uploads
    keepExtensions: true, // Mantém as extensões dos arquivos
    multiples: true, // Permite vários arquivos
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        message: 'Erro ao processar o formulário',
        error: err.message,
      });
    }

    console.log('Campos do formulário:', fields);
    console.log('Arquivos recebidos:', files);

    // Acessa o primeiro item do array
    const { nomeDoCelular, model, processador, binarios, androids } = {
      nomeDoCelular: fields.nomeDoCelular[0],
      model: fields.model[0],
      processador: fields.processador[0],
      binarios: fields.binarios[0],
      androids: fields.androids[0],
    };

    if (!files.imagemDoSmartphone || !files.imagemDoSmartphone.length) {
      return res.status(400).json({ message: 'Imagem é obrigatória' });
    }

    // Acessa o primeiro arquivo do array
    const file = files.imagemDoSmartphone[0];
    const imagemPath = file.filepath;

    if (!model) {
      return res
        .status(400)
        .json({ message: 'O campo "model" é obrigatório.' });
    }

    if (!nomeDoCelular || !processador) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }

    // Converta a imagem para um buffer
    fs.readFile(imagemPath, async (readErr, data) => {
      if (readErr) {
        return res.status(500).json({
          message: 'Erro ao ler o arquivo',
          error: readErr.message,
        });
      }

      // Armazena os dados no banco de dados
      try {
        await prisma.smartphone.create({
          data: {
            imagemDoSmartphone: data, // Salva a imagem como bytes
            model, // Corrigido para string
            nomeDoCelular, // Corrigido para string
            processador, // Corrigido para string
            binarios, // Corrigido para string
            androids, // Corrigido para string
          },
        });

        res.status(200).json({
          message: 'Dados recebidos com sucesso!',
          dadosRecebidos: {
            imagemDoSmartphone: data.toString('base64'), // Usar base64 diretamente
            nomeDoCelular,
            model,
            processador,
            binarios,
            androids,
          },
        });
      } catch (error) {
        res.status(500).json({
          message: 'Erro ao salvar dados no banco de dados',
          error: error.message,
        });
      }
    });
  });
});

app.get('/files', async (req, res) => {
  try {
    const smartphones = await prisma.smartphone.findMany();
    const response = smartphones.map((smartphone) => {
      const imageBase64 = smartphone.imagemDoSmartphone
        ? Buffer.from(smartphone.imagemDoSmartphone).toString('base64')
        : null;

      return {
        model: smartphone.model,
        nomeDoCelular: smartphone.nomeDoCelular,
        processador: smartphone.processador,
        binarios: smartphone.binarios,
        androids: smartphone.androids,
        imagemDoSmartphone: imageBase64
          ? `data:image/jpeg;base64,${imageBase64}`
          : null,
      };
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Erro ao recuperar dados', error: error.message });
  }
});

// Middleware para servir arquivos estáticos (opcional, para acessar arquivos diretamente)
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
