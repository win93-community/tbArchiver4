import { appendFile } from 'fs/promises';
import { EOL } from 'os';
import { join } from 'path';

import { getChatLogFileName } from './getChatLogFileName.ts';
export async function writeToDisk(data: object, event_type: string, format: string) {
    switch(format) {
        case "json":
            var finalEvent = {
                event: {
                    event_type: event_type,
                    data: JSON.stringify(data)
                }
            }
            
            var filename = getChatLogFileName("json");
            
            await appendFile(join(import.meta.dirname, '..', '..', 'output', filename), JSON.stringify(finalEvent), 'utf8')
        break;
        case "jsonl":
            var finalEvent = {
                event: {
                    event_type: event_type,
                    data: JSON.stringify(data)
                }
            }
            
            var filename = getChatLogFileName("jsonl");
            await appendFile(join(import.meta.dirname, '..', '..', 'output', filename), JSON.stringify(finalEvent) + EOL, 'utf8')
        break;
    }

}