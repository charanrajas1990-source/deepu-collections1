"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, Upload, Loader2, ImagePlus } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (urls: string[]) => void;
  thumbnail?: string;
  onThumbnailChange?: (url: string) => void;
  maxImages?: number;
}

export default function ImageUploader({
  images,
  onChange,
  thumbnail,
  onThumbnailChange,
  maxImages = 8,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url;
  }, []);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArr = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (!fileArr.length) return;

      const remaining = maxImages - images.length;
      if (remaining <= 0) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      const toUpload = fileArr.slice(0, remaining);
      setError("");
      setUploading(true);

      try {
        const uploaded = await Promise.all(toUpload.map(uploadFile));
        const newImages = [...images, ...uploaded];
        onChange(newImages);
        // Auto-set first image as thumbnail if none set
        if (!thumbnail && onThumbnailChange && newImages.length > 0) {
          onThumbnailChange(newImages[0]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [images, onChange, thumbnail, onThumbnailChange, maxImages, uploadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeImage = (url: string) => {
    const updated = images.filter((u) => u !== url);
    onChange(updated);
    if (thumbnail === url && onThumbnailChange) {
      onThumbnailChange(updated[0] || "");
    }
  };

  const setAsThumbnail = (url: string) => {
    if (onThumbnailChange) onThumbnailChange(url);
  };

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-[#D4AF37] bg-[#D4AF37]/10"
            : "border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:bg-white/5"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
              <p className="text-sm text-[#FAF9F6]/60">Uploading to Cloudinary...</p>
            </>
          ) : (
            <>
              <ImagePlus className="w-8 h-8 text-[#D4AF37]/60" />
              <p className="text-sm text-[#FAF9F6]/70">
                <span className="text-[#D4AF37] font-medium">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs text-[#FAF9F6]/30">
                JPG, PNG, WebP — max 10MB each · {images.length}/{maxImages} uploaded
              </p>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((url, i) => (
            <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-[#160B1E] border border-[#D4AF37]/20">
              <Image
                src={url}
                alt={`Product image ${i + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
              {/* Thumbnail badge */}
              {thumbnail === url && (
                <span className="absolute top-1 left-1 text-[9px] bg-[#D4AF37] text-[#160B1E] font-bold px-1.5 py-0.5 rounded">
                  COVER
                </span>
              )}
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                {thumbnail !== url && (
                  <button
                    type="button"
                    onClick={() => setAsThumbnail(url)}
                    className="w-full text-[9px] py-1 bg-[#D4AF37] text-[#160B1E] font-semibold rounded"
                  >
                    Set Cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="w-full text-[9px] py-1 bg-red-900/80 text-red-300 font-semibold rounded flex items-center justify-center gap-1"
                >
                  <X className="w-2.5 h-2.5" /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add more button */}
          {images.length < maxImages && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-[#D4AF37]/20 hover:border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]/40 hover:text-[#D4AF37]/70 transition-colors"
            >
              <Upload className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
