import React, { useState } from 'react';
import robot from './assets/robot-up.svg';
import b_ from 'b_';
import _ from 'lodash';

import './style.scss';
import Input from './components/Input';
import Button from './components/Button';

import {
    DIRECTIONS,
    AXIS_MAX,
    AXIS_MIN
} from './constants';

const validateAxis = string => !!string && (_.toNumber(string) <= AXIS_MAX) && (_.toNumber(string) >= AXIS_MIN);

const b = b_.lock(`App`);

const App = () => {
    const [params, setParams] = useState({
        y: AXIS_MIN,
        x: AXIS_MIN
    });
    const [direction, setDirection] = useState(DIRECTIONS[0].value);
    const [message, setMessage] = useState(null);
    const [newX, setNewX] = useState(null);
    const [newY, setNewY] = useState(null);
    const [newCardinalDirection, setNewCardinalDirection] = useState(direction);

    const filteredDirection = (filter) => _.get(_.filter(DIRECTIONS, ['value', filter]), '[0].label');

    const rotate = (to) => {
        let newDirection = direction;

        if (to === 'left') {
            newDirection = (direction === 0) ? 270 : direction - 90;
        } else if (to === 'right') {
            newDirection = (direction === 270) ? 0 : direction + 90;
        }
        setDirection(newDirection);
        setMessage(`Robot's turned ${to} and is now facing ${filteredDirection(newDirection)}`);
    };

    const move = () => {
        let x = params.x
        let y = params.y;

        switch (direction) {
            case 0:
                y = (y === AXIS_MAX) ? y : (params.y + 1);
                break;
            case 90:
                x = (x === AXIS_MAX) ? x : (params.x + 1);
                break;
            case 180:
                y = (y === AXIS_MIN) ? y : (params.y - 1);
                break;
            case 270:
                x = (x === AXIS_MIN) ? x : (params.x - 1);
                break;
        }
        setParams({ y, x });
        setMessage(`Robot's moved to (${x}, ${y})`);
    };

    const place = () => {
        setParams({ y: _.toNumber(newY), x: _.toNumber(newX) });
        setDirection(newCardinalDirection);
        setMessage(`Robot's moved to (${newX}, ${newY}), facing ${filteredDirection(newCardinalDirection)}`);
    };

    const errorMessage =`Not an integer between ${AXIS_MIN} and ${AXIS_MAX}`;
    const style = {
        bottom: `${(62 * params.y) - 32}px`, // axis-Y movement
        left: `${(62 * params.x) - 32}px`, // axis-X movement
        transform: `rotate(${direction}deg)`, // turn around
    };

    const isSubmitDisabled = _.isNil(newX) || _.isNil(newY) || _.isNil(newCardinalDirection) || !validateAxis(newX) || !validateAxis(newY);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <img src={robot} className={b('logo')} alt='logo' />
                <h2>Welcome to Nata's robot-5x5-test</h2>
            </div>
            <div className={b('body')}>
                <div className={b('nav')}>
                    <div className={b('nav-row')}>
                        <Button icon='left' onClick={() => rotate('left')} />
                        <Button icon='up' isBig onClick={() => move()}>Move</Button>
                        <Button icon='right' onClick={() => rotate('right')} />
                        <Button
                            icon='info'
                            isMarginLeft
                            onClick={() => setMessage(`Report: ${params.x}, ${params.y}, ${filteredDirection(direction)}`)}
                        />
                    </div>
                    <div className={b('nav-row')}>
                        <div>
                            <Input
                                allowNegative={false}
                                decimalScale={0}
                                error={errorMessage}
                                label='X-axis'
                                onChange={value => setNewX(value)}
                                validate={validateAxis}
                                value={newX}
                            />
                            <Input
                                allowNegative={false}
                                decimalScale={0}
                                label='Y-axis'
                                error={errorMessage}
                                onChange={value => setNewY(value)}
                                validate={validateAxis}
                                value={newY}
                            />
                            <Input
                                autoComplete='nope'
                                label='Facing'
                                onChange={value => setNewCardinalDirection(value)}
                                options={DIRECTIONS}
                                select
                                value={newCardinalDirection}
                            />
                        </div>
                        <Button
                            isDisabled={isSubmitDisabled}
                            isSubmit
                            onClick={() => isSubmitDisabled ? _.noop : place()}
                        >
                            Place
                        </Button>
                    </div>
                    <div className={b('nav-row')}>{message}</div>
                </div>
                <div className={b('grid')}>
                    {_.times(Math.pow(AXIS_MAX, 2), index => (<div className={b('grid-cell')} key={index}/>))}
                    <span className={b('robot')} style={style}/>
                </div>
            </div>
        </div>
    );
}

export default App;

