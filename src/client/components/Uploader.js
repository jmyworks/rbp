/**
 * Created by michael on 16/7/13.
 */

import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
//import Subheader from 'material-ui/Subheader';
//import Divider from 'material-ui/Divider';
import _ from 'lodash';
import {Grid, Row, Col} from 'react-flexbox-grid';
import config from '../config';

var File = React.createClass({
    getInitialState: function () {
        return {
            progress: 0
        };
    },
    render: function () {
        return (
            <Col xs={12} md={6}>
                <p style={{textAlign: 'left'}}>{this.props.name}</p>
                <LinearProgress mode="determinate" value={this.state.progress} />
            </Col>
        );
    }
});

var Uploader = React.createClass({
    getInitialState: function () {
        this.fileSelector = null;
        this.fileInstances = {};

        return {files: []};
    },
    getFiles: function () {
        var filesByExt = {};
        var pattern = new RegExp('\\.(' + this.props.filter.replace(/\./g, '').replace(/,/g, '|') + ')$', 'i');
        _.forEach(this.fileSelector.files, (f) => {
            var match = f.name.match(pattern);
            if (match !== null) {
                if (_.isEmpty(filesByExt[match[1]])) {
                    filesByExt[match[1]] = [];
                }
                (filesByExt[match[1]]).push(f);
            }
        });

        if (this.props.handleFiles) {
            filesByExt = this.props.handleFiles(filesByExt);
        }

        return filesByExt;
    },
    handleSelect: function () {
        this.fileSelector.click();
    },
    handleChange: function () {
        this.setState({files: this.getFiles()});
    },
    handleUpload: function () {
        _.forEach(_.flatten(_.values(this.state.files)), (file) => {
            var instance = this.fileInstances[file.name];
            var xhr = new XMLHttpRequest();
            var fd = new FormData();

            xhr.upload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    var percentage = Math.round((e.loaded * 100) / e.total);
                    instance.setState({progress: percentage});
                }
            }, false);

            xhr.open('POST', config.fileServer, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        instance.setState({progress: 100});
                    } else {
                        instance.setState({progress: 0});
                        console.log(xhr.statusText + ': ' + this.response);
                    }
                }
            };

            fd.append('file', file);

            xhr.send(fd);
        });
    },
    render: function () {
        return (
            <Grid fluid style={{...this.props.style}}>
                <Row>
                    <Col>
                        <FlatButton label="Select" onClick={this.handleSelect} />
                        <FlatButton label="Upload" onClick={this.handleUpload} />
                        <input ref={(ref) => {this.fileSelector = ref; }} type="file" style={{display: 'none'}}
                               accept={this.props.accept} multiple onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                    {_.map(this.state.files, (files, ext) => {
                        if (!_.isEmpty(files)) {
                            return (
                                <Col key={ext} xs md>
                                    <Row>
                                        <Col md={12}>
                                            <h2>{ext}</h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {_.map(files, (file) => <File key={file.name} ref={(ref) => {this.fileInstances[file.name] = ref; }} name={file.name} />)}
                                    </Row>
                                </Col>
                            );
                        }
                    })}
                </Row>
            </Grid>
        );
    }
});

export default Uploader;
