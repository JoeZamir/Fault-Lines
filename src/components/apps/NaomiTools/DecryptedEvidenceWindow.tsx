import { FileText, FileVideo } from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";

export default function DecryptedEvidenceWindow({ title }: { title: string }) {
  const { openWindow } = useDesktop();

  const docs = ["f8a7_report.pdf", "bc2_statement.docx", "q11_claim.pdf"];
  const naomiFraudDocs = ["85ad2_claim.pdf", "nq77_audit.docx", "delta-report-9.pdf", "ledger-xt12.doc"];
  const tapes = ["TS_001_094503.mp4", "tape-07-raw.mp4", "m-clip-893.mp4"];
  const extortion = ["_evidence.mp4"];

  const list = title.includes("Insurance/_fraud_docs")
    ? naomiFraudDocs
    : title.includes("manipulation")
      ? tapes
      : title.includes("Extortion")
        ? extortion
        : docs;

  return (
    <div className="p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {list.map((item) => (
          <button
            key={item}
            onDoubleClick={() => item === "_evidence.mp4" && openWindow("videoEvidence", "_evidence.mp4")}
            className="flex items-center gap-2 text-sm"
          >
            {(title.includes("manipulation") || title.includes("Extortion")) ? <FileVideo className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
