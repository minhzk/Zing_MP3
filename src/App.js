import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Public, Personal, Playlist, WeekRank, ZingChart, Search, SearchAll, SearchSongs, Singer, SearchPlaylists } from './containers/public';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import { useEffect, useState } from 'react';
import * as actions from './store/actions';
import { useDispatch } from 'react-redux';
import { apiGetChartHome } from './apis/music'

function App() {
    const dispatch = useDispatch();
    const [weekChart, setWeekChart] = useState(null)

    // lấy width lần đầu
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth)

    // hàm setWidth khi resize
    const setWidth = (e) => {
        setCurrentWidth(e.target.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', setWidth)
        return () => {
            window.removeEventListener('resize', setWidth)
        }
    })

    // truyền width cho các page
    useEffect(() => {
        dispatch(actions.setCurrentWidth(currentWidth))
    }, [currentWidth])

    useEffect(() => {
        dispatch(actions.getHome());
        const fetchChartData = async() => {
            const res = await apiGetChartHome()
            if (res?.data?.err === 0) {
                setWeekChart(res?.data?.data?.weekChart)
            }
        }
        fetchChartData()
    }, []);

    return (
        <>
            <div className="">
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />
                        <Route
                            path={path.PLAYLIST__TITLE__PID}
                            element={<Playlist />}
                        />
                        <Route
                            path={path.ALBUM__TITLE__PID}
                            element={<Playlist />}
                        />
                        <Route
                            path={path.WEEKRANK__TITLE__PID}
                            element={<WeekRank weekChart={weekChart && Object.values(weekChart)} />}
                        />
                        <Route
                            path={path.ZING_CHART}
                            element={<ZingChart />}
                        />
                        <Route
                            path={path.HOME__SINGER}
                            element={<Singer />}
                        />
                        <Route
                            path={path.HOME_ARTIST__SINGER}
                            element={<Singer />}
                        />
                        <Route
                            path={path.SEARCH}
                            element={<Search />}
                        >
                            <Route
                                path={path.ALL}
                                element={<SearchAll />}
                            />
                            <Route
                                path={path.SONG}
                                element={<SearchSongs />}
                            />
                            <Route
                                path={path.PLAYLIST_SEARCH}
                                element={<SearchPlaylists />}
                            />
                        </Route>

                        <Route path={path.STAR} element={<Home />} />
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
