import React from 'react';
import Window from '../components/Window'
import {Button} from 'react-bootstrap';
var _ = require('lodash');
import ReactGridLayout, {WidthProvider} from 'react-grid-layout';
const DecoratedReactGridLayout = WidthProvider(ReactGridLayout);

export default class ReduxPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {arr: [], count: 0}
    }

    onClickAddFormHandler = () => {
        this.setState({count: this.state.count + 1});
        this.state.arr.push(this.state.count);
        this.setState({arr: this.state.arr});
    };

    onClickCloseHandler = (key)=> {
        _.remove(this.state.arr, function (n) {
            return n == key;
        });
        this.setState({arr: this.state.arr});
    };

    render() {
        return (
            <div style={{
                backgroundColor: "#CFD8DC",
                marginTop: 50,
                marginBottom: 50
            }}>
                <DecoratedReactGridLayout
                    cols={12}
                    rowHeight={42}
                    className="layout"
                >
                    <div className="card"
                         key={'toolbar'}
                         data-grid={{i: 'toolbar', x: 0, y: 0, w: 12, h: 1, static: true}}
                         style={{
                             padding: 1,
                             backgroundColor: "#FFFFFF",
                             display: "flex",
                             alignItems: "center",
                             borderRadius: 3
                         }}>
                        <Button
                            id="add_form_button"
                            type="button"
                            style={{borderColor: "#FFFFFF"}}
                            onClick={this.onClickAddFormHandler}>
                            Add form
                        </Button>
                    </div>
                    {this.state.arr.map((item, i) =>
                        <div
                            className="card"
                            data-grid={{i: item.toString(), minH: 5, minW: 4, x: 0, y: 0, w: 6, h: 5}}
                            key={item.toString()}
                            style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: 3
                            }}>
                            <Window num={item} onCloseClick={() => {
                                this.onClickCloseHandler(item)
                            }}/>
                        </div>
                    )}
                </DecoratedReactGridLayout>
            </div>
        );
    }
}