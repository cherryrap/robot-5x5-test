import React from 'react';
import b_ from 'b_';
import _ from 'lodash';

import './style.scss';

const b = b_.lock(`Button`);

const Button = ({
                    children,
                    icon,
                    isBig = false,
                    isDisabled,
                    isMarginLeft = false,
                    isSubmit = false,
                    onClick = _.noop
    }) => (
        <button className={b({ isBig, isDisabled, isMarginLeft, isSubmit })} onClick={onClick}>
            {icon && <span className={b('icon', { iconName: icon })}/>}
            {children}
        </button>
);

export default Button;
