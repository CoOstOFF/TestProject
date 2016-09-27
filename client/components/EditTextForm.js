import React from 'react';
import {Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import getData from '../actions/app-actions'

class MyEditTextForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
    }

    onChangeHandler = (e) => {
        this.setState({inputValue: e.target.value});
    };

    onClickSubmitHandler = (e) => {
        e.preventDefault();
        const getTableData = this.props.appActions;
        getTableData(this.state.inputValue);
    };

    onClickClearFormHandler = () => {
        this.setState({inputValue: ''});
    };

    render() {
        return (
            <form style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10
            }}>
                <FormGroup>
                    <FormControl
                        componentClass="textarea"
                        rows="4"
                        placeholder="Input your SQL query here..."
                        value={this.state.inputValue}
                        onChange={this.onChangeHandler}/>
                </FormGroup>
                <Button
                    id="submit_button"
                    bsStyle="primary"
                    type="button"
                    style={{
                        marginBottom: '10px',
                        fontFamily: 'open-sans'
                    }}
                    onClick={this.onClickSubmitHandler}
                    disabled={!this.state.inputValue}>
                    Submit
                </Button>
                <Button
                    id="clear_form_button"
                    bsStyle="danger"
                    type="reset"
                    style={{
                        marginLeft: '10px',
                        marginBottom: '10px',
                        fontFamily: 'open-sans'
                    }}
                    onClick={this.onClickClearFormHandler}>
                    Clear form
                </Button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(getData, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(MyEditTextForm)