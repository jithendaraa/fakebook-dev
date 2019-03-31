import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// import { TiZoom } from "../../../../node_modules/react-icons/ti";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: 500,
    },
    dense: {
        marginTop: 0,
    },

});

// const lol = (<div><TiZoom></TiZoom>Search for a user</div>);

class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    out = () => {console.log("changed")};

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    onChange={this.props.changed}
                    id={this.props.id}
                    style={{color: "white"}}
                    // label={lol}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                    placeholder="Type here"
                />
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);      
