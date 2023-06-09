import React, { useRef, useState } from 'react'
import VDetails from '../../views/VDetails'

interface ICDetails {
  forceClose?: boolean
  className?: string
  open?: boolean
  animationOn?: boolean
  children: React.ReactNode
}
// Создайте тип для анимации
type AnimationType = Animation | null;

const CDetails: React.FC<ICDetails> = ({
  forceClose,
  children,
  className = '',
  open = false,
  animationOn = true,
  ...restProps
}) => {
  const detailsRef = useRef<HTMLDetailsElement>(null)

  const isAnimation = useRef<AnimationType>(null)
  const [isClosing, setisClosing] = useState(false)
  const [isExpanding, setisExpanding] = useState(false)

  const getSumary = () => {
    if (detailsRef.current === null) return
    for (let i = 0; i < detailsRef.current.children.length; i++) {
      const childrenClass = detailsRef.current.children[i].getAttribute('class')
      if (childrenClass &&
        childrenClass.indexOf('details__summary') !== -1
        // /details__summary/i.test(
        //   detailsRef.current.children[i].attributes.class.value
        // )
      ) {
        return detailsRef.current.children[i]  as HTMLElement
      }
    }
  }

  const getContent = () => {
    if (detailsRef.current === null) return
    for (let i = 0; i < detailsRef.current.children.length; i++) {
      const childrenClass = detailsRef.current.children[i].getAttribute('class')
      if (
        childrenClass &&
        childrenClass.indexOf('details__content') !== -1
        // /details__content/i.test(
        //   detailsRef.current.children[i].attributes.class.value
        // )
      ) {
        return detailsRef.current.children[i]  as HTMLElement
      }
    }
  }

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (detailsRef.current === null) return
    const target = e.target as HTMLElement;

    const summaryClass = target.getAttribute('class')
    const testSummary = summaryClass && summaryClass.indexOf('details__summary') !== -1
    const testGX = target.localName.indexOf('gx') !== -1

    if (!testGX || testSummary) e.preventDefault()

    //! classNames tests
    // const testSummary = /details__summary/i.test(target.attributes.class.value)
    // const testGX = /gx/i.test(target.localName)
    // const testParent = /aside_panel__block/i.test(target.parentNode.attributes.class.value)
    if (!testSummary) {
      if ((target.onclick) || testGX) return
      const parentNode = target.parentNode as HTMLElement  | null;
      const parentClass = parentNode && parentNode.getAttribute('class')
      const testParent = parentClass && parentClass.indexOf('aside_panel__block') !== -1
      if (!testParent && parentNode && parentNode.children.length === 1 && parentNode.onclick) return
    }

    detailsRef.current.style.overflow = 'hidden'
    if (isClosing || !detailsRef.current.open) {
      handleOpen()
    } else if (isExpanding || detailsRef.current.open) {
      handleShrink()
    }
  }

  const handleShrink = () => {
    if (detailsRef.current === null) return

    setisClosing(true)
    const content = getContent()
    const summary = getSumary()
    if (!content || !summary) return
    const stylesDetails = window.getComputedStyle(detailsRef.current)

    const paddingsDetails =
      parseInt(stylesDetails.paddingTop) + parseInt(stylesDetails.paddingBottom)

    const startHeight = `${detailsRef.current.getBoundingClientRect().height}px`
    const endHeight = `${summary.getBoundingClientRect().height + paddingsDetails}px`

    if (isAnimation.current) {
      isAnimation.current.cancel()
    }

    isAnimation.current = detailsRef.current.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 500,
        easing: 'cubic-bezier(.38,.83,.42,1)'
      }
    )

    isAnimation.current.onfinish = () => onAnimationFinish(false)
    isAnimation.current.oncancel = () => setisClosing(false)
    content.setAttribute('open', 'false')
  }

  const handleOpen = () => {
    if (detailsRef.current === null) return

    detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`
    detailsRef.current.open = true
    window.requestAnimationFrame(() => expand())
    const content = getContent()
    content && content.setAttribute('open', 'true')
  }

  const expand = () => {
    if (detailsRef.current === null) return

    setisExpanding(true)

    const summary = getSumary()

    const content = getContent()
    if (!content || !summary) return

    const startHeightDetails = detailsRef.current.getBoundingClientRect().height

    const stylesSummary = window.getComputedStyle(summary)
    const stylesContent = window.getComputedStyle(content)

    const marginTopSummary = parseInt(stylesSummary.marginTop)
    const marginBetween = Math.max(
      parseInt(stylesContent.marginTop),
      parseInt(stylesSummary.marginBottom)
    )
    const marginBottomContent = parseInt(stylesContent.marginBottom)
    const allMargins = marginTopSummary + marginBetween + marginBottomContent

    const startHeight = `${startHeightDetails}px`
    const endHeight = `${startHeightDetails + content.offsetHeight + allMargins}px`

    if (isAnimation.current) {
      isAnimation.current.cancel()
    }

    isAnimation.current = detailsRef.current.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 500,
        easing: 'cubic-bezier(.38,.83,.42,1)'
      }
    )
    isAnimation.current.onfinish = () => onAnimationFinish(true)
    isAnimation.current.oncancel = () => setisExpanding(false)
  }

  const onAnimationFinish = (open: boolean) => {
    if (detailsRef.current === null) return

    detailsRef.current.open = open
    isAnimation.current = null
    setisClosing(false)
    setisExpanding(false)
    detailsRef.current.style.height = detailsRef.current.style.overflow = ''
  }

  React.useLayoutEffect(() => {
    if (animationOn) {
      const summary = getSumary()
      if (summary && summary.onclick) {
        summary.onclick = handleClick;
        return
      }
      summary && summary.addEventListener('click', handleClick as unknown as EventListener);
    }
  }, [])

  React.useLayoutEffect(() => {
    const content = getContent()
    const summary = getSumary()
    if (!content || !summary) return
    if (open) {
      content.setAttribute('open', 'true')
      summary.setAttribute('data-animation', 'false')
    } else {
      content.setAttribute('open', 'false')
      summary.setAttribute('data-animation', 'true')
    }
  }, [])

  return (
    <VDetails
      ref={detailsRef}
      open={open}
      className={className}
      {...restProps}
    >
      {children}
    </VDetails>
  )
}

export default CDetails
