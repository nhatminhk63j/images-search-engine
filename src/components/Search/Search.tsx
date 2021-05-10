import React from "react";
import './Search.scss';
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

interface IProps {
    onSearch: (value: string) => void;
    handleClickSearchCustomer: () => void;
}

const Search: React.FC<IProps> = ({onSearch, handleClickSearchCustomer}) => {
    return (
        <Paper className={"searchContainer"}>
            <InputBase
                className={"input"}
                placeholder={"Search to find your images"}
                inputProps={{'aria-label': 'Search by file name or customer'}}
                onChange={event => onSearch(event.target.value)}
                // value={getSearchInputDefaultValue()}
            />
            <IconButton type="submit" className={"searchButton"} aria-label="search" onClick={handleClickSearchCustomer}
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}

export default Search;