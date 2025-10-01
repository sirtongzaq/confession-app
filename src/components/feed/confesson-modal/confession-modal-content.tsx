"use client";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ReactionModalButtons } from "./reaction-modal-buttons";
import { Confession } from "@/type";
import { ImagePreview } from "../image-view/image-preview";

interface ConfessionModalContentProps {
  text: Confession["text"];
  tags: Confession["tags"];
  likes: Confession["likes"];
  dislikes: Confession["dislikes"];
  comments: Confession["comments"];
  imageUrl: Confession["imageUrl"];
}

export function ConfessionModalContent({
  text,
  tags,
  likes,
  dislikes,
  comments,
  imageUrl,
}: ConfessionModalContentProps) {
  return (
    <div className="p-2 flex flex-col gap-3">
      <div
        className="
          text-sm text-foreground/90 
          break-all
          whitespace-pre-wrap 
          overflow-y-auto
          leading-relaxed
        "
        dangerouslySetInnerHTML={{ __html: text }}
      />

      <ImagePreview images={imageUrl ? imageUrl : []} />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/40 text-secondary-foreground/90 backdrop-blur-sm"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <ReactionModalButtons
        likes={likes}
        dislikes={dislikes}
        comments={comments}
      />
    </div>
  );
}
