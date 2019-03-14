import React, { Component } from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import SearchBar from '../../loggedInComponents/SearchBar/SearchBar';
import * as actions from '../../../actions';

class AddFrnd extends Component {

    changed = () => {
        const val = document.getElementById("frnds_searchbar").value;
        this.props.fetchUsers(val);
    };

    render() {
        return(
            <div>
                <Header />
                <br />
                Add Friend Popup box/page
                <SearchBar 
                    id="frnds_searchbar"
                    changed={this.changed}/>
              
            </div>
        )
    }
}

export default connect(null, actions)(AddFrnd);