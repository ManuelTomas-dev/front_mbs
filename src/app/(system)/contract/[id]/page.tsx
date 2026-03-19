import { ContractAmendments } from "@/components/module/contract/amendments";
import { ContractDetail } from "@/components/module/contract/contract-details";
import { TenderCosts } from "@/components/module/tender/tender-cost";
import { TenderDetail } from "@/components/module/tender/tender-details";
import { TenderOverview } from "@/components/module/tender/tender-overview";
import { QuotationManagement } from "@/components/module/tender/tender-quotation";
import { GoNoGoDecision } from "@/components/module/tender/go-no-go-decision";
import { TenderSubmissionWorkflow } from "@/components/module/tender/tender-submission";
import { Overview } from "@/components/module/service/overview";
import { OperationalDetails } from "@/components/module/service/operational-details";
import { Resources } from "@/components/module/service/resources";
import { ResourcesDetail } from "@/components/module/service/resources-detail";
import { Attachments } from "@/components/module/service/attachments";
import { ApprovalHistory } from "@/components/module/service/approval-history";

export default function Page() {
  return (
    <>
      <Resources />
    </>
  );
}
