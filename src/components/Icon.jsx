import { useState, useEffect } from "react";
import "../styles/icon.css";

function Icon(props) {
    const { className, class: astroClassName, src, name, ...childProps} = props;
    if (name) {
        return (
            <div className={`icon icon--loaded ${className||''}`} {...childProps}>
                <ion-icon name={name} />
            </div>
        );
    }

    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    useEffect(() => {
        fetch(src)
            .then((res) => res.text())
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true));
    }, [src]);
    return (
        <div
            className={`icon icon--${isLoaded ? "loaded" : "loading"} ${
                isErrored ? "icon--error" : ""
            } ${className || ""} ${astroClassName||''}`}
            dangerouslySetInnerHTML={{ __html: svg }}
            {...childProps}
        />
    );
}

Icon.propTypes = {
    src: (props, propName, componentName) => {
        if (!props.src && !props.name) {
            return new Error(
                `One of props 'data' or 'url' was not specified in '${componentName}'.`
            );
        }
    },

    name: (props, propName, componentName) => {
        if (!props.src && !props.name) {
            return new Error(
                `One of props 'url' or 'data' was not specified in '${componentName}'.`
            );
        }
    },
};

export default Icon;
