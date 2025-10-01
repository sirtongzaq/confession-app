"use client";

import { Confession } from "@/type";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { DialogContent, DialogTitle } from "../../ui/dialog";

interface ImageFullProps {
  images: Confession["imageUrl"];
  selectedIndex: number;
  onOpenAutoFocus?: (e: Event) => void;
}

export function ImageFull({
  images,
  selectedIndex,
  onOpenAutoFocus,
}: ImageFullProps) {
  const imgs = Array.isArray(images) ? images : images ? [images] : [];
  return (
    <DialogContent
      onOpenAutoFocus={onOpenAutoFocus}
      className="max-w-screen w-screen h-[90vh] border border-border/50 bg-background/70 backdrop-blur-md shadow-lg p-0 flex items-center justify-center"
    >
      <DialogTitle className="sr-only">Image preview</DialogTitle>

      <Carousel
        className="w-full h-full flex items-center justify-center"
        opts={{ startIndex: selectedIndex }} // ⭐ เริ่มที่รูปที่เลือก
      >
        <CarouselContent>
          {imgs.map((full, i) => (
            <CarouselItem
              key={i}
              className="flex items-center justify-center h-full"
            >
              <Image
                src={full}
                alt={`full ${i}`}
                width={1920}
                height={1080}
                className="max-h-[90vh] max-w-full object-contain"
                unoptimized
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-12" />
        <CarouselNext className="right-4 md:right-12" />
      </Carousel>
    </DialogContent>
  );
}
