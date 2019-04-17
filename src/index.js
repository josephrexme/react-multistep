import React, { useState } from 'react'
import PropTypes from 'prop-types';

const getNavStyles = (indx, length) => {
  let styles = []
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done')
    } else if (i === indx) {
      styles.push('doing')
    } else {
      styles.push('todo')
    }
  }
  return styles
}

const getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true
    }
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    }
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false
    }
  }
}

function MultiStep({ steps, allowCrumbClick, currStep, showNavigation }) {
  let currentIndex;
  if(currStep === '___firstKey') {
    currentIndex = 0;
  } else {
    currentIndex = steps.findIndex(x => x.name === currStep);
  }

  const [stylesState, setStyles] = useState(getNavStyles(currentIndex, steps.length))
  const [compState, setComp] = useState(0)
  const [buttonsState, setButtons] = useState(getButtonsState(currentIndex, steps.length))

  function setStepState(indx) {
    setStyles(getNavStyles(indx, steps.length))
    setComp(indx < steps.length? indx : compState)
    setButtons(getButtonsState(indx, steps.length))
  }

  const next = () => setStepState(compState + 1)

  const previous = () => setStepState((compState > 0) ? compState - 1 : compState)

  const handleKeyDown = (evt) => evt.which === 13 ? next(steps.length) : {}

  const handleOnClick = (evt) => {
    if(!allowCrumbClick) return;
    if (evt.currentTarget.value === steps.length - 1 && compState === steps.length - 1) {
      setStepState(steps.length)
    } else {
      setStepState(evt.currentTarget.value)
    }
  }

  const renderSteps = () =>
    steps.map((s, i) => (
      <li
        className={'progtrckr-' + stylesState[i]}
        onClick={handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{steps[i].name}</span>
      </li>
    ))

  return (
      <div className='container' onKeyDown={handleKeyDown}>
        <ol className='progtrckr'>
          {renderSteps()}
        </ol>
        {steps[compState].component}
        <div style={showNavigation ? {} : { display: 'none' }}>
          <button
            style={buttonsState.showPreviousBtn ? {} : { display: 'none' }}
            onClick={previous}
          >
            Previous
          </button>

          <button
            style={buttonsState.showNextBtn ? {} : { display: 'none' }}
            onClick={next}
          >
            Next
          </button>
        </div>
      </div>
  )
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
  currStep: '___firstKey',
}

export default MultiStep;
