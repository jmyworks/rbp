/**
 * Created by michael on 16/7/10.
 */

import routerHelper from '../../utils/routerHelper.js';

module.exports = routerHelper({
    match: 'Book',
    path: 'Book',
    index: 'Shelf',
    children: ['Write', 'Shelf']
});
