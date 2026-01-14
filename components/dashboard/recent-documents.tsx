import { FileText, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'parsed' | 'parsing' | 'queued' | 'error';
  icon: 'pdf' | 'ifc' | 'zip';
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Bill_of_Quantities_v3.pdf',
    type: 'BoQ',
    size: '2.4 MB',
    status: 'parsed',
    icon: 'pdf',
  },
  {
    id: '2',
    name: 'HVAC_Specifications.pdf',
    type: 'Spec',
    size: '1.8 MB',
    status: 'parsing',
    icon: 'pdf',
  },
  {
    id: '3',
    name: 'Structural_Drawings.ifc',
    type: 'BIM',
    size: '45.2 MB',
    status: 'parsed',
    icon: 'ifc',
  },
  {
    id: '4',
    name: 'Material_EPDs.zip',
    type: 'EPD',
    size: '12.1 MB',
    status: 'queued',
    icon: 'zip',
  },
];

function getStatusBadge(status: Document['status']) {
  switch (status) {
    case 'parsed':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
          <CheckCircle2 className="h-3 w-3" />
          Parsed
        </span>
      );
    case 'parsing':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          <Loader2 className="h-3 w-3 animate-spin" />
          Parsing
        </span>
      );
    case 'queued':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900 dark:text-orange-300">
          <Clock className="h-3 w-3" />
          Queued
        </span>
      );
    case 'error':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
          Error
        </span>
      );
  }
}

function getIconColor(icon: Document['icon']) {
  switch (icon) {
    case 'pdf':
      return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400';
    case 'ifc':
      return 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
    case 'zip':
      return 'bg-orange-50 text-orange-600 dark:bg-orange-900 dark:text-orange-400';
  }
}

export function RecentDocuments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-600" />
          Recent Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
            >
              <div className={cn('rounded-lg p-3', getIconColor(doc.icon))}>
                <FileText className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{doc.name}</p>
                <p className="text-sm text-muted-foreground">
                  {doc.type} • {doc.size}
                </p>
              </div>
              
              <div>{getStatusBadge(doc.status)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
