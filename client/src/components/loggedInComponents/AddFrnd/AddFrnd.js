import React, { Component } from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import SearchBar from '../../loggedInComponents/SearchBar/SearchBar';
import * as actions from '../../../actions';
import classes from './AddFriend.css';
// import Button from '../../../components/UI/Button/Button';
import FuzzySearchCard from '../../UI/FuzzySearchcard/FuzzySearchCard';
import Users from '../Users/Users';
// import axios from 'axios';


class AddFrnd extends Component {

    async componentDidMount() {
        await this.props.fetchUsers();
        await this.props.getMyFriends(this.props.auth.myFriends);
    }

    changed = () => {
        const val = document.getElementById("frnds_searchbar").value;
        this.props.fetchUsers(val)
            .then(() => {
                console.log("Search result ka users fetched");
                console.log(this.props.users);
            });
    }

    searchResults = () => {

        const val = document.getElementById("frnds_searchbar").value;
        let frndStatusBool = 0;
        let frndStatus;
        let frndReqSent = 0;
        const myFriendsArr = this.props.auth.myFriends;
        const searchResults = this.props.users.map(user => {
            frndStatusBool = 0;
            frndStatus = "Friends";

            myFriendsArr.map(myFriend => {
                if (user._id === myFriend) {
                    frndStatusBool = 1;
                }
            });

            if (user._id === this.props.auth._id) {
                frndStatusBool = 1;
                frndStatus = "Me";
            }

            if (this.props.auth.friendReqSent.length > 0) {
                let i;
                for (i = 0; i < this.props.auth.friendReqSent.length; i++) {              //loop to check if current user already sent friend Request to this user
                    if (this.props.auth.friendReqSent[i] === user._id) {
                        frndReqSent = 1;
                        frndStatusBool = 1;
                        frndStatus = "Request sent";
                    }
                }
            }

            return (
                <div key={user._id} style={{ paddingTop: "10px" }}>
                    <center>
                        <FuzzySearchCard
                            startName={val}
                            id={user._id}
                            name={user.displayName}
                            email={user.email}
                            frndStatusBool={frndStatusBool}
                            frndStatus={frndStatus}
                            imgSrc={'/images/' + user.image} />
                    </center>
                </div>
            );
        });
        return searchResults;
    }


    render() {
        return (
            <div>
                <Header />
                <br />
                Add Friend Popup box/page
                <SearchBar
                    id="frnds_searchbar"
                    changed={this.changed} />
                {this.props.users !== null ? this.searchResults() : <div>Start searching</div>}

                {this.props.auth !== null ? (<div id="chats" className={classes.Chats}>
                    <Users />
                </div>) : null}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        auth: state.auth,
        myFriends: state.myFriends
    };
};

export default connect(mapStateToProps, actions)(AddFrnd);
