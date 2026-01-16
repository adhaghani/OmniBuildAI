'use client';

import { useState } from 'react';
import { TrendingUp, CheckCircle, Clock, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/dashboard/stats-card';
import { DocumentUpload } from '@/components/dashboard/document-upload';
import { RecentDocuments } from '@/components/dashboard/recent-documents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ButtonGroup } from '@/components/ui/button-group';
import FullAuditDialog from '@/components/overview/fullAuditDialog';

const page = () => {
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false);

  const handleRunAudit = () => {
    // TODO: Implement actual audit logic
    console.log('Starting full audit...');
    // You can add your audit logic here
  };
  return (
        <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Overview</h1>
          <p className="mt-1 text-muted-foreground">
            Upload BIM models and documents for AI-powered compliance analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
            <ButtonGroup>
                <Button size={"sm"} variant="outline" className="gap-2">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export Report
                </Button>
                <Button onClick={() => setIsAuditDialogOpen(true)} size={"sm"} className="gap-2">
            <Zap className="h-4 w-4" />
            Run Full Audit
                </Button>
          </ButtonGroup>
                <FullAuditDialog 
        open={isAuditDialogOpen}
        onOpenChange={setIsAuditDialogOpen}
        onConfirm={handleRunAudit}
         
              />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Compliance Score"
          value="76%"
          subtitle="+12%"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          iconBgColor="bg-primary/10"
          subtitleColor="text-primary font-semibold"
        />
        <StatsCard
          title="Credits Achieved"
          value="42/55"
          subtitle="Silver Status"
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
          iconBgColor="bg-primary/10"
          subtitleColor="text-primary font-semibold"
        />
        <StatsCard
          title="Pending Items"
          value="8"
          subtitle="Documents Needed"
          icon={<Clock className="h-5 w-5 text-secondary" />}
          iconBgColor="bg-secondary/10"
          subtitleColor="text-secondary font-semibold"
        />
        <StatsCard
          title="Issues Found"
          value="3"
          subtitle="Requires Action"
          icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
          iconBgColor="bg-destructive/10"
          subtitleColor="text-destructive font-semibold"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Document Upload - Takes 2 columns */}
        <div className="lg:col-span-2">
          <DocumentUpload />
        </div>

        {/* Recent Documents - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentDocuments />
        </div>
      </div>

      {/* AI Processing Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Processing Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Pipeline Steps */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Document Parse</p>
                    <p className="text-xs text-muted-foreground">Complete</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-secondary"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Material Extract</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Compliance Check</p>
                    <p className="text-xs text-muted-foreground">Queued</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Report Generate</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Info */}
            <div className="mt-4 rounded-lg bg-secondary/10 p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-secondary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    AI Analysis in Progress
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    DeepSeek V3.2 is analyzing HVAC_Specifications.pdf against GBL standards. 
                    Estimated completion: 2 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default page