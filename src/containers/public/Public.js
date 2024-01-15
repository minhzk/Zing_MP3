import React, { useState, useRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header, Loading } from "../../components";
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector } from "react-redux";

const Public = () => {

  const {singer} = useParams()
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(false);
  const {isLoading} = useSelector(state => state.app)
  const scrollRef = useRef()
  const handleScrollTop = (e) => {
    if (e.target.scrollTop === 0) {
      scrollRef.current.style.cssText = 'background: transparent;'
    } else {
      scrollRef.current.style.cssText = `background: rgba(206,217,217,0.8); backdrop-filter: blur(50px); box-shadow: 0 3px 5px rgba(0,0,0,0.08); `;
    }
  }
  return (
    <div className="relative flex h-screen w-full flex-col bg-main-300">
      <div className="flex h-full w-full flex-auto">
        <div className="h-screen w-[240px] flex-none">
          <SidebarLeft />
        </div>
        <div className="flex-auto relative flex flex-col">
          {isLoading && <div className='flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 z-10 bg-main-200'>
            <Loading/>
          </div>}
          <div ref={scrollRef} className="h-[70px] fixed top-0 flex-none left-[240px] right-0 z-20 flex items-center">
            <Header />
          </div>
          <div className="flex-auto w-full z-0">
            <Scrollbars 
            onScroll={handleScrollTop} 
            autoHide style={{ width: '100%', height: "90%" }}>
              <div className="px-[59px]">
                <Outlet />
              </div>
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div className="fixed right-0 top-0 bottom-0 w-[329px] flex-none animate-slide-left z-50 bg-main-300 box-shadow-left">
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
