import React from 'react';
import {
    Button,
    ControlLabel,
    FormGroup,
    FormControl,
    DropdownButton,
    MenuItem
}from 'react-bootstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Constants from '../constants';
import getData from '../actions/app-actions'

class MyEditTextForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            queryType: Constants.GRAPHQL_QUERY
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

    onClickClearFormHandler = (e) => {
        e.preventDefault();
        this.setState({inputValue: ''});
    };

    onSelectQuickQuery = (eventKey, event) => {
        const getTableData = this.props.appActions;
        switch (eventKey) {
            case Constants.GET_EMPLOYEES:
                getTableData('{getEmployees{id name surname listNumber}}', Constants.GRAPHQL_QUERY);
                break;
            case Constants.ADD_EMPLOYEE:
                getTableData(parse('mutation{addEmployee(id: "%s"){id name surname listNumber}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
            case Constants.DELETE_EMPLOYEE:
                getTableData(parse('mutation{deleteEmployee(id: "%s"){id name surname listNumber}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
            case Constants.GET_WORKPLACES:
                getTableData('{getWorkplaces{id name address}}', Constants.GRAPHQL_QUERY);
                break;
            case Constants.ADD_WORKPLACE:
                getTableData(parse('mutation{addWorkplace(id: "%s"){id name address}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
            case Constants.DELETE_WORKPLACE:
                getTableData(parse('mutation{deleteWorkplace(id: "%s"){id name address}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
        }
    };

    render() {
        return (
            <div>
                <form>
                    <FormGroup>
                        <FormControl
                            componentClass="textarea"
                            rows="4"
                            resize="none"
                            placeholder="Input your query here..."
                            value={this.state.inputValue}
                            onChange={this.onChangeInputHandler}/>
                        <ControlLabel>Select query type:</ControlLabel>
                        <FormControl componentClass="select" onChange={this.onChangeSelectHandler}>
                            <option value={Constants.GRAPHQL_QUERY}>GraphQL query</option>
                            <option value={Constants.SQL_QUERY}>SQL query</option>
                        </FormControl>
                    </FormGroup>
                    <Button
                        id="submit_button"
                        bsStyle="primary"
                        type="button"
                        style={{
                            borderColor: "#222222",
                            backgroundColor: "#222222",
                            fontColor: "#888888"
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
                            marginLeft: '10px'
                        }}
                        onClick={this.onClickClearFormHandler}>
                        Clear form
                    </Button>
                    <DropdownButton
                        dropup
                        title="Quick Query"
                        style={{
                            marginLeft: '10px'
                        }}
                        onSelect={this.onSelectQuickQuery}
                        disabled={this.state.queryType != Constants.GRAPHQL_QUERY}>
                        <MenuItem eventKey={Constants.GET_EMPLOYEES}>Get employees</MenuItem>
                        <MenuItem eventKey={Constants.ADD_EMPLOYEE}>Add employee</MenuItem>
                        <MenuItem eventKey={Constants.DELETE_EMPLOYEE}>Delete employee</MenuItem>
                        <MenuItem eventKey={Constants.GET_WORKPLACES}>Get workplaces</MenuItem>
                        <MenuItem eventKey={Constants.ADD_WORKPLACE}>Add workplace</MenuItem>
                        <MenuItem eventKey={Constants.DELETE_WORKPLACE}>Delete workplace</MenuItem>
                    </DropdownButton>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(getData, dispatch)
    }
}

// %s string parameter
function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function () {
        return args[i++];
    });
}

export default connect(null, mapDispatchToProps)(MyEditTextForm)