import React, { useState } from 'react';
import PropTypes from 'prop-types';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var getNavStyles = function getNavStyles(indx, length) {
  var styles = [];

  for (var i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done');
    } else if (i === indx) {
      styles.push('doing');
    } else {
      styles.push('todo');
    }
  }

  return styles;
};

var getButtonsState = function getButtonsState(indx, length) {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true
    };
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false
    };
  }
};

function MultiStep(_ref) {
  var steps = _ref.steps,
      allowCrumbClick = _ref.allowCrumbClick,
      currStep = _ref.currStep,
      showNavigation = _ref.showNavigation;
  var currentIndex;

  if (currStep === '___firstKey') {
    currentIndex = 0;
  } else {
    currentIndex = steps.findIndex(function (x) {
      return x.name === currStep;
    });
  }

  var _useState = useState(getNavStyles(currentIndex, steps.length)),
      _useState2 = _slicedToArray(_useState, 2),
      stylesState = _useState2[0],
      setStyles = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      compState = _useState4[0],
      setComp = _useState4[1];

  var _useState5 = useState(getButtonsState(currentIndex, steps.length)),
      _useState6 = _slicedToArray(_useState5, 2),
      buttonsState = _useState6[0],
      setButtons = _useState6[1];

  function setStepState(indx) {
    setStyles(getNavStyles(indx, steps.length));
    setComp(indx < steps.length ? indx : compState);
    setButtons(getButtonsState(indx, steps.length));
  }

  var next = function next() {
    return setStepState(compState + 1);
  };

  var previous = function previous() {
    return setStepState(compState > 0 ? compState - 1 : compState);
  };

  var handleKeyDown = function handleKeyDown(evt) {
    return evt.which === 13 ? next(steps.length) : {};
  };

  var handleOnClick = function handleOnClick(evt) {
    if (!allowCrumbClick) return null;

    if (evt.currentTarget.value === steps.length - 1 && compState === steps.length - 1) {
      setStepState(steps.length);
    } else {
      setStepState(evt.currentTarget.value);
    }
  };

  var renderSteps = function renderSteps() {
    return steps.map(function (s, i) {
      return React.createElement("li", {
        className: 'progtrckr-' + stylesState[i],
        onClick: handleOnClick,
        key: i,
        value: i
      }, React.createElement("em", null, i + 1), React.createElement("span", null, steps[i].name));
    });
  };

  return React.createElement("div", {
    className: "container",
    onKeyDown: handleKeyDown
  }, React.createElement("ol", {
    className: "progtrckr"
  }, renderSteps()), steps[compState].component, React.createElement("div", {
    style: showNavigation ? {} : {
      display: 'none'
    }
  }, React.createElement("button", {
    style: buttonsState.showPreviousBtn ? {} : {
      display: 'none'
    },
    onClick: previous
  }, "Previous"), React.createElement("button", {
    style: buttonsState.showNextBtn ? {} : {
      display: 'none'
    },
    onClick: next
  }, "Next")));
}

MultiStep.propTypes = {
  showNavigation: PropTypes.bool,
  allowCrumbClick: PropTypes.bool,
  currStep: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    component: PropTypes.node
  })).isRequired
};
MultiStep.defaultProps = {
  showNavigation: true,
  allowCrumbClick: true,
  currStep: '___firstKey'
};

export default MultiStep;
//# sourceMappingURL=index.js.map
