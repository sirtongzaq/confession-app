"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ConfessionModal } from "@/components/feed/confession-modal";

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
}

interface Confession {
  id: number;
  username: string;
  avatar: string;
  text: string;
  tags: string[];
  likes: number;
  dislikes: number;
  comments: number;
  commentList?: Comment[];
}

// ตัวอย่างข้อมูล
const initialConfessions: Confession[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  username: `User${i + 1}`,
  avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
  text: `นี่คือความลับหมายเลข ${
    i + 1
  }. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed.`,
  tags: ["#funny", "#work", "#secret"].slice(0, (i % 3) + 1),
  likes: Math.floor(Math.random() * 50),
  dislikes: Math.floor(Math.random() * 10),
  comments: Math.floor(Math.random() * 20),
  commentList: Array.from(
    { length: Math.floor(Math.random() * 5) + 1 },
    (_, j) => ({
      id: j + 1,
      username: `Commenter${j + 1}`,
      avatar: `https://i.pravatar.cc/32?img=${((i + j) % 70) + 1}`,
      text: `นี่คือคอมเมนต์ที่ ${j + 1} ของความลับหมายเลข ${i + 1}`,
    })
  ),
}));

export default function FeedPage() {
  const [confessions, setConfessions] = React.useState(initialConfessions);
  const [loading, setLoading] = React.useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const more = Array.from({ length: 6 }, (_, i) => ({
        id: confessions.length + i + 1,
        username: `User${confessions.length + i + 1}`,
        avatar: `https://i.pravatar.cc/40?img=${(confessions.length + i) % 70}`,
        text: `นี่คือความลับหมายเลข ${
          confessions.length + i + 1
        }. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        tags: ["#funny", "#work", "#secret"].slice(
          0,
          ((confessions.length + i) % 3) + 1
        ),
        likes: Math.floor(Math.random() * 50),
        dislikes: Math.floor(Math.random() * 10),
        comments: Math.floor(Math.random() * 20),
        commentList: Array.from(
          { length: Math.floor(Math.random() * 5) + 1 },
          (_, j) => ({
            id: j + 1,
            username: `Commenter${j + 1}`,
            avatar: `https://i.pravatar.cc/32?img=${((i + j) % 70) + 1}`,
            text: `นี่คือคอมเมนต์ที่ ${j + 1} ของความลับหมายเลข ${i + 1}`,
          })
        ),
      }));
      setConfessions([...confessions, ...more]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Confession Feed</h1>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {confessions.map((c) => (
            <ConfessionModal key={c.id} confession={c}>
              <Card className="cursor-pointer rounded-2xl border overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-lg hover:border-accent">
                <div className="flex items-center gap-2 p-3 border-b">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={c.avatar} alt={c.username} />
                    <AvatarFallback>
                      {c.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">{c.username}</span>
                </div>

                <CardContent className="p-4 flex flex-col gap-2">
                  <p className="text-sm line-clamp-4">{c.text}</p>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                    <span>👍 {c.likes}</span>
                    <span>👎 {c.dislikes}</span>
                    <span>💬 {c.comments}</span>
                  </div>
                </CardContent>
              </Card>
            </ConfessionModal>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      </div>
    </div>
  );
}
