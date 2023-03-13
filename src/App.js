import React, { useState } from 'react';
import logo from './img/robot-up.svg';
import b_ from 'b_';
import _ from 'lodash';

import './style.scss';

import {
    DIRECTIONS,
    EXES_MAX,
    EXES_MIN
} from './constants';

const b = b_.lock(`App`);

const App = () => {
    const [params, setParams] = useState([0,0,DIRECTIONS[0]]);
    console.log(params);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <img src={logo} className={b('logo')} alt="logo" />
                <h2>Welcome to Nata's robot-5x5-test project</h2>
            </div>
            <div className={b('body')}>
                <div className={b('nav')}>
                    <div className={b('nav-row')}>
                        <div className={b('button')}>
                            <span className={b('button-icon', { icon: 'left'})}/>
                        </div>
                        <div className={b('button', { isBig: true })}>
                            <span className={b('button-icon', { icon: 'up'})}/> Move
                        </div>
                        <div className={b('button')}>
                            <span className={b('button-icon', { icon: 'right'})}/>
                        </div>
                        <div className={b('button', { isSeparate: true })}>
                            <span className={b('button-icon', { icon: 'info'})}/>
                        </div>
                    </div>
                    <div className={b('nav-row')}>
                        Choose steps to right:
                        <input type='number'/>
                        , to left:
                        <input type='number'/>
                        and direction
                        <input type='select'/>
                        <div className={b('button')}>Place</div>
                    </div>
                </div>
                <div className={b('grid')}>
                    {_.times(Math.pow(EXES_MAX, 2), index => (<div className={b('grid-cell')} key={index}/>))}
                    <span className={b('robot')}/>
                </div>
            </div>
        </div>
    );
}

export default App;

