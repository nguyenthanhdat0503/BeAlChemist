/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ErrorImage from "./ErrorImage/ErrorImage";
import ErrorList from "./ErrorList/ErrorList";
import ErrorLabel from "./ErrorLabel/ErrorLabel";
export default function Error() {
  const screenSize = useSelector(
    (state: RootState) => state.flowControls.screenSize
  );
  const containerHeight = useMemo(() => {
    const HEADER_HEIGHT = 50;
    if (screenSize.height === 0 || screenSize.width === 0) return 0;
    return screenSize.height - HEADER_HEIGHT;
  }, [screenSize]);

  if (screenSize.height === 0 || screenSize.width === 0) return null;

  return (
    <div className="grid grid-cols-12 w-full h-full">
      <div className="h-full col-span-7 relative">
        <ErrorLabel />
      </div>
      <div className="col-span-5 h-full flex flex-col shadow-xl">
        <div className="h-[400px]">
          <ErrorImage />
        </div>
        <div className="text-xl font-semibold text-black shadow-md h-[40px] z-10 flex items-center justify-center">
          Errors
        </div>
        <div
          className="w-full overflow-y-auto py-4 px-3"
          style={{
            height: containerHeight - 400 - 40,
          }}
        >
          <ErrorList />
        </div>
      </div>
    </div>
  );
}
