import React from 'react';
import {Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';

export default class EditTextForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
    }

    onChangeHandler = (e) => {
        this.setState({inputValue: e.target.value});
    };

    onClickSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onClick(this.state.inputValue);
    };

    onClickClearFormHandler = () => {
        this.setState({inputValue: ''});
    };

    render() {
        return (
            <form>
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