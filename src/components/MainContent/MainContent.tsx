import React, {useState} from "react";
import './MainContent.scss';

import {css, StyleSheet} from 'aphrodite/no-important';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

// @ts-ignore
import ImgsViewer from 'react-images-viewer';

import {makeStyles} from '@material-ui/core/styles';

interface IProps {
    imgs: any[];
    handleChangeResultsCount: (value: number) => void;
    resultsCount: number;
}

const MainContent: React.FC<IProps> = ({imgs, handleChangeResultsCount, resultsCount}) => {
    const [currImg, setCurrImg] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickPrev = () => {
        setCurrImg(prevState => prevState - 1);
    }

    const onClickNext = () => {
        setCurrImg(prevState => prevState + 1);
    }

    const onClose = () => {
        setCurrImg(0);
        setIsOpen(false);
    }

    const gotoImg = (index: number) => {
        setCurrImg(index);
    }

    const handleClickImg = () => {
        if (currImg === imgs.length - 1) return;
        onClickNext()
    }

    const openImgsViewer = (index: number, event: any) => {
        event.preventDefault();
        setCurrImg(index);
        setIsOpen(true);
    }

    const classeMaterials = useStyles();

    const renderGallery = () => {
        if (!imgs) return;
        const gallery = imgs.filter(i => i.useForDemo).map((obj, i) => {

            return (
                <a
                    href={obj.src}
                    // @ts-ignore
                    className={css(classes.thumbnail, classes[obj.orientation])}
                    key={i}
                    onClick={(e) => openImgsViewer(i, e)}
                >
                    <img src={obj.thumbnail} className={css(classes.source)}/>
                </a>
            )
        })
        return (
            <div className={css(classes.gallery)}>
                {gallery}
            </div>
        )
    };


    return (
        <div className={'mainContentContainer'}>
            <FormControl className={classeMaterials.formControl} style={{textAlign: 'left'}}>
                <div
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <span style={{margin: 20}}>The number of results displayed?</span>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={resultsCount}
                        onChange={(event) => handleChangeResultsCount(parseInt(event.target.value as string))}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </div>
            </FormControl>
            {renderGallery()}
            <ImgsViewer
                imgs={imgs}
                currImg={currImg}
                isOpen={isOpen}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
                onClickThumbnail={gotoImg}
                onClickImg={handleClickImg}
                onClose={onClose}
                backdropCloseable={true}
                showThumbnails={[]}
                theme={theme}
            />
        </div>
    )
}

const useStyles = makeStyles((theme: any) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const theme = {
    // container
    container: {
        background: 'rgba(255, 255, 255, .9)'
    },

    // arrows
    arrow: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        fill: '#222',
        opacity: .6,
        transition: 'opacity 200ms',

        ':hover': {
            opacity: 1,
        }
    },
    arrow__size__medium: {
        borderRadius: 40,
        height: 40,
        marginTop: -20,

        '@media (min-width: 768px)': {
            height: 70,
            padding: 15,
        }
    },
    arrow__direction__left: {marginLeft: 10},
    arrow__direction__right: {marginRight: 10},
    close: {
        fill: '#d40000',
        opacity: .6,
        transition: 'all 200ms',
        ':hover': {
            opacity: 1
        }
    },

    // footer
    footer: {
        color: '#000'
    },
    footerCount: {
        color: 'rgba(0, 0, 0, .6)'
    },

    // thumbnails
    thumbnail: {},
    thumbnail__active: {
        boxShadow: '0 0 0 2px #00d8ff'
    }
};

const gutter = {
    small: 2,
    large: 4,
}
const classes = StyleSheet.create({
    gallery: {
        marginRight: -gutter.small,
        overflow: 'hidden',
        '@media (min-width: 500px)': {
            marginRight: -gutter.large,
        }
    },

    // anchor
    thumbnail: {
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        lineHeight: 0,
        paddingRight: gutter.small,
        paddingBottom: gutter.small,
        overflow: 'hidden',

        '@media (min-width: 500px)': {
            paddingRight: gutter.large,
            paddingBottom: gutter.large,
        }
    },

    // orientation
    landscape: {
        width: '33%',
    },
    square: {
        paddingBottom: gutter.large,
        width: '40%',

        '@media (min-width: 500px)': {
            paddingBottom: gutter.large,
        }
    },

    // actual <img />
    source: {
        border: 0,
        display: 'block',
        height: 'auto',
        maxWidth: '70%',
        width: 'auto'
    },
})


export default MainContent