import { map } from 'nanostores'

export const actions = map({});

export function setActionState(actionId, state) {
    actions.setKey(actionId, state);
}

export function getActionState(actionId) {
    return actions.get()[actionId];
}
