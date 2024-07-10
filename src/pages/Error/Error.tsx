/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Image as KonvaImage,
  Transformer,
} from "react-konva";
import useImage from "use-image";
export default function Error() {
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const [rectangles, setRectangles] = useState<any>([]);
  const [image] = useImage(
    "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJvd3NlfGVufDB8fDB8fHww"
  );
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

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

  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    console.log("handleDoubleClick", e);
    const stage = stageRef.current;
    if (!stage) return;
    const pointerPosition = (stage as any)?.getPointerPosition();

    const newRect = {
      x: pointerPosition.x,
      y: pointerPosition.y,
      width: 200,
      height: 100,
      fill: null,
      stroke: "blue",
      strokeWidth: 2,
      id: `rect${rectangles.length}`,
    };

    setRectangles([...rectangles, newRect]);
  };

  const handleDragEnd = (
    e: Konva.KonvaEventObject<DragEvent>,
    index: number
  ) => {
    console.log("handleDragEnd", e, index);
    const newRects = rectangles.slice();
    newRects[index].x = e.target.x();
    newRects[index].y = e.target.y();
    setRectangles(newRects);
  };

  const handleTransformEnd = (
    e: Konva.KonvaEventObject<Event>,
    index: number
  ) => {
    console.log("handleTransformEnd", e, index);
    const newRects = rectangles.slice();
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    newRects[index].x = node.x();
    newRects[index].y = node.y();
    newRects[index].width = node.width() * scaleX;
    newRects[index].height = node.height() * scaleY;

    // Reset scale to avoid further scaling
    node.scaleX(1);
    node.scaleY(1);

    setRectangles(newRects);
  };

  useEffect(() => {
    if (stageRef.current) {
      console.log("stageRef.current", stageRef.current, selectedShape);
    }
  });

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (stageRef.current) {
      const stage = stageRef.current;
      const pointerPosition = (stage as any).getPointerPosition();
      const shapes = (stage as any).getAllIntersections(pointerPosition);

      if (shapes.length) {
        // Sort shapes based on area (smaller shapes first)
        shapes.sort((a:any, b:any) => {
          const aArea = a.width() * a.height();
          const bArea = b.width() * b.height();
          return aArea - bArea;
        });

        // Select the smallest shape
        setSelectedShape(shapes[0].id());
      } else {
        // Click on empty area - remove selection
        setSelectedShape(null);
      }
    }
  };

  return (
    <div className="grid grid-cols-12 w-full h-full">
      <div className="bg-orange-400 col-span-7" ref={containerRef}>
        <Stage
          width={containerSize.width}
          height={600}
          ref={stageRef}
          onDblClick={handleDoubleClick}
          onClick={handleStageClick}
        >
          <Layer>
            <KonvaImage
              image={image}
              width={containerSize.width}
              height={600}
            />
            {rectangles.map((rect: any, index: number) => (
              <Rect
                onClick={() => {
                  setSelectedShape(rect.id);
                }}
                key={rect.id}
                {...rect}
                draggable
                onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) =>
                  handleDragEnd(e, index)
                }
                onTransformEnd={(e: Konva.KonvaEventObject<Event>) =>
                  handleTransformEnd(e, index)
                }
              />
            ))}
            {stageRef.current && selectedShape && (
              <Transformer
                nodes={[
                  (stageRef.current as any)?.findOne(`#${selectedShape}`),
                ]}
                boundBoxFunc={(oldBox, newBox) => {
                  // limit resize
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
                rotateEnabled={false}
              />
            )}
          </Layer>
        </Stage>
      </div>
      <div className="bg-orange-600 col-span-5">Error List</div>
    </div>
  );
}
