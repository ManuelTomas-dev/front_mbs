"use client";

import DialogContainer from "@/components/generic/dialog-container";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneIcon, FlameIcon, Check, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ContactInformation from "./contact-information";
import TypeInformation from "./type-information";
import Search from "@/components/generic/search";
import ActionBar from "@/components/generic/action-bar";
import Table from "@/components/generic/table";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface DialogDetailsProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DialogDetails({ open, setOpen }: DialogDetailsProps) {
  const [searchActivity, setSearchActivity] = useState("");
  const [searchNotes, setSearchNotes] = useState("");
  const [searchAttachments, setSearchAttachments] = useState("");

  const activityTableHeads = ["Created At", "User", "Title", "Content"];
  const notesTableHeads = ["User", "Content", "Created At"];
  const attachmentsTableHeads = ["User", "File", "Created At"];

  return (
    <DialogContainer
      title="Lead"
      description="Details about the lead"
      open={open}
      setOpen={setOpen}
    >
      <div className="grid grid-cols-6">
        <ContactInformation
          name="Manuel Tomás"
          email="manuel.tomas@netag.ao"
          role="Procurement Manager"
          phoneNumber="+244 945 340 598"
        />
        <TypeInformation />
      </div>
      <Separator />
      <div className="flex flex-col">
        <h3 className="font-semibold py-2 ml-3">Description & Email Inquiry</h3>
        <Textarea
          rows={10}
          className="max-h-[10px] overflow-y-auto resize-none"
          value={`Good day,
I am Paulo Almeida, the Procurement Manager at Chevron
Angola. I am reaching out to request a quotation for the supply
and installation of filtration systems for an offshore tank.
Please find atached our RFQ with detailed specifications and
requirements. We would appreciate your prompt response
Best regards
Paulo Almeida
Chevron Angola`}
          readOnly
        />
      </div>
      <div className="flex justify-end">
        <Button type="button" className="w-[50px] self-end">
          <Download />
        </Button>
      </div>
      <Separator />

      <div className="w-full">
        <Tabs defaultValue="activity" className="w-full">
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          <TabsContent value="activity">
            <ActionBar>
              <Search
                searchBarPlaceholder="Search activities..."
                searchTerm={searchActivity}
                setSearchTerm={setSearchActivity}
              />
            </ActionBar>
            <Table tableHeads={activityTableHeads}></Table>
          </TabsContent>
          <TabsContent value="notes">
            <ActionBar>
              <Search
                searchBarPlaceholder="Search notes..."
                searchTerm={searchNotes}
                setSearchTerm={setSearchNotes}
              />
            </ActionBar>
            <Table tableHeads={notesTableHeads}></Table>
          </TabsContent>
          <TabsContent value="attachments">
            <ActionBar>
              <Search
                searchBarPlaceholder="Search attachments..."
                searchTerm={searchAttachments}
                setSearchTerm={setSearchAttachments}
              />
            </ActionBar>
            <Table tableHeads={attachmentsTableHeads}></Table>
          </TabsContent>
        </Tabs>
      </div>
      <DialogFooter className="mt-6">
        <Button type="submit">Convert To Opportunity</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogFooter>
    </DialogContainer>
  );
}

export default DialogDetails;
