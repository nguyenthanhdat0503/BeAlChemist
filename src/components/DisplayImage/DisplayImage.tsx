/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Konva from "konva";
import { useEffect, useMemo, useRef, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import {
  Image as KonvaImage,
  Layer,
  Rect,
  Stage,
  Transformer,
} from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import useImage from "use-image";
import { RootState } from "../../store";
import { message } from "antd";
import { endSavingErrors } from "../../features/flow-controls/flow-controls.slice";
// const initRects = JSON.parse(localStorage.getItem("rectangles") || "[]");
export default function DisplayImage() {
  const isSavingErrors = useSelector(
    (state: RootState) => state.flowControls.isSavingErrors
  );
  const dispatch = useDispatch();
  const isImagePlacedCenter = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef(null);
  const [rectangles, setRectangles] = useState<any[]>([]);
  const [image] = useImage(
    "https://images.unsplash.com/photo-1720582760044-c4d220f09305?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isDraggingRect, setIsDraggingRect] = useState(false);

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

  const isInsideImage = (
    x: number,
    y: number,
    currentImgageWidth: number,
    currentImageHeight: number
  ) => {
    return (
      x >= 0 && y >= 0 && x <= currentImgageWidth && y <= currentImageHeight
    );
  };

  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const imagePositionX = Number(stage.getAttr("x"));
    const imagePositionY = Number(stage.getAttr("y"));
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();
    const x = (pointerPosition.x - imagePositionX) / scaleX;
    const y = (pointerPosition.y - imagePositionY) / scaleY;
    const imageCurrentWidth = imageSize.width * imageScale;
    const imageCurrentHeight = imageSize.height * imageScale;

    console.log("length", rectangles.length);
    if (rectangles.length >= 1) {
      message.error("Only 1 label is allowed", 2);
    } else if (isInsideImage(x, y, imageCurrentWidth, imageCurrentHeight)) {
      const INIT_WIDTH = 200;
      const INIT_HEIGHT = 100;

      // Create Rect
      const newRect = {
        x,
        y,
        // Nếu width hoặc height của Rect nhỏ hơn INIT_WIDTH hoặc INIT_HEIGHT thì lấy giá trị nhỏ hơn
        width:
          imageCurrentWidth - x < INIT_WIDTH
            ? imageCurrentWidth - x
            : INIT_WIDTH,
        height:
          imageCurrentHeight - y < INIT_HEIGHT
            ? imageCurrentHeight - y
            : INIT_HEIGHT,
        fill: null,
        stroke: "#35e43a",
        strokeWidth: 2,
        id: `rect${rectangles.length}`,
      };
      setRectangles([...rectangles, newRect]);
    }
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    // Giới hạn không cho Rect move ra khỏi vùng Image
    const node = e.target;
    const x = node.x();
    const y = node.y();
    const width = node.width() * node.scaleX();
    const height = node.height() * node.scaleY();

    if (x < 0) node.x(0);
    if (y < 0) node.y(0);
    if (x + width > imageSize.width * imageScale) {
      node.x(imageSize.width * imageScale - width);
    }
    if (y + height > imageSize.height * imageScale) {
      node.y(imageSize.height * imageScale - height);
    }
  };

  const handleTransformEnd = (
    e: Konva.KonvaEventObject<Event>,
    index: number
  ) => {
    const newRects = rectangles.slice();
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const width = node.width() * scaleX;
    const height = node.height() * scaleY;
    const x = node.x();
    const y = node.y();

    newRects[index].x = x;
    newRects[index].y = y;
    newRects[index].width = width;
    newRects[index].height = height;

    if (x < 0) {
      // x âm nên phải trừ lại để lấy width mới
      newRects[index].width = width + x;
      newRects[index].x = 0;
      node.x(0);
    }
    if (y < 0) {
      // y âm nên phải trừ lại để lấy height mới
      newRects[index].height = height + y;
      newRects[index].y = 0;
      node.y(0);
    }

    if (x + width > imageSize.width * imageScale) {
      // Nếu x + width lớn hơn chiều rộng của ảnh thì cắt bớt width
      newRects[index].width = imageSize.width * imageScale - x;
    }

    if (y + height > imageSize.height * imageScale) {
      // Nếu y + height lớn hơn chiều cao của ảnh thì cắt bớt height
      newRects[index].height = imageSize.height * imageScale - y;
    }

    node.scaleX(1);
    node.scaleY(1);

    setRectangles(newRects);
  };

  const handleReset = () => {
    if (containerSize.width && imageSize.width) {
      const posX = (containerSize.width - imageSize.width * imageScale) / 2;
      const posY = (containerSize.height - imageSize.height * imageScale) / 2;

      setPosition({ x: posX, y: posY });
      setScale(1);
    }
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (stageRef.current) {
      const stage = stageRef.current;
      const pointerPosition = stage.getPointerPosition();
      if (!pointerPosition) return;
      const shapes = stage.getAllIntersections(pointerPosition);

      if (shapes.length) {
        // Sort shapes based on area (smaller shapes first)
        shapes.sort((a: any, b: any) => {
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

  // useEffect(() => {
  //   setRectangles(
  //     initRects.map((rect: any) => ({
  //       ...rect,
  //       x: rect.x * imageScale,
  //       y: rect.y * imageScale,
  //       width: rect.width * imageScale,
  //       height: rect.height * imageScale,
  //     }))
  //   );
  // }, [imageScale]);

  const handleSave = () => {
    const storageRects = rectangles.map((rect) => {
      return {
        x: rect.x / imageScale,
        y: rect.y / imageScale,
        width: rect.width / imageScale,
        height: rect.height / imageScale,
        fill: rect.fill,
        stroke: rect.stroke,
        strokeWidth: rect.strokeWidth,
        id: rect.id,
      };
    });
    localStorage.setItem("rectangles", JSON.stringify(storageRects));
  };

  useEffect(() => {
    if (isSavingErrors) {
      handleSave();
      message.success("Save errors successfully");
      dispatch(endSavingErrors());
    }
  }, [isSavingErrors]);

  return (
    <div className="w-full h-full relative">
      <div className="bg-slate-300 w-full h-full" ref={containerRef}>
        <Stage
          width={containerSize.width}
          height={containerSize.height}
          ref={stageRef}
          onDblClick={handleDoubleClick}
          onClick={handleStageClick}
          x={position.x}
          y={position.y}
          scaleX={scale}
          scaleY={scale}
          onWheel={handleWheel}
          draggable
          onDragEnd={(e) => {
            // Vì cả hai thằng Stage và Rect đều có thể drag được và có onDragEnd event
            // nên khi drag thì phải kiểm tra xem có phải đang drag Rect hay không
            if (!isDraggingRect) {
              setPosition({ x: e.target.x(), y: e.target.y() });
            }
          }}
        >
          <Layer>
            <KonvaImage
              image={image}
              width={imageScale * imageSize.width}
              height={imageScale * imageSize.height}
            />
            {rectangles.map((rect: any, index: number) => (
              <Rect
                onClick={() => {
                  setSelectedShape(rect.id);
                }}
                key={rect.id}
                {...rect}
                draggable
                onDragStart={() => setIsDraggingRect(true)}
                onDragEnd={() => {
                  setIsDraggingRect(false);
                }}
                onDragMove={(e: Konva.KonvaEventObject<DragEvent>) => {
                  handleDragMove(e);
                }}
                onTransformEnd={(e: Konva.KonvaEventObject<Event>) =>
                  handleTransformEnd(e, index)
                }
              />
            ))}
            {stageRef.current && selectedShape && (
              <Transformer
                nodes={[stageRef.current?.findOne(`#${selectedShape}`)]}
                rotateEnabled={false}
                keepRatio={false}
                flipEnabled={false}
                ignoreStroke
                boundBoxFunc={(oldBox, newBox) => {
                  const minWidth = 40;
                  const minHeight = 40;

                  if (newBox.width < minWidth) {
                    newBox.width = minWidth;
                  }
                  if (newBox.height < minHeight) {
                    newBox.height = minHeight;
                  }
                  return newBox;
                }}
              />
            )}
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
