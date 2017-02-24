import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import { map, sortBy } from 'lodash';

import TranslateTable from '../components/translateTable';
import { translate, getDictList } from '../api/translate';

class Translate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            dicts: [],
            dictOptions: [],
            translations: []
        };
    }

    componentWillMount() {
        getDictList().then((res) => {
            res.json().then((options) => {
                this.setState({
                    dictOptions: map(options, option => Object.assign({}, { value: option, label: option}))
                })
            })
        })
    }

    translate() {
        translate(this.state.word, this.state.dicts).then((res) => {
            res.json().then((translations) => {
                this.setState({ translations: sortBy(translations, ['distance']) })
            })
        })
    }

    handleWordChange(event) {
        this.setState({
            word: event.target.value,
        });
    }


    handleDictChange (dicts) {
        this.setState({
            dicts
        });
    }

    render() {
        return (
            <div style={{ padding: '0px 30px' }}>
                <div>
                    <TextField name="word" onChange={(e) => this.handleWordChange(e)} />
                    <FlatButton label="Search" onClick={() => this.translate()} />

                    <Select
                        name="dictionary"
                        value={this.state.dicts}
                        options={this.state.dictOptions}
                        multi={true}
                        simpleValue={true}
                        onChange={(value) => this.handleDictChange(value)}
                        placeholder="Select dictionaries..."
                    />
                </div>
                <TranslateTable translations={this.state.translations}/>
            </div>
        )
    }
};

export default Translate;
