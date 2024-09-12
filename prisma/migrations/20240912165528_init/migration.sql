-- CreateTable
CREATE TABLE "Smartphone" (
    "imagemDoSmartphone" BLOB NOT NULL,
    "model" TEXT NOT NULL PRIMARY KEY,
    "nomeDoCelular" TEXT NOT NULL,
    "processador" TEXT NOT NULL,
    "binarios" TEXT NOT NULL,
    "androids" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Smartphone_model_key" ON "Smartphone"("model");
