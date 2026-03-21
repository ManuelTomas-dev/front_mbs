import type { Metadata } from "next"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

import { AuthForm } from "./components/auth-form"

export const metadata: Metadata = {
    title: "MBS",
    description: "Leading provider of equipment certification and inspection services for the oil and gas industry, ensuring safety, quality, and compliance in offshore operations",
}

// container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 


export default function AuthenticationPage() {
    return (
        <div className="py-6 lg:py-0  h-screen bg-blue-50">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 h-full">
                <div className="relative h-full flex-col bg-muted p-10 text-gray-50 dark:border-r bg-center bg-cover lg:flex col-span-2  rounded-r-4xl" style={{ backgroundImage: "url('/mbs.jpeg')" }}>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                            {/* <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#0c84fa" }}></div> */}
                        </div>
                        <h1 className="text-xl font-semibold text-white"> MBS</h1>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-4xl text-white mb-6 leading-tight">Effortlessly manage your team and operations.</h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Log in to access your CRM dashboard and manage your team.
                        </p>
                    </div>

                    <div className="flex justify-between items-center text-white/70 text-sm">
                        <span>Copyright © 2026  MBS Enterprises LTD.</span>
                        <span className="cursor-pointer hover:text-white/90">Privacy Policy</span>
                    </div>
                </div>

                {/* Right side - Auth Form */}
                <div className="lg:p-8 rounded-4xl flex items-center justify-center">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
                        <AuthForm />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>
                        <Button variant="outline" type="button" className="w-full bg-transparent">
                            Create new account
                        </Button>

                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="#/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of use
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="#/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
