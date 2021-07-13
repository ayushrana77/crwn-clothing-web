import React from 'react'

import { CustromButtonContainer } from './custrom-button.syle'
const CustomButton = ({ children, ...props }) => (
  <CustromButtonContainer {...props}>{children}</CustromButtonContainer>
)

export default CustomButton
