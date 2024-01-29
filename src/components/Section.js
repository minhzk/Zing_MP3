import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icons from '../utils/icons'

const { IoMdHeartEmpty, IoMdHeart, IoIosPlay, BsThreeDots, IoIosArrowForward } = icons

const Section = ({ data, artists, items, number, wrap, showAll, releaseYear, minGap }) => {
  const navigate = useNavigate();
  const { currentWidth } = useSelector(state => state.app)
  return (
    <div className={`${!showAll && 'mt-12'} mb-[42px]`}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-black-100">{data?.title}</h3>
        {!showAll && <div className="text-text-secondary flex gap-1 cursor-pointer">
          <span className="text-[13px] font-medium ">
            TẤT CẢ
          </span>
          <span className="flex justify-center items-center pt-[1px]"><IoIosArrowForward size={20}/></span>
        </div>}
      </div>
      <div className={`flex flex-auto items-start gap-[28px] ${wrap && 'flex-wrap'}`}>
        {data &&
          items?.length > 0 &&
          items?.map((item, index) => (
            <div
              key={item.encodeId}
              onClick={() => {
                navigate(item?.link.split(".")[0], { state: { playAlbum: false}});
              }}
              className={`flex cursor-pointer flex-col gap-2 w-[18%] 
              ${index <= (number || (currentWidth < 1000 ? 2 : currentWidth < 1324 ? 3 : 4)) ? "block" : "hidden"}`}
            >
              <div className="relative w-full overflow-hidden rounded-[5px] group">
                <div className={`absolute inset-0 z-20 group-hover:bg-overlay-50 rounded-[5px] text-white flex items-center justify-center ${minGap ? 'gap-[14px]' : 'gap-7'}`}>
                  <span className="hidden group-hover:flex"><IoMdHeartEmpty size={22}/></span>
                  <span 
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(item?.link.split(".")[0], { state: { playAlbum: true}})
                    }} 
                    className="pl-[6px] pr-[2px] pt-1 pb-1 hidden group-hover:flex border border-white rounded-full"
                  >
                    <IoIosPlay size={34}/>
                  </span>
                  <span className="hidden group-hover:flex"><BsThreeDots size={22}/></span>
                </div>
                <img
                  src={item.thumbnail}
                  alt="thumbnail"
                  className="w-full object-contain rounded-[5px] scale-100 group-hover:scale-110 transition-transform ease-in-out duration-700"
                />
              </div>
              <div>
                <span
                  className={`font-bold text-black-100 text-sm ${
                    data?.options?.hideTitle ? "hidden" : "block"
                  }`}
                >
                  {item?.title.length > 23
                    ? `${item?.title.slice(0, 23)}... `
                    : item?.title}
                </span>
                { artists 
                ? (
                  <span className="text-sm font-normal text-text-secondary">{item?.artistsNames}</span>
                ) 
                :  releaseYear 
                ? 
                (
                  <span className="text-sm font-normal text-text-secondary">{item?.releaseDateText}</span>
                ) 
                :
                 (
                  <span className="text-sm font-normal text-text-secondary">
                    {item?.sortDescription?.length > 54
                      ? `${item?.sortDescription.slice(0, 54)}... `
                      : item?.sortDescription}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(Section);
