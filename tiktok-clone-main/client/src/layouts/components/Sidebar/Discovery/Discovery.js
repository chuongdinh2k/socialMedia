import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { configBaseURL } from '~/common/common';

// import { useState } from 'react';

import styles from './Discovery.module.scss';
import DiscoveryItem from './DiscoveryItem';
import { useRef } from 'react';
import SekeletonLoadingForTagAndMusic from '../../SekeletonLoading/SekeletonLoadingForTagAndMusic/SekeletonLoadingForTagAndMusic';
import { getCookie, setCookie } from '~/utils/cookies';

const cx = classNames.bind(styles);

function Discovery({ label }) {
    const [time, setTime] = useState(false);
    const [trendy, setTrendy] = useState([]);
    const [music, setMusic] = useState([]);
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
    console.log('trendy',getCookie('trendy') ?  JSON.parse(getCookie('trendy')) : []);
    let arrTag = useRef();
    useEffect(() => {}, []);
    useEffect(() => {
        try {
            //get list trendy
            axios
                .get(`${configBaseURL}/api/trendy/get-list-trendy`)
                .then((resultTrendy) => {
                    setTrendy(resultTrendy.data);
                    if (resultTrendy) {
                        setTimeout(() => {
                            setTime(true);
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            //get list âm nhạc
            axios
                .get(`${configBaseURL}/api/music/get-list-music`)
                .then((resultMusic) => {
                    setMusic(resultMusic.data);
                    if (resultMusic) {
                        setTimeout(() => {
                            setTime(true);
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    arrTag = trendy.slice(0, 5).concat(music.slice(0, 5));

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('discovery-list')}>
                {time ? (
                    <>
                        {getCookie('trendy')
                            ? JSON.parse(getCookie('trendy')).map((data, index) => {
                                  return (
                                      <DiscoveryItem
                                          onClick={() => handleSaveTrendyCookie(data)}
                                          key={index}
                                          name={data.name}
                                          idMusic={data._id}
                                          check={data.music}
                                      />
                                  );
                              })
                            : arrTag.map((data, index) => {
                                  return (
                                      <DiscoveryItem
                                          onClick={() => handleSaveTrendyCookie(data)}
                                          key={index}
                                          name={data.name}
                                          idMusic={data._id}
                                          check={data.music}
                                      />
                                  );
                              })}
                        {/* {arrTag.map((data, index) => {
                            return <DiscoveryItem onClick={()=>handleSaveTrendyCookie(data)} key={index} name={data.name} idMusic={data._id} check={data.music}/>;
                        })} */}
                    </>
                ) : (
                    <SekeletonLoadingForTagAndMusic />
                )}
            </div>
        </div>
    );
}

Discovery.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Discovery;
