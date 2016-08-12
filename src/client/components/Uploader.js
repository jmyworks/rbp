/**
 * Created by michael on 16/7/13.
 */

import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import {Grid, Row, Col} from 'react-flexbox-grid';
import config from '../config';

class File extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0
        };
    }

    render() {
        return (
            <Col xs={12} md={6}>
                <p style={{textAlign: 'left'}}>{this.props.name}</p>
                <LinearProgress mode="determinate" value={this.state.progress} />
            </Col>
        );
    }
}

class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.fileSelector = null;
        this.fileInstances = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.state = {files: []};
    }

    getFiles() {
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
    }

    handleSelect() {
        this.fileSelector.click();
    }

    handleChange() {
        if (this.props.onChange) {
            this.props.onChange();
        }

        this.setState({files: this.getFiles()});
    }

    handleUpload() {
        var uploader = this;

        _.forEach(_.flatten(_.values(this.state.files)), (file) => {
            var instance = this.fileInstances[file.name];

            if (instance.state.progress !== 0) {
                return;
            }

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

                        if (uploader.props.onUploaded) {
                            uploader.props.onUploaded(file, JSON.parse(this.response));
                        }
                    } else {
                        instance.setState({progress: 0});
                        console.log(xhr.statusText + ': ' + this.response);

                        if (uploader.props.onFailed) {
                            uploader.props.onFailed(file, this.response);
                        }
                    }
                }
            };

            fd.append('file', file);

            xhr.send(fd);
        });
    }

    render() {
        return (
            <Grid fluid style={this.props.style}>
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
                                            <h2 style={{textAlign: 'left'}}>{ext}</h2>
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
}

export default Uploader;
