//Thư viện externor trước(thư viện bên ngoài)
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { configBaseURL, configHeader } from '~/common/common';
import SekeletonLoadingForHome from '~/layouts/components/SekeletonLoading/SeleketonLoadingForHome/SeleketonLoadingForHome';
import { getCookie, setCookie } from '~/utils/cookies';

//Thư viện internor sau(thư viện bên trong dự án)
import styles from './Home.module.scss';
import RecommendItem from './RecommendItem';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const [check, setCheck] = useState([]);
    const [followingAccounts, setFollowingAccount] = useState([]);
    const [show, setShow] = useState(false);
    const toastNotice = useRef();

    useEffect(() => {
        document.title = 'Xem các video thịnh hành dành cho bạn | TikTok';
    }, []);

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            try {
                axios
                    .get(`${configBaseURL}/api/users/get-liked-video`, configHeader)
                    .then((result) => {
                        if(result) {
                            setCheck(result.data)
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    },[]);

    useEffect(() => {
        setShow(false);
        if (localStorage.getItem('accessToken')) {
            try {
                axios
                    .get(`${configBaseURL}/api/video/get-list-video-login`, configHeader)
                    .then((result) => {
                        setData(result.data);
                        if (result) {
                            setTimeout(() => {
                                setShow(true);
                            }, 1000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                axios
                    .get(`${configBaseURL}/api/video/get-list-video`)
                    .then((result) => {
                        setData(result.data);
                        if (result) {
                            setTimeout(() => {
                                setShow(true);
                            }, 1500);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    //lấy người người dùng follow của người dùng đang đăng nhập
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            try {
                //
                axios
                    .get(`${configBaseURL}/api/users/get-follow-user`, configHeader)
                    .then((result) => {
                        setFollowingAccount(result.data[0].fllowing);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const handleSaveTrendyCookie = (data) => {
        const trendyCookies = getCookie('trendy') ?  JSON.parse(getCookie('trendy')) : [];
        // check if it does not exist in cookies
        if (!trendyCookies?.length) {
            setCookie('trendy', JSON.stringify([data]));
        } else {
            if (trendyCookies.findIndex((item) => data.id === item.id) < 0) {
                setCookie('trendy', JSON.stringify([...trendyCookies, data]));
            }
        }
    };
    const renderData = (data) => {
        toastNotice.current.style.animation = `${cx('showToast')} ease .5s forwards, ${cx(
            'hideToast',
        )} ease 1s 4s forwards`;
        setTimeout(() => {
            toastNotice.current.style.animation = 'none';
        }, 5000);
        handleSaveTrendyCookie(data?.trendy);
        try {
            axios
                .get(`${configBaseURL}/api/video/get-list-video-login`, configHeader)
                .then((result) => {
                    setData(result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={cx('main-container')}>
            <div className={cx('toast')} ref={toastNotice}>
                <div className={cx('toast-notice')}>
                    <div className={cx('toast-notice-content')}>
                        <div>Coppy URL thành công!</div>
                    </div>
                </div>
            </div>
            <div>
                {show ? (
                    <>
                        {data.reverse().map((item, index) => {
                            return (
                                <RecommendItem data={item} key={index} index={index} followUser={followingAccounts} check={check} onClick={()=>renderData(item)}/>
                            );
                        })}
                    </>
                ) : (
                    <SekeletonLoadingForHome />
                )}
            </div>
        </div>
    );
}

export default Home;