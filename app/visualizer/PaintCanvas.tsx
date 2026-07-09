"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

export type Point = { x: number; y: number };
export type Region = { id: string; points: Point[]; color: string };

const MAX_DIMENSION = 1400;
const DRAG_THRESHOLD = 6;

type Props = {
  imageUrl: string;
  regions: Region[];
  onRegionsChange: (regions: Region[]) => void;
  activeColor: string;
  opacity: number;
};

type DrawingState = {
  points: Point[];
  moved: boolean;
  startX: number;
  startY: number;
};

const PaintCanvas = forwardRef<HTMLCanvasElement, Props>(function PaintCanvas(
  { imageUrl, regions, onRegionsChange, activeColor, opacity },
  forwardedRef
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const drawingRef = useRef<DrawingState | null>(null);
  const [ready, setReady] = useState(false);

  useImperativeHandle(forwardedRef, () => canvasRef.current as HTMLCanvasElement);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    regions.forEach((region) => {
      if (region.points.length < 3) return;
      const path = new Path2D();
      path.moveTo(region.points[0].x, region.points[0].y);
      region.points.slice(1).forEach((p) => path.lineTo(p.x, p.y));
      path.closePath();

      ctx.save();
      ctx.clip(path);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = region.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    });

    const drawing = drawingRef.current;
    if (drawing && drawing.points.length > 1) {
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(drawing.points[0].x, drawing.points[0].y);
      drawing.points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.restore();
    }
  }, [regions, opacity, activeColor]);

  useEffect(() => {
    setReady(false);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const scale = Math.min(
        1,
        MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight)
      );
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      imageRef.current = img;
      setReady(true);
    };
    img.src = imageUrl;
    return () => {
      img.onload = null;
    };
  }, [imageUrl]);

  useEffect(() => {
    if (ready) draw();
  }, [ready, draw]);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    canvas.setPointerCapture(e.pointerId);
    const point = getPoint(e);
    drawingRef.current = {
      points: [point],
      moved: false,
      startX: point.x,
      startY: point.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drawing = drawingRef.current;
    if (!drawing) return;
    const point = getPoint(e);
    const dx = point.x - drawing.startX;
    const dy = point.y - drawing.startY;
    if (!drawing.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      drawing.moved = true;
    }
    if (drawing.moved) {
      drawing.points.push(point);
      draw();
    }
  };

  const handlePointerUp = () => {
    const drawing = drawingRef.current;
    if (!drawing) return;
    drawingRef.current = null;

    if (drawing.moved && drawing.points.length > 2) {
      const newRegion: Region = {
        id: `region-${regions.length}-${Math.random().toString(36).slice(2, 8)}`,
        points: drawing.points,
        color: activeColor,
      };
      onRegionsChange([...regions, newRegion]);
    } else {
      const clickPoint = drawing.points[0];
      let hitIndex = -1;
      for (let i = regions.length - 1; i >= 0; i -= 1) {
        if (isPointInPolygon(clickPoint, regions[i].points)) {
          hitIndex = i;
          break;
        }
      }
      if (hitIndex >= 0) {
        onRegionsChange(
          regions.map((r, idx) => (idx === hitIndex ? { ...r, color: activeColor } : r))
        );
      } else {
        draw();
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="w-full touch-none rounded-2xl border border-white/10"
      style={{ cursor: "crosshair" }}
    />
  );
});

export default PaintCanvas;

function isPointInPolygon(point: Point, vertices: Point[]) {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
