import classnames from 'classnames'
import styles from './styles/index.module.scss'

const VSummary = ({ children, className = '', main, type = null, ...props }) => {
    return (
      <summary
        data-main={main}
        data-type={type}
        className={classnames({
          [styles.details__summary]: true,
          [className]: !!className
        })}
        {...props}
      >
        {children}
      </summary>
    )
  }

  export default VSummary