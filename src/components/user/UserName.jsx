import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';

function UserName(props) {
    const {class: astroClassName, className, ...childrenProps} = props;
    const [name, setName] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) return;
            setName(user.displayName);
        })
    }, []);

    return (
        <span className={`${className||''} ${astroClassName||''}`} {...childrenProps}>{name}</span>
    );
}

export default UserName;