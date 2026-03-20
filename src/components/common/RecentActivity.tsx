import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { History, User as UserIcon } from "lucide-react";

// Configuração do dayjs
dayjs.extend(relativeTime);
dayjs.locale("en");

export function RecentActivity({ activities }: { activities: any[] }) {
  return (
    <Card className="h-full border-none shadow-none bg-muted/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-250px)] pr-4">
          <div className="space-y-6">
            {activities?.map((lead) => (
              <div key={lead.id} className="relative flex gap-4">
                {/* Linha vertical de conexão (Timeline) */}
                <div className="absolute left-4 top-10 bottom-0 w-px bg-border last:display-none" />
                
                <Avatar className="h-9 w-9 border-2 border-background z-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs uppercase">
                    {lead.user?.username?.substring(0, 2) || "AD"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium leading-none">
                      New lead: <span className="text-primary">{lead.reference}</span>
                    </p>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                      {lead.status}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-1 italic">
                    "{lead.description}"
                  </p>

                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      Published {dayjs(lead.created_at).fromNow()}
                    </span>
                    <span className="text-[11px] font-medium flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      By: {lead.user?.username || "System"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {activities?.length === 0 && (
              <p className="text-xs text-center text-muted-foreground py-10">
                No recent activities to show.
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}