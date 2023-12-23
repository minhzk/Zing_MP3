import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
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
                navigate(item?.link.split(".")[0]);
              }}
              className={`flex w-1/5 cursor-pointer flex-col gap-2 ${
                index <= 4 ? "block" : "hidden"
              }`}
            >
              <img
                src={item.thumbnail}
                alt="thumbnail"
                className="h-auto w-full rounded-[5px]"
              />
              <span
                className={`font-semibold ${
                  data?.options?.hideTitle ? "hidden" : "block"
                }`}
              >
                {item?.title.length > 26
                  ? `${item?.title.slice(0, 24)}... `
                  : item?.title}
              </span>
              {data?.sectionId === "h100" ? (
                <span className="text-sm font-normal text-text-secondary">{item?.artistsNames}</span>
              ) : (
                <span className="text-sm font-normal text-text-secondary">
                  {item?.sortDescription.length > 60
                    ? `${item?.sortDescription.slice(0, 58)}... `
                    : item?.sortDescription}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(Section);
