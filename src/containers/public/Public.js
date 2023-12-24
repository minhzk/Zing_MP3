import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header, Loading } from "../../components";
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const {isLoading} = useSelector(state => state.app)
  return (
    <div className="relative flex h-screen w-full flex-col bg-main-300">
      <div className="flex h-full w-full flex-auto">
        <div className="h-screen w-[240px] flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto relative flex flex-col border border-red-500">
          {isLoading && <div className='flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 z-10 bg-main-200'>
            <Loading/>
          </div>}
          <div className="flex h-[70px] flex-none items-center bg-[rgba(206,217,217,0.8)]">
            <Header />
          </div>
          <div className="flex-auto w-full z-0">
            <Scrollbars autoHide style={{ width: '100%', height: "90%" }}>
              <div className="px-[59px]">
                <Outlet />
              </div>
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div className="fixed right-0 top-0 bottom-0 w-[329px] flex-none animate-slide-left border border-pink-500 z-[2] bg-red-300">
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[90px] z-50">
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default Public;
