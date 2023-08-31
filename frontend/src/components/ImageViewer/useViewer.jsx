import { useState, useEffect } from "react"

const useViewer = () => {
  const [show, setShow] = useState(false)

  const showViewer = () => {
    setShow(true)
  }

  const dontClose = e => {
    e.stopPropagation()
  }

  const closeViewer = () => {
    setShow(false)
  }

  useEffect(() => {
    document.addEventListener("keyup", e => {
      if (e.keyCode === 27) closeViewer()
    })

    if (show === true) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [show])

  return {
    show,
    showViewer,
    dontClose,
    closeViewer
  }
}

export default useViewer;