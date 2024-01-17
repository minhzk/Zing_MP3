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
    <div className="flex h-full flex-col bg-main-200">
      <div
        onClick={() => navigate(path.HOME)}
        className="flex w-full cursor-pointer items-center justify-start px-[25px] py-[15px]"
      >
        <img src={logo} alt="logo" className="h-10 w-[120px]" />
      </div>
      <div className="flex flex-col">
        <NavLink to={"/"} className="px-[25px] py-2 font-bold">
          Home
        </NavLink>
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
              <span>{item.text}</span>
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
                <span>{item.text}</span>
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
