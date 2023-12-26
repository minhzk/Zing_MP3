import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { SongLoading } from "./";

const {
  IoMdHeart,
  IoMdHeartEmpty,
  BsThreeDots,
  RiSkipBackFill,
  RiSkipForwardFill,
  PiRepeatLight,
  IoIosPlay,
  PiShuffleLight,
  IoIosPause,
  PiRepeatOnceLight,
  LuListMusic,
  LuVolume1,
  LuVolume2,
  LuVolumeX
} = icons;

var intervalId;
const Player = ({ setIsShowRightSidebar }) => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curSecond, setCurSecond] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [volume, setVolume] = useState(100)
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();

  // useEffect kh sd được bất đồng bộ
  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      // console.log(res);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
        setIsLoadedSource(true);
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurSecond(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSecond(Math.round(audio.currentTime));
      }, 100);
    } else {
      toast.warn();
    }
  }, [audio]);

  useEffect(() => {
    if (!isPlaying) {
      intervalId && clearInterval(intervalId);
    }
  });

  useEffect(() => {
    const handleEnded = () => {
      console.log("end");
      if (isShuffle || (repeatMode === 1 && isShuffle)) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleNextSong() : handleRepeatOnce();
      } else {
        audio?.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume])

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio?.pause();
      dispatch(actions.play(false));
    } else {
      audio?.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) / trackRect.width) * 10000) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo?.duration) / 100;
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  const handleRepeatOnce = () => {
    audio.play();
  };

  return (
    <div className="flex h-full bg-main-400 px-5 py-2">
      <div className="flex w-[30%] flex-auto items-center gap-[10px]">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="h-16 w-16 rounded-md object-cover"
        />
        <div className="flex flex-col">
          <span className="text-[15px] font-medium text-black-100">
            {songInfo?.title}
          </span>
          <span className="text-[13px] font-normal text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <IoMdHeartEmpty size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="flex w-[40%] flex-auto flex-col items-center justify-center gap-1">
        <div className="flex items-center justify-center gap-8 text-black-100">
          <span
            onClick={() => setIsShuffle((prev) => !prev)}
            className={`cursor-pointer ${
              isShuffle ? "text-text-hover" : "text-black-100"
            }`}
            title="Bật phát ngẫu nhiên"
          >
            <PiShuffleLight size={20} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <RiSkipBackFill size={21} />
          </span>
          <span
            className="flex cursor-pointer items-center justify-normal rounded-full border border-gray-700 p-2 hover:border-text-hover hover:text-text-hover"
            onClick={handleTogglePlayMusic}
          >
            {!isLoadedSource ? (
              <SongLoading />
            ) : isPlaying ? (
              <IoIosPause size={22} />
            ) : (
              <IoIosPlay size={22} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <RiSkipForwardFill size={21} />
          </span>
          <span
            className={`cursor-pointer ${repeatMode && "text-text-hover"}`}
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 2 ? (
              <PiRepeatOnceLight title="Bật phát lại tất cả" size={20} />
            ) : (
              <PiRepeatLight title="Bật phát lại một bài" size={20} />
            )}
          </span>
        </div>
        <div className="flex w-full items-center justify-center gap-[10px] text-xs font-medium text-black-100">
          <span className="opacity-50">
            {moment.utc(curSecond * 1000).format("mm:ss")}
          </span>
          <div
            className="relative flex h-1 w-3/4 cursor-pointer items-center justify-center rounded-[4px] bg-[rgba(0,0,0,0.1)] hover:h-[6px]"
            onClick={handleClickProgressbar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className="absolute bottom-0 left-0 top-0 rounded-[4px] bg-main-500"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="flex w-[30%] flex-auto items-center justify-end gap-4">
        <div className="flex gap-2 items-center">
            <span className="cursor-pointer" onClick={() => setVolume(prev => +prev === 0 ? 40 : 0)}>
                {+volume >= 50 ? <LuVolume2 size={20}/> : +volume === 0 ? <LuVolumeX size={20}/> : <LuVolume1 size={20}/>}
            </span>
            <input
            type="range"
            step={1}
            min={0}
            max={100}
            className="cursor-pointer"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            />
        </div>
        <span
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
          className="cursor-pointer rounded-[4px] bg-main-500 p-1 text-white opacity-80 hover:opacity-100"
        >
          <LuListMusic size={21} />
        </span>
      </div>
    </div>
  );
};

export default Player;
