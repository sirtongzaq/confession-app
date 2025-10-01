"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { ConfessionCardHeader } from "./confession-card-header";
import { ConfessionCardContent } from "./confession-card-content";
import { ConfessionModal } from "../confesson-modal/confession-modal";
import { InView } from "../../../../components/motion-primitives/in-view";
import { Confession } from "@/type";

interface ConfessionCardProps {
  confession: Confession;
}

export function ConfessionCard({ confession }: ConfessionCardProps) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      viewOptions={{ margin: "0px 0px -200px 0px" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <ConfessionModal confession={confession}>
        <Card
          className="
          cursor-pointer rounded-2xl overflow-hidden
          transition-transform duration-200 ease-out
          hover:scale-[1.02] hover:shadow-xl hover:border-accent/50
          backdrop-blur-md
        "
        >
          <ConfessionCardHeader
            username={confession.username}
            avatar={confession.avatar}
          />
          <ConfessionCardContent
            text={confession.text}
            tags={confession.tags}
            likes={confession.likes}
            dislikes={confession.dislikes}
            comments={confession.comments}
            imageUrl={confession.imageUrl}
          />
        </Card>
      </ConfessionModal>
    </InView>
  );
}
