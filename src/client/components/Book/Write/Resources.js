/**
 * Created by michael on 16/7/13.
 */

import React from 'react';
import Uploader from '../../Uploader';
import _ from 'lodash';

class Resources extends React.Component {
    constructor(props) {
        super(props);

        this.handleFiles = this.handleFiles.bind(this);
    }

    handleFiles(filesByExt) {
        var pdf = _.flatten(_.values(_.pick(filesByExt, 'pdf')));
        var image = _.flatten(_.values(_.pick(filesByExt, ['png', 'jpg'])));
        var audio = _.flatten(_.values(_.pick(filesByExt, ['mp3', 'mp4'])));

        return {pdf, image, audio};
    }

    render() {
        return (
            <Uploader style={{maxWidth: '90%'}}
                      accept="application/pdf,audio/mpeg,audio/mp4"
                      filter=".pdf,.mp3,.mp4,.png,.jpg"
                      handleFiles={this.handleFiles}
                      onUploaded={this.props.onFileUploaded}
                      onChange={this.props.onFileListChange}
            />
        );
    }
}

export default Resources;
