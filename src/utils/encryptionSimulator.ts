export interface EncryptionLog {
  message: string;
  timestamp: Date;
}

export type EncryptionCallback = (log: EncryptionLog, progress: number) => void;

export async function simulateEncryption(onUpdate: EncryptionCallback): Promise<void> {
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  onUpdate({ message: "Generating Data Encryption Key...", timestamp: new Date() }, 5);
  await delay(2000);

  onUpdate({ message: "Data Encryption Key generated ✓", timestamp: new Date() }, 15);
  onUpdate({ message: "Storing Key to KEK Drive...", timestamp: new Date() }, 20);
  await delay(2000);

  onUpdate({ message: "Key stored to B: USB_key ✓", timestamp: new Date() }, 30);
  onUpdate({ message: "Encrypting Drives...", timestamp: new Date() }, 35);

  // Simulate encryption progress over ~6 seconds
  for (let i = 35; i <= 95; i += 5) {
    await delay(500);
    onUpdate({ message: `Encrypting sector ${Math.floor(Math.random() * 9999)}...`, timestamp: new Date() }, i);
  }

  await delay(500);
  onUpdate({ message: "Encryption Complete ✓", timestamp: new Date() }, 100);
}
