/**
 * Created by michael on 16/8/12.
 */

import {clientRequest, parseAPIs} from '../../common/RESTHelper';
import BookAPI from '../../common/api/BookAPI';
import config from '../config';

const APIDeclares = parseAPIs(BookAPI);

function APICall(name, params) {
    return clientRequest(config.restClient, APIDeclares[name], params);
}

export default APICall;
