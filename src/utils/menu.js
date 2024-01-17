import icons from "./icons";

const { MdOutlineLibraryMusic, MdOutlineFeed, RiPieChartLine, TbChartArcs, PiMusicNotesPlus, PiCirclesFour, FaRegStar } =
  icons;
export const mainSidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icon: <MdOutlineLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icon: <TbChartArcs size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <RiPieChartLine size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icon: <MdOutlineFeed size={24} />,
  },
];

export const subSidebarMenu = [
    {
      path: "moi-phat-hanh",
      text: "BXH Nhạc Mới",
      icon: <PiMusicNotesPlus size={24} />,
    },
    {
      path: "hub",
      text: "Chủ Đề & Thể Loại",
      icon: <PiCirclesFour size={24} />,
    },
    {
      path: "top100",
      text: "Top 100",
      icon: <FaRegStar size={24} />,
    },
  ];

export const searchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },
  {
    path: "bai-hat",
    text: "BÀI HÁT",
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
  },
  {
    path: "artist",
    text: "NGHỆ SĨ/OA",
  },
];
