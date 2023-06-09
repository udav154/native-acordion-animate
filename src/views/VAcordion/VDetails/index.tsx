import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from '../styles/index.module.scss'

interface IVDetails {
  children?: React.ReactNode
  className?: string
  open?: boolean
}

const VDetails = forwardRef((
  {
    children,
    className = '',
    open = false,
    ...restProps
  }: IVDetails,
  ref: React.ForwardedRef<HTMLDetailsElement>) => {

  return (
    <details
      ref={ref}
      open={open}
      className={classNames({
        [styles.details]: true,
        [className]: !!className
      })}
      {...restProps}
    >
      {children}
    </details>
  )
}
)

export default VDetails
