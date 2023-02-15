import { promises } from "fs";

const FS = promises;

async function writeHeader (logFile) {

    const

    LOG_PATH   = process.cwd + logFile,
    TODAY      = new Date(Date.now()),
    LOG_HEADER = `--------------------------------------------\n| Inicio de Log\n| Sesión : ${TODAY.toUTCString()}\n--------------------------------------------\n\n`;

    try {

        const

        FILE_READ  = await FS.readFile(LOG_PATH, "utf-8"),
        FILE_WRITE = await FS.writeFile(
            
            LOG_PATH, 
            FILE_READ + (
                
                FILE_READ == "" 

                    ? LOG_HEADER 
                    : "\n" + LOG_HEADER
                    
            )
                
        );
        
    } catch (err) {
    
        console.log(`Error : ${err}. Algo salió mal.`);
        
    };

};

const LOGS_FILE = ["/error.log", "/warn.log"];

LOGS_FILE.forEach(logFile => writeHeader(logFile));