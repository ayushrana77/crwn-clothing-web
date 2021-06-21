import React from 'react'

import './form-input.style.scss'

const FormInput = ({ handleChange, label, ...otherprops }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherprops} />
    {label ? (
      <lable
        className={`${
          otherprops.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </lable>
    ) : null}
  </div>
)

export default FormInput
