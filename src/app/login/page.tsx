"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { ModeToggle } from "@/components/layout/toggle-theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, LockIcon } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        toast.error("Login failed");
        return;
      }

      toast.success(`Welcome back! @${email}`);
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        toast.error("Sign up failed");
        return;
      }

      toast.success(`Account created! Please login.`);
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background text-foreground">
      <div
        className="absolute inset-0 z-0 animate-backgroundMove"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
            radial-gradient(circle, rgba(51,65,85,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 20px 20px",
        }}
      />

      <div className="fixed bottom-10 right-10 xl:right-20 rounded-full flex items-center justify-center gap-0.5 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
        <ModeToggle />
      </div>

      

      <Card className="w-full max-w-sm z-10">
        <CardHeader className="flex flex-col items-center">
          <Image src="/icon-512.png" alt="Confession Logo" width={64} height={64} />
          <p className="mt-2 text-lg font-medium">Confession</p>
        </CardHeader>

        <Tabs defaultValue="login" className="w-full rounded-none">
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="login">
              <LockIcon className="mr-2 h-4 w-4" /> Login
            </TabsTrigger>
            <TabsTrigger value="signup">
              <UserIcon className="mr-2 h-4 w-4" /> Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent>
                <div className="grid gap-4 my-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email-login"
                      type="email"
                      placeholder="confession@gmail.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password-login">Password</Label>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password-login"
                      type="password"
                      placeholder="*********"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <CardContent>
                <div className="grid gap-4 my-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email-signup"
                      type="email"
                      placeholder="confession@gmail.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password-signup"
                      type="password"
                      placeholder="*********"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
