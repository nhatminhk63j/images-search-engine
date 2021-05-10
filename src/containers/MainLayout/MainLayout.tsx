import React, {useEffect, useState} from "react";
import './MainLayout.scss';

import MainContent from "../../components/MainContent";
import {Typography} from "@material-ui/core";
import Search from "../../components/Search";
import Logo from './../../assets/logo_transparent.png';
import axios from "axios";

const MainLayout: React.FC = () => {

    const [images, setImages] = useState<any[]>(imagesDemo);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [resultsCount, setResultsCount] = useState<number>(10);
    const [isSearch, setIsSearch] = useState<boolean>(false);

    useEffect(() => {
        axios.post("http://55dd7322b6d5.ngrok.io/search", {
            search_query: searchQuery,
            results_count: resultsCount,
        }).then(
            res => {
                console.log(res.data)
                setIsSearch(false)
            }
        ).catch((err) => {
            console.log(err);
            setIsSearch(false);
        })
    }, [isSearch, resultsCount]);

    const onSearch = (value: string) => {
        setSearchQuery(value);
    }

    const handleClickSearchCustomer = () => {
        setIsSearch(true);
    }

    const handleChangeResultsCount = (value: number) => {
        setResultsCount(value);
    }

    return (
        <div className={'mainLayoutContainer'}>
            <div id={"topBar"} className={'topBar'}>
                <div className={'infoContainer'}>
                    <div className={'logoContainer'}>
                        <img src={Logo} alt={"Logo"}/>
                    </div>
                    <div className={'textContainer'}>
                        <Typography component="h1" variant="h4" style={{color: "white"}} noWrap className={'title'}>
                            Images Search Engine
                        </Typography>
                        <Typography variant="subtitle1" style={{color: "white"}} noWrap className={'title'}>
                            Find your images with your thoughts
                        </Typography>
                    </div>
                </div>
                <Search onSearch={onSearch} handleClickSearchCustomer={handleClickSearchCustomer}/>
            </div>
            <div className={'content'}>
                <MainContent
                    imgs={images}
                    resultsCount={resultsCount}
                    handleChangeResultsCount={handleChangeResultsCount}
                />
            </div>
        </div>
    )
}

function makeUnsplashThumbnail(src: string, orientation = 'landscape') {
    const dimensions = orientation === 'square' ?
        'w=300&h=300' :
        'w=240&h=159'
    // resize image here.... (khong kha thi cho lam)
    return src;
}

const THUMBNAIL_IMAGES = [
    {
        src: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12210622/Golden-Retriever-Puppy.jpg',
        caption: 'A dog brain',
        useForDemo: true,
        orientation: 'landscape'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR31qRWJ_V8m8C_Qkgf7C7hjMY9b8JBEOBQMncDmuqzSNp4MyAebJTl4l2ac7vdXhSg9KI&usqp=CAU',
        caption: 'A dog brain',
        useForDemo: true,
        orientation: 'landscape'
    },
    {
        src: 'https://bowwowinsurance.com.au/wp-content/uploads/2018/11/golden-retriever-700x700.jpg',
        caption: 'A dog brain',
        useForDemo: true,
        orientation: 'landscape'
    },
    {
        src: 'https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg',
        caption: 'A dog brain',
        useForDemo: true,
        orientation: 'landscape'
    },
    {
        src: 'https://www.aspca.org/sites/default/files/blog_make-dogs-day_101619_main.jpg',
        caption: 'A doggy',
        useForDemo: true,
        orientation: 'landscape'
    }
]

// Description for THUMBNAIL_IMAGES:
// src: url cua anh.
// caption: mo ta cua buc anh.
// useForDemo: co hien thi atren trang ket qua hay khong? (trong view list anh van co)
// orientation: dat anh theo chieu doc hay chieu ngang.

const imagesDemo = THUMBNAIL_IMAGES.map(({caption, src, orientation, useForDemo}) => ({
    src: src,
    thumbnail: makeUnsplashThumbnail(src, orientation),
    caption,
    orientation,
    useForDemo,
}));

export default MainLayout;