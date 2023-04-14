import { persistentAtom } from '@nanostores/persistent';

const lastPage = persistentAtom('lastPage', '');
const currentPage = persistentAtom('currentPage', window.location.origin);

export const setPage = (path) => {
    if (path === currentPage.get()) return;
    lastPage.set(currentPage.get());
    currentPage.set(path);
}

export const getPage = () => currentPage.get();
export const getLastPage = () => lastPage.get();