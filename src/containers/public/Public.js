import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  return (
    <div className="relative flex h-screen w-full flex-col bg-main-300">
      <div className="flex h-full w-full flex-auto">
        <div className="h-screen w-[240px] flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto border border-red-500">
          <div className="flex h-[70px] items-center">
            <Header />
          </div>
          <div className="px-[59px]">
            <Outlet />
          </div>
          <div className="h-[500px] w-full"></div>
        </div>
        {isShowRightSidebar && (
          <div className="hidden w-[329px] flex-none animate-slide-left border border-pink-500 1400:flex">
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[90px]">
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default Public;
