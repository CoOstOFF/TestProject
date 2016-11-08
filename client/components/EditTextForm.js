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
import {getData} from '../actions/app-actions'

export default class MyEditTextForm extends React.Component {

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
        const {getData} = this.props.appActions;
        getData(this.props.num, this.state.inputValue, this.state.queryType);
    };

    onClickClearFormHandler = (e) => {
        e.preventDefault();
        this.setState({inputValue: ''});
    };

    onSelectQuickQuery = (eventKey, event) => {
        const {getData} = this.props.appActions;
        switch (eventKey) {
            case Constants.GET_EMPLOYEES:
                getData(this.props.num, '{getEmployees{id name surname listNumber}}', Constants.GRAPHQL_QUERY);
                break;
            case Constants.ADD_EMPLOYEE:
                getData(this.props.num, parse('mutation{addEmployee(id: "%s"){id name surname listNumber}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
            case Constants.DELETE_EMPLOYEE:
                getData(this.props.num, parse('mutation{deleteEmployee(id: "%s"){id name surname listNumber}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
            case Constants.GET_WORKPLACES:
                getData(this.props.num, '{getWorkplaces{id name address}}', Constants.GRAPHQL_QUERY);
                break;
            case Constants.ADD_WORKPLACE:
                getData(this.props.num, parse('mutation{addWorkplace(id: "%s"){id name address}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
            case Constants.DELETE_WORKPLACE:
                getData(this.props.num, parse('mutation{deleteWorkplace(id: "%s"){id name address}}',
                    prompt("Input ID") || ""), Constants.GRAPHQL_QUERY);
                break;
            case Constants.SHOW_ALL_TABLES:
                getData(this.props.num, 'select rdb$relation_name from rdb$relations where rdb$view_blr is null and (rdb$system_flag is null or rdb$system_flag = 0);', Constants.SQL_QUERY);
                break;
            case Constants.DELETE_TABLE:
                getData(this.props.num, parse('drop table %s',
                    prompt("Input table name") || ""), Constants.SQL_QUERY);
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
                        id="dropdown"
                        dropup
                        title="Quick Query"
                        style={{
                            marginLeft: '10px'
                        }}
                        onSelect={this.onSelectQuickQuery}>
                        <MenuItem disabled={this.state.queryType != Constants.GRAPHQL_QUERY}
                                  eventKey={Constants.GET_EMPLOYEES}>Get employees</MenuItem>
                        <MenuItem disabled={this.state.queryType != Constants.GRAPHQL_QUERY}
                                  eventKey={Constants.ADD_EMPLOYEE}>Add employee</MenuItem>
                        <MenuItem disabled={this.state.queryType != Constants.GRAPHQL_QUERY}
                                  eventKey={Constants.DELETE_EMPLOYEE}>Delete employee</MenuItem>
                        <MenuItem disabled={this.state.queryType != Constants.GRAPHQL_QUERY}
                                  eventKey={Constants.GET_WORKPLACES}>Get workplaces</MenuItem>
                        <MenuItem disabled={this.state.queryType != Constants.GRAPHQL_QUERY}
                                  eventKey={Constants.ADD_WORKPLACE}>Add workplace</MenuItem>
                        <MenuItem disabled={this.state.queryType != Constants.GRAPHQL_QUERY}
                                  eventKey={Constants.DELETE_WORKPLACE}>Delete workplace</MenuItem>
                        <MenuItem divider/>
                        <MenuItem disabled={this.state.queryType != Constants.SQL_QUERY}
                                  eventKey={Constants.SHOW_ALL_TABLES}>Show all tables</MenuItem>
                        <MenuItem disabled={this.state.queryType != Constants.SQL_QUERY}
                                  eventKey={Constants.DELETE_TABLE}>Delete table</MenuItem>
                    </DropdownButton>
                </form>
            </div>
        );
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

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({getData}, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(MyEditTextForm)