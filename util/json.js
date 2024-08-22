const fs = require('fs');
const path = require('path');

require('dotenv/config');

const CARROSSEL_KEYS = process.env.CARROSSEL_KEYS;

function partial_to_full_path({ dirname, partialPath }) {
    return path.join(dirname, partialPath);
}

function saveDataToJson(data, fileName) {
    try {
        const dirPath = partial_to_full_path({
            dirname: __dirname, partialPath: "../"
        });

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filePath = path.join(dirPath, fileName);
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf-8');
        console.log(`Os dados foram salvos em ${filePath}`);
    } catch (error) {
        console.error('Erro ao salvar os dados em JSON:', error);
    }
}

function copyJsonFiles() {
    const carrosselKeys = JSON.parse(CARROSSEL_KEYS);

    saveDataToJson(carrosselKeys, 'env.json');
}

copyJsonFiles();
