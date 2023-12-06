import icons from "./icons"

const { MdLibraryMusic } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <MdLibraryMusic size={24}/>
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icon: <MdLibraryMusic size={24}/>
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <MdLibraryMusic size={24}/>
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <MdLibraryMusic size={24}/>
    },
]