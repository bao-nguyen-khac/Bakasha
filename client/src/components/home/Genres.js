import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Figure } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lottie from 'lottie-react';

import actionType from 'src/assets/animations/actionType.json';
import adventureType from 'src/assets/animations/adventureType.json';
import fantasyType from 'src/assets/animations/fantasyType.json';
import historyType from 'src/assets/animations/historyType.json';
import mysteryType from 'src/assets/animations/mysteryType.json';
import romanceType from 'src/assets/animations/romanceType.json';
import sciFicType from 'src/assets/animations/sciFicType.json';

const settings = {
    className: "center",
    centerMode: false,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 500,
    dots: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Genres = () => {
    return (
        <Slider {...settings}>
            <Figure>
                <Lottie
                    options={{ animationData: actionType }}
                    height={100}
                />
                <h6 className='text-center'>
                    Manga - Comic
                </h6>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: adventureType }}
                    height={100}
                />
                <h6 className='text-center'>
                    Khoa học kỹ thuật
                </h6>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: fantasyType }}
                    height={100}
                />
                <h6 className='text-center'>
                    Tiểu thuyết
                </h6>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: historyType }}
                    height={100}
                />
                <h6 className='text-center'>
                    Trinh Thám
                </h6>
            </Figure>
            <Figure>
                <Lottie
                    options={{ animationData: mysteryType }}
                    height={100}
                />
                <h6 className='text-center'>
                    Tâm lý
                </h6>
            </Figure>
        </Slider>
    );
}

export default Genres;
