export interface EncryptionLog {
  message: string;
  timestamp: Date;
}

export type EncryptionCallback = (log: EncryptionLog, progress: number) => void;

interface SimulateEncryptionOptions {
  splitKeyEnabled: boolean;
}

export async function simulateEncryption(onUpdate: EncryptionCallback, options: SimulateEncryptionOptions): Promise<void> {
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const logs = options.splitKeyEnabled
    ? [
        { message: "Generating Data Encryption Key...", progress: 10 },
        { message: "Data Encryption Key generated ✓", progress: 20 },
        { message: "Storing Key to KEK Drive...", progress: 30 },
        { message: "Key stored to B: Corsair USB ✓", progress: 40 },
        { message: "Encrypting Drive...", progress: 50 },
      ]
    : [
        { message: "Encrypting password...", progress: 10 },
        { message: "Generating hash...", progress: 20 },
        { message: "Storing hash...", progress: 30 },
        { message: "Encrypting Drive...", progress: 40 },
      ];

  for (const log of logs) {
    onUpdate({ message: log.message, timestamp: new Date() }, log.progress);
    await delay(3000);
  }

  for (let i = 50; i <= 90; i += 10) {
    await delay(3000);
    onUpdate({ message: `Encrypting sector ${Math.floor(Math.random() * 9999)}...`, timestamp: new Date() }, i);
  }

  await delay(3000);
  onUpdate({ message: "Encryption Complete ✓", timestamp: new Date() }, 100);
}
