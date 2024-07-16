/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import Konva from "konva";
import useImage from "use-image";
import { Layer, Stage, Image as KonvaImage } from "react-konva";
import demoImage from "../../../assets/Image.png";

export default function ErrorImage() {
  const isImagePlacedCenter = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef(null);
  const [image] = useImage(demoImage);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
        setImageSize({
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [image]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: (containerRef.current as any)?.offsetWidth,
          height: (containerRef.current as any)?.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (stage) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (pointer) {
        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale,
        };

        const scaleBy = 1.05;
        const newScale =
          e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        // if (newScale < 1) newScale = 1; // Giới hạn mức thu nhỏ tối đa là 1

        setScale(newScale);

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };
        setPosition(newPos);
      }
    }
  };

  const handleReset = () => {
    if (containerSize.width && imageSize.width) {
      const posX = (containerSize.width - imageSize.width * imageScale) / 2;
      const posY = (containerSize.height - imageSize.height * imageScale) / 2;
      setPosition({ x: posX, y: posY });
      setScale(1);
    }
  };

  const imageScale = useMemo(() => {
    if (imageSize.width === 0 || containerSize.width === 0) return 1;
    if (imageSize.width > imageSize.height) {
      return containerSize.width / imageSize.width;
    } else {
      return containerSize.height / imageSize.height;
    }
  }, [containerSize, imageSize]);

  useEffect(() => {
    // Place image on center of stage container
    if (
      !isImagePlacedCenter.current &&
      containerSize.width &&
      imageSize.width
    ) {
      isImagePlacedCenter.current = true;
      const posX = (containerSize.width - imageSize.width * imageScale) / 2;
      const posY = (containerSize.height - imageSize.height * imageScale) / 2;
      setPosition({ x: posX, y: posY });
      setScale(1);
    }
  }, [containerSize, imageSize, imageScale]);

  return (
    <div className="w-full h-full relative">
      <div className="bg-white w-full h-full" ref={containerRef}>
        <Stage
          width={containerSize.width}
          height={containerSize.height}
          ref={stageRef}
          x={position.x}
          y={position.y}
          scaleX={scale}
          scaleY={scale}
          onWheel={handleWheel}
          draggable
          onDragEnd={(e) => {
            setPosition({ x: e.target.x(), y: e.target.y() });
          }}
        >
          <Layer>
            <KonvaImage
              image={image}
              width={imageScale * imageSize.width}
              height={imageScale * imageSize.height}
            />
          </Layer>
        </Stage>
      </div>
      <button
        onClick={handleReset}
        className="absolute flex items-center justify-center bottom-2 left-2 bg-blue-500 text-white w-10 h-10 rounded-full hover:bg-blue-700"
      >
        <GrPowerReset size={20} />
      </button>
    </div>
  );
}
