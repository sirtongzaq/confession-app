"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ConfessionCard } from "@/components/feed/confession-card/confession-card";
import { Input } from "@/components/ui/input";
import { FabButton } from "@/components/feed/fab-button";
import { PostConfessionModal } from "@/components/feed/post-confession-modal/post-confession-modal";
import { SlidingNumberBasic } from "@/components/feed/sliding-number-basic";
import { nanoid } from "nanoid";
import { Confession } from "@/type";

// ตัวอย่างข้อมูล
const initialConfessions: Confession[] = Array.from({ length: 12 }, (_, i) => ({
  id: nanoid(),
  username: `User${i + 1}`,
  avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
  text: `นี่คือความลับหมายเลข ${i + 1}. Lorem ipsum dolor sit amet.`,
  tags: ["#funny", "#work", "#secret"].slice(0, (i % 3) + 1),
  likes: (i * 3) % 50, // deterministic formula
  dislikes: (i * 2) % 10, // deterministic formula
  comments: (i * 5) % 20, // deterministic formula
  commentList: Array.from({ length: (i % 5) + 1 }, (_, j) => ({
    id: j + 1,
    username: `Commenter${j + 1}`,
    avatar: `https://i.pravatar.cc/32?img=${((i + j) % 70) + 1}`,
    text: `นี่คือคอมเมนต์ที่ ${j + 1} ของความลับหมายเลข ${i + 1}`,
  })),
}));

export default function FeedPage() {
  const [confessions, setConfessions] = React.useState(initialConfessions);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  const loadMore = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const more = Array.from({ length: 6 }, (_, i) => ({
        id: nanoid(),
        username: `User${confessions.length + i + 1}`,
        avatar: `https://i.pravatar.cc/40?img=${(confessions.length + i) % 70}`,
        text: `นี่คือความลับหมายเลข ${
          confessions.length + i + 1
        }. Lorem ipsum dolor sit amet.`,
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
        imageUrl: [
          `https://picsum.photos/id/${confessions.length + i + 1}/1080`,
          `https://picsum.photos/id/${confessions.length + i + 2}/1080`,
        ],
      }));
      setConfessions((prev) => [...prev, ...more]);
      setLoading(false);
    }, 1000);
  }, [confessions]);

  React.useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const displayedConfessions = confessions.filter((c) => {
    const matchesSearch = c.text.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0
        ? true
        : c.tags.some((tag) => selectedTags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(new Set(confessions.flatMap((c) => c.tags)));

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Confession Feed</h1>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <Input
            placeholder="Search confessions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 glass-input"
          />
          <div className="flex gap-2 flex-wrap">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);

              return (
                <Button
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => {
                    if (isSelected) {
                      // ถ้าเลือกอยู่แล้ว กดอีกครั้ง = เอาออก
                      setSelectedTags(selectedTags.filter((t) => t !== tag));
                    } else {
                      // เพิ่ม tag ใหม่
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className="glass-button text-[12px] px-2 py-1 rounded-full"
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedConfessions.map((c) => (
            <ConfessionCard key={c.id} confession={c} />
          ))}
        </div>

        {/* Sentinel สำหรับ Infinite Scroll */}
        <div ref={sentinelRef} className="h-6" />

        {loading && (
          <div className="text-center mt-4 text-muted-foreground">
            {/* Loading... */}
            <SlidingNumberBasic loading={loading} />
          </div>
        )}

        <FabButton onClick={() => setOpenModal(true)} size="md" />

        <PostConfessionModal
          open={openModal}
          setOpen={setOpenModal}
          onSubmit={(text, tags) => {
            const newConfession: Confession = {
              id: nanoid(),
              username: "You",
              avatar: "https://i.pravatar.cc/40?u=new",
              text,
              tags: tags || [],
              likes: 0,
              dislikes: 0,
              comments: 0,
              commentList: [],
              imageUrl: [
                `https://picsum.photos/id/${1}/1080`,
                `https://picsum.photos/id/${2}/1080`,
              ],
            };
            setConfessions([newConfession, ...confessions]);
          }}
        />
      </div>
    </div>
  );
}
