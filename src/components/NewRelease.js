import React, { useState, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [activeMode, setActiveMode] = useState(0);
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (activeMode === 0) setSongs(newRelease?.items?.all)
    else if (activeMode === 1) setSongs(newRelease?.items?.vPop)
    else setSongs(newRelease?.items?.others)
  }, [activeMode, newRelease])
  return (
    <div className="mt-12 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-black-100">
          {newRelease?.title}
        </h3>
        <span className="text-[13px] font-medium text-text-secondary">
          TẤT CẢ
        </span>
      </div>
      <div className="flex items-center gap-5 text-xs font-normal ">
        <button
          type="button"
          onClick={() => setActiveMode(0)}
          className={`border-border-primary cursor-pointer rounded-l-full rounded-r-full border bg-main-300 px-6 py-1 opacity-80 hover:opacity-100 ${
            activeMode === 0 && 'bg-main-500 text-white'
          }`}
        >
          TẤT CẢ
        </button>
        <button
          type="button" 
          onClick={() => setActiveMode(1)}
          className={`border-border-primary cursor-pointer rounded-l-full rounded-r-full border bg-main-300 px-6 py-1 opacity-80 hover:opacity-100 ${
            activeMode === 1 && 'bg-main-500 text-white'
          }`}
        >
          VIỆT NAM
        </button>
        <button
          type="button"
          onClick={() => setActiveMode(2)}
          className={`border-border-primary cursor-pointer rounded-l-full rounded-r-full border bg-main-300 px-6 py-1 opacity-80 hover:opacity-100 ${
            activeMode === 2 && 'bg-main-500 text-white'
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex w-full flex-wrap">
        {songs?.filter((item, index) => index <= 11)?.map((item) => (
          <div key={item?.encodeId} className="w-[50%] laptop:w-[33%] ">
            <SongItem
              thumbnail={item?.thumbnail}
              title={item?.title}
              artistsNames={item?.artistsNames}
              releaseDate={item?.releaseDate}
              sid={item?.encodeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(NewRelease);
