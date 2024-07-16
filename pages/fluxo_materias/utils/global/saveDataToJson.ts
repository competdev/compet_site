import * as path from "path";
import * as fs from "fs";

export function saveDataToJson(dirname: string, data: any[] | any, fileName: string) {
    try {
        const dirPath = path.join(dirname)

        if (!fs.existsSync(dirPath)) 
            fs.mkdirSync(dirPath, { recursive: true });

        const filePath = path.join(dirPath, fileName);
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf-8');
        console.log(`Os dados foram salvos em ${filePath}`);
    } catch (error) {
        console.error('Erro ao salvar os dados em JSON:', error);
    }
}