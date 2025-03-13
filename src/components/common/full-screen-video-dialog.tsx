"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"

interface Props {
  videoSrc: string
  triggerComponent: React.ReactNode
  title?: string
}

const FullscreenVideoDialog = ({ videoSrc, triggerComponent, title }: Props) => {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh] p-0 border-none bg-tertiary rounded-lg">
        <div className="relative w-full h-full flex flex-col">
          {title && (
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
              <h2 className="text-white text-xl font-bold">{title}</h2>
            </div>
          )}

          <DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={videoSrc}
            autoPlay
            muted
            controls
            playsInline
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FullscreenVideoDialog;
