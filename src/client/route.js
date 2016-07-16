/**
 * Created by michael on 16/7/8.
 */

import routerHelper from './utils/routerHelper.js';
import App from './components/App.js';

var Route = routerHelper({
    match: '',
    path: '',
    children: [
        'Index', 'Book', 'Discuss', 'About'
    ]
});

Route.component = App;

export default Route;
