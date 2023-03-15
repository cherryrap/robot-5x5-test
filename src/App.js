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

const validateAxis = string => (_.toNumber(string) <= AXIS_MAX) && (_.toNumber(string) >= AXIS_MIN);

const b = b_.lock(`App`);

const App = () => {
    const [params, setParams] = useState({ y: AXIS_MIN, x: AXIS_MIN, direction: DIRECTIONS[0].value });
    const [placeParams, setPlaceParams] = useState({ y: null,  x: null, direction: DIRECTIONS[0].value });
    const [message, setMessage] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const filteredDirection = (filter) => _.get(_.filter(DIRECTIONS, ['value', filter]), '[0].label');

    const rotate = (to) => {
        let newDirection = params.direction;

        if (to === 'left') {
            newDirection = (params.direction === 0) ? 270 : params.direction - 90;
        } else if (to === 'right') {
            newDirection = (params.direction === 270) ? 0 : params.direction + 90;
        }
        setParams({ x: params.x, y: params.y, direction: newDirection })
        setMessage(`Rotated the Robot ${to}, now facing ${filteredDirection(newDirection)}`);
    };

    const move = () => {
        let x = params.x
        let y = params.y;

        switch (params.direction) {
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
        setParams({ y, x, direction: params.direction });
        setMessage(`Moved the Robot to (${x}, ${y})`);
    };

    const place = () => {
        setParams(placeParams);
        setMessage(`Placed the Robot to (${placeParams.x}, ${placeParams.y}), facing ${filteredDirection(placeParams.direction)}`);
        setIsDisabled(false);
    };

    const errorMessage =`Not an integer between ${AXIS_MIN} and ${AXIS_MAX}`;
    const style = {
        bottom: `${(62 * params.y) - 32}px`, // axis-Y movement
        left: `${(62 * params.x) - 32}px`, // axis-X movement
        transform: `rotate(${params.direction}deg)`, // turn around
    };

    const isSubmitDisabled = _.isNil(placeParams.x) || _.isNil(placeParams.y) || _.isNil(placeParams.direction) || !validateAxis(placeParams.x) || !validateAxis(placeParams.y);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <img src={robot} className={b('logo')} alt='logo' />
                <h2>Welcome to Nata's robot-5x5-test</h2>
            </div>
            <div className={b('body')}>
                <div className={b('nav')}>
                    <div className={b('nav-row')}>
                        <Button
                            icon='left'
                            isDisabled={isDisabled}
                            onClick={() => rotate('left')}
                        />
                        <Button
                            icon='up'
                            isBig
                            isDisabled={isDisabled}
                            onClick={move}>
                            Move
                        </Button>
                        <Button
                            isDisabled={isDisabled}
                            icon='right'
                            onClick={() => rotate('right')}
                        />
                        <Button
                            icon='info'
                            isDisabled={isDisabled}
                            isMarginLeft
                            onClick={() => setMessage(`Report: ${params.x}, ${params.y}, ${filteredDirection(params.direction)}`)}
                        />
                    </div>
                    <div className={b('nav-row')}>
                        <div>
                            <Input
                                allowNegative={false}
                                decimalScale={0}
                                error={errorMessage}
                                label='X-axis'
                                onChange={value => setPlaceParams({ ...placeParams, x: _.toNumber(value) })}
                                validate={validateAxis}
                                value={placeParams.x}
                            />
                            <Input
                                allowNegative={false}
                                decimalScale={0}
                                label='Y-axis'
                                error={errorMessage}
                                onChange={value => setPlaceParams({  ...placeParams, y: _.toNumber(value) })}
                                validate={validateAxis}
                                value={placeParams.y}
                            />
                            <Input
                                autoComplete='nope'
                                label='Facing'
                                onChange={value => setPlaceParams({ ...placeParams, direction: _.toNumber(value) })}
                                options={DIRECTIONS}
                                select
                                value={placeParams.direction}
                            />
                        </div>
                        <Button
                            isDisabled={isSubmitDisabled}
                            isSubmit
                            onClick={isSubmitDisabled ? _.noop : place}
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

