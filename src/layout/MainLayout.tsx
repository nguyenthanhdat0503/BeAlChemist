import React, { useEffect, useRef } from "react";
import Header from "../components/Header/Header";
import { useDispatch } from "react-redux";
import { setScreenSize } from "../features/flow-controls/flow-controls.slice";

interface Props {
  children: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  const screenRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      screenRef.current &&
      screenRef.current.clientHeight > 0 &&
      screenRef.current.clientWidth > 0
    ) {
      dispatch(
        setScreenSize({
          width: screenRef.current.clientWidth,
          height: screenRef.current.clientHeight,
        })
      );
    }
  }, [dispatch, screenRef]);
  return (
    <div className="w-screen h-screen" ref={screenRef}>
      <Header />
      <div className="h-screen-minus-50">{children}</div>
    </div>
  );
}
