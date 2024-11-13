import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LogService {
  private logPath = path.join(__dirname, '..', 'logs');

  log(message: string) {
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logPath, `${date}.json`);

    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    const logEntry = { timestamp: new Date(), message };
    const logData = fs.existsSync(logFile)
      ? JSON.parse(fs.readFileSync(logFile, 'utf-8'))
      : [];

    logData.push(logEntry);

    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));

    console.log(message);
  }
}
