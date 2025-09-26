"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfessionModalContent } from "./confession-modal-content";
import { ConfessionModalCommentList } from "./confession-modal-comment-list";
import { ConfessionModalCommentInput } from "./confession-modal-comment-input";
import { ConfessionModalHeader } from "./confession-modal-header";

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
      <DialogContent className="sm:max-w-lg rounded-2xl border border-border/50 bg-background/70 backdrop-blur-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground border-b border-border/50 p-4">
            <ConfessionModalHeader username={confession.username} avatar={confession.avatar} />
          </DialogTitle>
        </DialogHeader>

        <ConfessionModalContent
          text={confession.text}
          tags={confession.tags}
          likes={confession.likes}
          dislikes={confession.dislikes}
          comments={confession.comments}
        />

        <ConfessionModalCommentList commentList={commentList} />

        <ConfessionModalCommentInput
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      </DialogContent>
    </Dialog>
  );
}
