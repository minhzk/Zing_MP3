import icons from "./icons"

const { MdOutlineLibraryMusic , MdOutlineFeed, RiPieChartLine, TbChartArcs } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <MdOutlineLibraryMusic  size={24}/>
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icon: <TbChartArcs size={24}/>
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <RiPieChartLine size={24}/>
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <MdOutlineFeed size={24}/>
    },
]

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        path: 'bai-hat',
        text: 'BÀI HÁT',
    },
    {
        path: 'playlist',
        text: 'PLAYLIST/ALBUM',
    },
    {
        path: 'artist',
        text: 'NGHỆ SĨ/OA',
    },
]