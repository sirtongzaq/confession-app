import { ModeToggle } from "@/components/layout/toggle-theme";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function FeedPage() {
  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground">
      {/* Sidebar (ซ่อนใน mobile, โชว์ใน desktop) */}
      <aside className="hidden md:flex flex-col w-60 border-r p-4 items-center">
        <Image
          src="/icon-512.png"
          alt="Confession Logo"
          width={64}
          height={64}
        />
        <Button variant="ghost" className="w-full">Home</Button>
        <Button variant="ghost" className="w-full">Search</Button>
        <Button variant="ghost" className="w-full">Profile</Button>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 max-w-xl border-r">
        <div className="border-b p-4">
          <Textarea placeholder="บอกความลับของคุณ..." className="w-full" />
          <div className="flex justify-end mt-2">
            <Button>Post</Button>
          </div>
        </div>

        {/* Post card */}
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-none border-b">
            <CardContent className="p-4">
              <p>นี่คือความลับ #{i} 😈</p>
              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                <button>👍 12</button>
                <button>👎 3</button>
                <button>💬 5</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Right Sidebar (desktop only) */}
      <aside className="hidden lg:flex flex-col w-80 p-4">
        <h2 className="font-semibold mb-2">Trending</h2>
        <ul className="text-sm space-y-1">
          <li>#confession</li>
          <li>#secret</li>
          <li>#anon</li>
        </ul>
      </aside>

      <ModeToggle></ModeToggle>
    </div>
  );
}
