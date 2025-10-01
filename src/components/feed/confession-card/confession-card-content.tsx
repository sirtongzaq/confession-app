"use client";
import * as React from "react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactionButtons } from "./reaction-buttons";
import { Confession } from "@/type";
import Image from "next/image";

interface ConfessionCardContentProps {
  text: Confession["text"];
  tags: Confession["tags"];
  likes: Confession["likes"];
  dislikes: Confession["dislikes"];
  comments: Confession["comments"];
  imageUrl?: Confession["imageUrl"];
}

export function ConfessionCardContent({
  text,
  tags,
  likes,
  dislikes,
  comments,
  imageUrl,
}: ConfessionCardContentProps) {
  return (
    <CardContent className="p-4 flex flex-col gap-3">
      <div
        className=" text-sm text-foreground/90 
          w-full 
          break-all 
          whitespace-pre-wrap 
          overflow-hidden
          leading-relaxed 
          line-clamp-5"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {imageUrl && (
        <div className="relative w-full max-h-60 overflow-hidden rounded-xl shadow-md">
          <Image
            src={Array.isArray(imageUrl) ? imageUrl[0] : imageUrl} // แสดงรูปแรก
            alt="Confession Image"
            width={400}
            height={300}
            className="w-full h-full object-cover rounded-xl backdrop-blur-sm bg-white/10"
          />

          {Array.isArray(imageUrl) && imageUrl.length > 1 && (
            <div className="absolute top-2 right-2
            text-foreground text-sm px-2 py-1 rounded-full
            bg-white/10 backdrop-blur-md border border-white/20
            hover:bg-white/20 transition-all duration-300 shadow-lg
            ">
              +{imageUrl.length - 1}
            </div>
          )}
        </div>
      )}

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

      <ReactionButtons likes={likes} dislikes={dislikes} comments={comments} />
    </CardContent>
  );
}
