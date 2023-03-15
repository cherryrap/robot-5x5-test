import React from 'react';
import _ from 'lodash';
import b_ from 'b_';

import { NumericFormat } from 'react-number-format';

import './style.scss';

import { KEY_CODES } from './constants';

const b = b_.lock(`Input`);

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectOpen: false,
    };

    this.inputRef = React.createRef();
    this.inputRefNumber = React.createRef();
    this.containerRef = React.createRef();
    this.activeSelectItem = React.createRef();
  }

  componentDidMount() {
    if (_.includes([`select`, `text`], this.getControlType())) {
      document.addEventListener(`mousedown`, this.handleClickOutsideSelect);
    }
  }

  componentDidUpdate({ value: valuePrev }) {
    if (this.props.value !== valuePrev) this.validate();
  }

  componentWillUnmount() {
    if (_.includes([`select`, `text`], this.getControlType())) {
      document.removeEventListener(`mousedown`, this.handleClickOutsideSelect);
    }
  }

  handleClickOutsideSelect = event => {
    if (
      this.state.isSelectOpen && this.containerRef && (this.containerRef.current || this.inputRef.current)
      && (!this.containerRef.current.contains(event.target) || (this.inputRef.current && this.inputRef.current.contains(event.target)))
    ) {
      if (this.inputRef.current && this.inputRef.current.contains(event.target)) {event.stopPropagation();event.preventDefault();}
      this.closeSelect();
    }
  }

  onChange = event => {
    this.props.onChange(event.target.value);
  }

  onSelect = ({ value }) => {
    this.props.onChange(value);
    this.closeSelect();
  }

  onKeyDown = event => {
    if (event.keyCode === KEY_CODES.ENTER) event.preventDefault();
  }

  onKeyUp = event => {
    const { onCtrlEnterPress, onEnterPress } = this.props;
    if (onEnterPress && event && event.keyCode === KEY_CODES.ENTER && !event.ctrlKey) onEnterPress();
    if (onCtrlEnterPress && event && event.keyCode === KEY_CODES.ENTER && event.ctrlKey) onCtrlEnterPress();
  }

  closeSelect = () => {
    this.setState({ isSelectOpen: false }, this.blur);
  }

  openSelect = () => {
    this.setState({ isSelectOpen: true }, () => {
      if (this.activeSelectItem && this.activeSelectItem.current) {
        this.activeSelectItem.current.scrollIntoView();
      }
    });
  }

  clear = () => this.props.onChange(``);

  blur = () => {
    if (this.inputRef && _.isFunction(this.inputRef.blur)) this.inputRef.blur();
    if (_.get(this.inputRef, `current`) && _.isFunction(this.inputRef.current.blur)) this.inputRef.current.blur();
    if (this.inputRefNumber && _.isFunction(this.inputRefNumber.blur)) this.inputRefNumber.blur();
    this.setState( this.validate);
  }

  focus = async () => {
    const { disabled } = this.props;
    if (disabled) return;

    if (_.includes([`select`], this.getControlType())) this.openSelect();
    if (this.inputRef && _.isFunction(this.inputRef.focus)) this.inputRef.focus();
    if (_.get(this.inputRef, `current`) && _.isFunction(this.inputRef.current.focus)) this.inputRef.current.focus();
    if (this.inputRefNumber && _.isFunction(this.inputRefNumber.focus)) this.inputRefNumber.focus();
  }

  onInputClick = () => { if (!this.state.isSelectOpen) this.focus();}

  validate = () => {
    const { validate, value } = this.props;
    if (!_.isFunction(validate)) return;
    this.setState({ invalid: !validate(value) });
  }

  getControlType = () => {
    if (this.props.select) return `select`;
    return _.includes([`number`, `tel`], this.props.type) ? `number` : `text`;
  }

  getControl = () => {
    let Control = `input`;
    if (this.getControlType() === `number`) Control = NumericFormat;
    return Control;
  }

  getControlProps = () => {
    const type = this.getControlType();
    const controlProps = {
      onChange: this.onChange,
    };

    const { options, value } = this.props;

    switch (type) {
      case `number`:
        controlProps.getInputRef = this.inputRef;
        controlProps.type = `tel`;
        break;
      case `select`:
        controlProps.onChange = this.onChange;
        controlProps.type = `text`;
        controlProps.readOnly = true;
        controlProps.ref = this.inputRef;
        controlProps.value = _.get(_.find(options, { value }), `label`, ``);
        break;
      default:
        controlProps.ref = this.inputRef;
        break;
    }
    return controlProps;
  }

  render() {
    const {
      after,
      allowNegative,
      autoComplete,
      decimalScale,
      disabled,
      error,
      label,
      options,
      value,
    } = this.props;

    const { invalid, isSelectOpen } = this.state;

    const Control = this.getControl();
    const controlProps = this.getControlProps();
    const controlType = this.getControlType();

    const showError = invalid && error;

    return (
      <div className={b()}>
        <div
          className={b({ invalid: invalid, type: controlType})}
          onClick={this.onInputClick}
          ref={this.containerRef}
        >
          {label && (<label className={b(`label`)}>{label}</label>)}
          <Control
            allowNegative={allowNegative}
            autoComplete={autoComplete}
            className={b(`control`)}
            disabled={disabled}
            decimalScale={decimalScale}
            onBlur={this.blur}
            onFocus={this.focus}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            value={value}
            type={controlType}
            {...controlProps}
          />
          {showError && (<div className={b(`error`)}>{error}</div>)}
          {isSelectOpen && (
            <ul className={b(`select`)}>
              {_.map(options, option => {
                const active = option.value === value;
                return (
                  <li
                    className={b(`select-item`, { active })}
                    key={option.value}
                    onClick={() => this.onSelect(option)}
                    ref={active ? this.activeSelectItem : _.noop}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          )}
          {after}
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  allowNegative         : true,
  autoComplete          : `off`,
  disabled              : false,
  invalid               : false,
  onChange              : _.noop,
  select                : false,
  type                  : `tel`,
  value                 : ``,
};

export default Input;
