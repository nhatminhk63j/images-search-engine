import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

import './TopBar.scss';
import Search from "../Search";

const TopBar: React.FC<TopBarProps> = () => {
    return (
        <div className={'topBarContainer'}>
            <AppBar>
                <Toolbar className={'appBar'} variant="dense">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={'title'}>
                        NLP Search
                    </Typography>
                </Toolbar>
                {/*<Search />*/}
            </AppBar>
        </div>
    )
}

type TopBarProps = {}

export default TopBar;