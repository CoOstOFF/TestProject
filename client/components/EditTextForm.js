import React from 'react';
import {Button, ControlLabel, FormGroup, FormControl} from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {SQL_QUERY, GRAPHQL_QUERY} from '../constants';
import getData from '../actions/app-actions'

class MyEditTextForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            queryType: SQL_QUERY
        };
    }

    onChangeInputHandler = (e) => {
        this.setState({inputValue: e.target.value});

    };

    onChangeSelectHandler = (e) => {
        this.setState({queryType: e.target.value});
    };

    onClickSubmitHandler = (e) => {
        e.preventDefault();
        const getTableData = this.props.appActions;
        getTableData(this.state.inputValue, this.state.queryType);
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
                        placeholder="Input your query here..."
                        value={this.state.inputValue}
                        onChange={this.onChangeInputHandler}/>
                    <ControlLabel>Select query type:</ControlLabel>
                    <FormControl componentClass="select" onChange={this.onChangeSelectHandler}>
                        <option value={SQL_QUERY}>SQL query</option>
                        <option value={GRAPHQL_QUERY}>GraphQL query</option>
                    </FormControl>
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