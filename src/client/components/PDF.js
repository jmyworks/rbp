/**
 * Created by michael on 16/8/14.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {action, extendObservable} from 'mobx';
import {observer} from 'mobx-react';
import LinearProgress from 'material-ui/LinearProgress';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

//require('pdfjs-dist/build/pdf.combined');
require('pdfjs-dist/web/pdf_viewer');
require('pdfjs-dist/web/compatibility');
require('pdfjs-dist/web/pdf_viewer.css');
window.PDFJS.cMapUrl = '/public/cmaps/';
window.PDFJS.cMapPacked = true;

@observer
class PDF extends React.Component {
    constructor(props) {
        super(props);

        extendObservable(this, {
            loading: true,
            progress: 0,
            error: '',
            currentPage: 1,
            pageCount: 0
        })
    }

    componentDidMount() {
        this.initUI();
        this.open();
    }

    feedback() {
        if (this.props.onFeedback && this.pdfViewer) {
            this.props.onFeedback(this.pdfViewer.currentPageNumber,
                this.pdfViewer.scroll.lastY,
                this.pdfViewer.currentScale);
        }
    }

    @action initUI() {
        const PDFJS = window.PDFJS;
        var linkService = new PDFJS.PDFLinkService();
        this.pdfLinkService = linkService;

        var container = document.getElementById('viewerContainer');
        var pdfViewer = new PDFJS.PDFViewer({
            container: container,
            linkService: linkService
        });
        this.pdfViewer = pdfViewer;
        linkService.setViewer(pdfViewer);

        this.pdfHistory = new PDFJS.PDFHistory({
            linkService: linkService
        });
        linkService.setHistory(this.pdfHistory);

        container.addEventListener('pagesinit', () => {
            // We can use pdfViewer now, e.g. let's change default scale.
            pdfViewer.currentScaleValue = 'auto';
            this.pageCount = pdfViewer.pagesCount;
            this.feedback();
        });

        container.addEventListener('pagechange', (evt) => {
            this.currentPage = evt.pageNumber;
            this.feedback();
        }, true);

        window.onresize = function () {
            // We can use pdfViewer now, e.g. let's change default scale.
            pdfViewer.currentScaleValue = 'auto';
        };
    }

    @action open() {
        var loadingTask = window.PDFJS.getDocument(this.props.file);
        loadingTask.onProgress =  (progressData) => {
            this.progress = progressData.loaded / progressData.total * 100;
        };

        loadingTask.then((pdfDocument) => {
            this.pdfDocument = pdfDocument;
            this.pdfViewer.setDocument(pdfDocument);
            this.pdfLinkService.setDocument(pdfDocument);
            this.pdfHistory.initialize(pdfDocument.fingerprint);
        }).catch((reason) => {
            this.error = reason.message;
        }).finally(() => {
            this.loading = false;
        });
    }

    setPage(val) {
        if (this.pdfViewer) {
            this.pdfViewer.currentPageNumber = val;
            this.currentPage = val;
            this.test = val;
        }
    }

    getPage() {
        return this.currentPage;
    }

    render() {
        return (
            <div>
                {this.loading ? <LinearProgress mode="determinate" value={this.progress} /> : ''}
                <Toolbar style={{
                    position: 'fixed',
                    right: '100px',
                    bottom: '0',
                    zIndex: '999',
                    lineHeight: '48px'
                }}>
                    <ToolbarGroup firstChild={true}>
                        <IconButton onClick={() => this.setPage(this.currentPage-1)} disabled={this.currentPage === 1}>
                            <NavigationChevronLeft />
                        </IconButton>
                        <div>
                            {this.currentPage} / {this.pageCount}
                        </div>
                        <IconButton onClick={() => this.setPage(this.currentPage+1)} disabled={this.currentPage === this.pageCount}>
                            <NavigationChevronRight />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <div id="viewerContainer" style={{position: 'relative', height: this.props.height, overflow: 'auto'}}>
                    <div className="pdfViewer"></div>
                </div>
            </div>
        );
    }
}

export default PDF;
