"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, CheckCircle, XCircle, Download } from "lucide-react";

const tabs = [
  "TotalEnergies",
  "Overview",
  "Requirements",
  "Documents",
  "Costs",
  "Team",
  "Submission",
  "Result",
];

const criteria = [
  {
    question: "Does the tender fit within our core business objectives?",
    decision: "Go",
    isGo: true,
    impact: "Low",
  },
  {
    question:
      "Is the operator an existing client or have a positive working relationship?",
    decision: "Go",
    isGo: true,
    impact: "Medium",
  },
  {
    question: "Will the revenue offset the costs?",
    decision: "Go",
    isGo: true,
    impact: "High",
  },
  {
    question: "Are there significant risks involved?",
    decision: "No-Go",
    isGo: false,
    impact: "Medium",
  },
  {
    question: "Is the competition level low to moderate?",
    decision: "Go",
    isGo: true,
    impact: "Medium",
  },
  {
    question: "Do we have the resources to meet the requirements?",
    decision: "Go",
    isGo: true,
    impact: "Low",
  },
];

export function GoNoGoDecision() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-slate-700">
          <CheckSquare className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Tender ID: TND-2026-014</h1>
          <span className="text-slate-400">|</span>
          <span>Barring: 25 Mar 2026</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                index === 0
                  ? "text-slate-800 border-b-2 border-[#1e3a5f] bg-white flex items-center gap-2"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {index === 0 && (
                <div className="w-5 h-5 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
              )}
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Main Content */}
          <div className="col-span-8 space-y-4">
            {/* Go/No-Go Decision Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 border-b border-slate-100">
                <CardTitle className="text-lg font-semibold text-slate-800">
                  Go / No-Go Decision
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-slate-700 mb-4">Proceed with the bid?</p>

                {/* Decision Boxes */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Go Box */}
                  <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-lg font-semibold text-green-700">
                          Go
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-green-700">
                        87%
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">Go Score: 40</p>
                  </div>

                  {/* No-Go Box */}
                  <div className="border border-slate-200 bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-lg font-semibold text-red-600">
                          No-Go
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-slate-700">
                        13%
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      No Go Score: <span className="text-red-600">5</span>
                    </p>
                  </div>
                </div>

                {/* Criteria Table */}
                <div>
                  <div className="grid grid-cols-12 py-2 border-b border-slate-200">
                    <div className="col-span-7 text-sm font-medium text-slate-600">
                      Criteria
                    </div>
                    <div className="col-span-3 text-sm font-medium text-slate-600 text-center">
                      Decision
                    </div>
                    <div className="col-span-2 text-sm font-medium text-slate-600 text-right">
                      Impact
                    </div>
                  </div>

                  {criteria.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 py-3 border-b border-slate-100 items-center"
                    >
                      <div className="col-span-7 text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-amber-500">+</span>
                        {item.question}
                      </div>
                      <div className="col-span-3 flex justify-center">
                        {item.isGo ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Go</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-500">
                            <XCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">No-Go</span>
                          </div>
                        )}
                      </div>
                      <div className="col-span-2 text-right text-sm text-slate-600">
                        {item.impact}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600">
                      Go Score:{" "}
                      <span className="font-semibold text-slate-800">40</span>
                    </span>
                    <span className="text-sm text-slate-600">
                      No-Go Score:{" "}
                      <span className="font-semibold text-red-600">5</span>
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Overscore:{" "}
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Decision */}
          <div className="col-span-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-slate-800">
                  Decision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* GO Badge */}
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <span className="text-2xl font-bold text-slate-700">GO</span>
                </div>

                {/* Recommendation Text */}
                <p className="text-sm text-slate-600">
                  Based on the current scores and strategic alignment, it's
                  recommended to proceed with the bid.
                </p>

                {/* Key Scores */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    Key scores
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Go:</span>
                    <span className="text-sm font-semibold text-green-600">
                      87%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">No-Go:</span>
                    <span className="text-sm font-semibold text-amber-600">
                      13%
                    </span>
                  </div>
                </div>

                {/* Analysis */}
                <p className="text-sm text-slate-600">
                  Strong market-fit and low competition provide significant
                  opportunity. Risks are minimal and align with our strategic
                  goals.
                </p>

                {/* Download Button */}
                <Button
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
