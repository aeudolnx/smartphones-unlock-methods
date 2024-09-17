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
    keepExtensions: true, // Mantém as extensões dos arquivos
    multiples: true, // Permite múltiplos arquivos
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        message: 'Erro ao processar o formulário',
        error: err.message,
      });
    }

    console.log('Campos recebidos:', fields);
    console.log('Arquivos recebidos:', files);

    // Converte campos do formulário para strings, se forem arrays
    const nomeDoCelular = Array.isArray(fields.nomeDoCelular)
      ? fields.nomeDoCelular[0] || ''
      : fields.nomeDoCelular || '';
    const model = Array.isArray(fields.model)
      ? fields.model[0] || ''
      : fields.model || '';
    const processador = Array.isArray(fields.processador)
      ? fields.processador[0] || ''
      : fields.processador || '';
    const binarios = Array.isArray(fields.binarios)
      ? fields.binarios[0] || ''
      : fields.binarios || '';
    const androids = Array.isArray(fields.androids)
      ? fields.androids[0] || ''
      : fields.androids || '';
    const downloadMode = Array.isArray(fields.downloadMode)
      ? fields.downloadMode[0] || ''
      : fields.downloadMode || '';
    const factoryReset = Array.isArray(fields.factoryReset)
      ? fields.factoryReset[0] || ''
      : fields.factoryReset || '';
    const unlockMethod = Array.isArray(fields.unlockMethod)
      ? fields.unlockMethod[0] || ''
      : fields.unlockMethod || '';
    const allowBinary = Array.isArray(fields.allowBinary)
      ? fields.allowBinary[0] || ''
      : fields.allowBinary || '';
    const notAllowBinary = Array.isArray(fields.notAllowBinary)
      ? fields.notAllowBinary[0] || ''
      : fields.notAllowBinary || '';
    const flashRom = Array.isArray(fields.flashRom)
      ? fields.flashRom[0] || ''
      : fields.flashRom || '';
    const program = Array.isArray(fields.program)
      ? fields.program[0] || ''
      : fields.program || '';

    console.log('allowBinary:', allowBinary);
    console.log('notAllowBinary:', notAllowBinary);

    // Verifica se a imagem foi enviada
    if (!files.imagemDoSmartphone || !files.imagemDoSmartphone.length) {
      return res.status(400).json({ message: 'Imagem é obrigatória' });
    }

    // Acessa o primeiro arquivo do array
    const file = files.imagemDoSmartphone[0];
    const imagemPath = file.filepath;

    // Verifica se o campo "model" foi fornecido
    if (!model) {
      return res
        .status(400)
        .json({ message: 'O campo "model" é obrigatório.' });
    }

    // Converte a imagem para um buffer
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
            model: model,
            nomeDoCelular: nomeDoCelular,
            processador: processador,
            binarios: binarios,
            androids: androids,
            downloadMode: downloadMode,
            factoryReset: factoryReset,
            unlockMethod: unlockMethod,
            allowBinary: allowBinary,
            notAllowBinary: notAllowBinary,
            flashRom: flashRom,
            program: program,
          },
        });

        res.status(200).json({
          message: 'Dados recebidos com sucesso!',
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

// Rota para buscar os smartphones e retornar a imagem em base64
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
        downloadMode: smartphone.downloadMode,
        factoryReset: smartphone.factoryReset,
        unlockMethod: smartphone.unlockMethod,
        allowBinary: smartphone.allowBinary,
        notAllowBinary: smartphone.notAllowBinary,
        flashRom: smartphone.flashRom,
        program: smartphone.program,
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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
