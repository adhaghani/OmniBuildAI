'use client';

import { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface IFCFile {
  name: string;
  path: string;
  description: string;
}

const ifcFiles: IFCFile[] = [
  {
    name: 'Sample House',
    path: '/demo/Ifc4_SampleHouse.ifc',
    description: 'Complete residential building',
  },
  {
    name: 'Duplex Architecture',
    path: '/demo/Ifc2x3_Duplex_Architecture.ifc',
    description: 'Architectural model of a duplex',
  },
  {
    name: 'Sample Castle',
    path: '/demo/Ifc2x3_SampleCastle.ifc',
    description: 'Historical building structure',
  },
  {
    name: 'Revit Architecture',
    path: '/demo/Ifc4_Revit_ARC.ifc',
    description: 'Revit architectural export',
  },
  {
    name: 'Revit MEP',
    path: '/demo/Ifc4_Revit_MEP.ifc',
    description: 'MEP systems model',
  },
  {
    name: 'Cube Advanced Brep',
    path: '/demo/Ifc4_CubeAdvancedBrep.ifc',
    description: 'Simple geometric shape',
  },
];

export interface ModelSelectorProps {
  onModelSelect?: (file: IFCFile) => void;
}

export function ModelSelector({ onModelSelect }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState(ifcFiles[0]);

  const handleSelect = (file: IFCFile) => {
    setSelectedModel(file);
    onModelSelect?.(file);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          <span>{selectedModel.name}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {ifcFiles.map((file) => (
          <DropdownMenuItem
            key={file.path}
            onClick={() => handleSelect(file)}
            className="flex flex-col items-start gap-1 py-3"
          >
            <div className="flex items-center gap-2 font-medium">
              <FileText className="h-4 w-4 text-primary" />
              {file.name}
            </div>
            <p className="text-xs text-muted-foreground">{file.description}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
