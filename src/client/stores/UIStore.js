/**
 * Created by michael on 16/8/17.
 */

import {observable, action, asMap} from 'mobx';

class UIStore {
    @observable attributes = asMap(new Map());
}

const UI = new Proxy(new UIStore(), {
    get: (target, prop) => {
        const reserved = {'$mobx': 1};

        if (reserved.hasOwnProperty(prop)) {
            return target[prop];
        }

        return target.attributes.get(prop);
    },
    set: (target, prop, value) => {
        target.attributes.set(prop, value);

        return true;
    }
});

export default UI;
