import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, FileCheck, Database, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FullAuditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const FullAuditDialog = ({ open, onOpenChange, onConfirm }: FullAuditDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Run Full Compliance Audit</DialogTitle>
              <DialogDescription>
                AI-powered analysis of all project documents
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground mb-3">
              This will analyze all uploaded documents against selected green building standards using DeepSeek V3.2.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileCheck className="h-4 w-4 text-primary" />
                <span>Document parsing & material extraction</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Database className="h-4 w-4 text-primary" />
                <span>Cross-reference with GBL/GBI/LEED/BREEAM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Generate compliance scorecard</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>Estimated time: 3-5 minutes</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">8 Documents</Badge>
            <Badge variant="outline">GBL 3-Star</Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              DeepSeek V3.2
            </Badge>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="gap-2">
            <Zap className="h-4 w-4" />
            Start Audit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FullAuditDialog;