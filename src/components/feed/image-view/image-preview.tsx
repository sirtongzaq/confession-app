"use client";

import { Confession } from "@/type";
import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Card, CardContent } from "../../ui/card";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { ImageFull } from "./image-full";

interface ImagePreviewProps {
  images?: Confession["imageUrl"];
}

export function ImagePreview({ images }: ImagePreviewProps) {
  const imgs = Array.isArray(images) ? images : images ? [images] : [];
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (imgs.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {imgs.map((img, idx) => (
            <CarouselItem key={idx}>
              <Dialog
                open={open}
                onOpenChange={(o) => {
                  setOpen(o);
                  if (!o) setSelectedIndex(0); // reset ถ้าปิด
                }}
              >
                <DialogTrigger asChild>
                  <div
                    className="p-0 cursor-pointer"
                    onClick={() => setSelectedIndex(idx)} // set index ที่คลิก
                  >
                    <Card className="p-0">
                      <CardContent className="relative flex aspect-square items-center justify-center p-6 w-full">
                        <Image
                          src={img}
                          alt={`preview ${idx}`}
                          fill
                          className="rounded-lg object-cover"
                          unoptimized
                        />
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
                <ImageFull
                  images={imgs}
                  selectedIndex={selectedIndex}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                />
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:-left-12" />
        <CarouselNext className="right-2 md:-right-12" />
      </Carousel>
    </div>
  );
}
