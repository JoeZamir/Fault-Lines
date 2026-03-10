import { FileText, FileVideo } from "lucide-react";

export default function DecryptedEvidenceWindow({ title }: { title: string }) {
  const docs = ["f8a7_report.pdf", "bc2_statement.docx", "q11_claim.pdf"];
  const tapes = ["TS_001_094503.mp4", "TS_014_102233.mp4", "TS_030_223901.mp4"];
  const list = title.includes("manipulation") ? tapes : docs;

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {list.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm">
            {title.includes("manipulation") ? <FileVideo className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
