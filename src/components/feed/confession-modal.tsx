"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

interface ConfessionModalProps {
  confession: Confession;
  children: React.ReactNode; // Card จะมาเป็น trigger
}

export function ConfessionModal({
  confession,
  children,
}: ConfessionModalProps) {
  const [commentList, setCommentList] = React.useState(
    confession.commentList || []
  );
  const [newComment, setNewComment] = React.useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newC: Comment = {
      id: commentList.length + 1,
      username: "You",
      avatar: "https://i.pravatar.cc/40?u=new",
      text: newComment,
    };
    setCommentList([newC, ...commentList]);
    setNewComment("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={confession.avatar} alt={confession.username} />
              <AvatarFallback>
                {confession.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {confession.username} Confession
          </DialogTitle>
        </DialogHeader>

        {/* Confession Text */}
        <p className="mt-2 text-sm">{confession.text}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {confession.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Reactions */}
        <div className="flex gap-4 text-sm mt-4">
          <Button size="sm">👍 {confession.likes}</Button>
          <Button size="sm">👎 {confession.dislikes}</Button>
          <Button size="sm">
            💬 {confession.comments + commentList.length}
          </Button>
        </div>

        {/* Comment List */}
        <div className="mt-6 max-h-64 overflow-y-auto space-y-3 border-t pt-4">
          {commentList.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <Avatar className="h-6 w-6 flex-shrink-0">
                <AvatarImage src={c.avatar} alt={c.username} />
                <AvatarFallback>{c.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-semibold">{c.username}</span>
                <span className="text-xs text-muted-foreground">{c.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input to add comment */}
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
