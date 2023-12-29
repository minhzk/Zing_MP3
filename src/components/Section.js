import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import icons from '../utils/icons'

const { IoMdHeartEmpty, IoMdHeart, IoIosPlay, BsThreeDots } = icons

const Section = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-12">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-black-100">{data?.title}</h3>
        <span className="text-[13px] font-medium text-text-secondary">
          TẤT CẢ
        </span>
      </div>
      <div className="flex flex-auto items-start justify-between gap-[28px]">
        {data &&
          data?.items?.length > 0 &&
          data.items.map((item, index) => (
            <div
              key={item.encodeId}
              onClick={() => {
                navigate(item?.link.split(".")[0], { state: { playAlbum: false}});
              }}
              className={`flex w-1/5 cursor-pointer flex-col gap-2  ${
                index <= 4 ? "block" : "hidden"
              }`}
            >
              <div className="relative w-full overflow-hidden rounded-[5px] group">
                <div className="absolute inset-0 z-20 group-hover:bg-overlay-50 rounded-[5px] text-white flex items-center justify-center gap-7">
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
                  className={`font-bold text-black-100 ${
                    data?.options?.hideTitle ? "hidden" : "block"
                  }`}
                >
                  {item?.title.length > 24
                    ? `${item?.title.slice(0, 22)}... `
                    : item?.title}
                </span>
                {(data?.sectionId === "h100" || data?.sectionId === "hAlbum") ? (
                  <span className="text-sm font-normal text-text-secondary">{item?.artistsNames}</span>
                ) : (
                  <span className="text-sm font-normal text-text-secondary">
                    {item?.sortDescription.length > 60
                      ? `${item?.sortDescription.slice(0, 58)}... `
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
