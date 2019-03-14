import React, { Component } from 'react';
import TextBox from './TextBox';
import Button from '../../UI/Button/Button';

class SearchBar extends Component {
    render() {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                    <div>
                        <TextBox changed={this.props.changed} id={this.props.id}/>
                    </div>
                    <div style={{ paddingTop: "15px" }}>
                        <Button btnText="search" type="submit" fontSize="10px" />
                    </div>
            </div>
        )
    }
}

export default SearchBar;