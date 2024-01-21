import React from "react";
import logo from "../assets/img/logo.svg";
import { mainSidebarMenu, subSidebarMenu } from "../utils/menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import path from "../utils/path";
import {Scrollbars} from 'react-custom-scrollbars-2'

const notActiveStyle =
  "py-[12px] px-[21px] font-semibold text-[15px] text-[#32323D] flex gap-3 items-center";
const activeStyle =
  "py-[12px] px-[21px] font-semibold text-[15px] text-[#0f7070] flex gap-3 items-center";

const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col 1132:bg-main-200 bg-main-700">
      <div
        onClick={() => navigate(path.HOME)}
        className="flex w-full cursor-pointer items-center justify-start 1132:px-[25px] 1132:py-[15px] h-[70px]"
      >
        <img src={logo} alt="logo" className="h-10 w-[120px] hidden 1132:block" />
        <img src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.109/static/media/icon_zing_mp3_60.f6b51045.svg" alt=""  className="1132:hidden m-auto w-[45px] h-[45px]"/>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col mb-4">
          {mainSidebarMenu.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.icon}
              <span className="hidden 1132:flex">{item.text}</span>
            </NavLink>
          ))}
        </div>

        <Scrollbars autoHide style={{ width: '100%', height: "20vh" }}>
          <div className="flex flex-col border-y-2 border-gray-300">
            <div className="mt-4"></div>
            {subSidebarMenu.map((item) => (
              <NavLink
                to={item.path}
                key={item.path}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                {item.icon}
                <span className="hidden 1132:flex">{item.text}</span>
              </NavLink>
            ))}
            <div className="mb-4"></div>
          </div>
        </Scrollbars>
        
      </div>
    </div>
  );
};

export default SidebarLeft;
