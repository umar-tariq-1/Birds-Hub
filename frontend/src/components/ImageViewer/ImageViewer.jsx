import React from "react";
import CloseIcon from"./styled-components/Icon";
import useViewer from "./useViewer";
import {
  CloseBtn,
  ImageBody,
  ImageContainer,
  ViewerFrame
} from "./styled-components/StyledComponets";

export const ImageViewer = props => {
  const { dontClose, closeViewer, show, showViewer } = useViewer()

  return (
    <>
      {<ImageBody id={props.ID} onClick={showViewer}>{props.showChildren && props.children}</ImageBody>}

      {show && (
        <ViewerFrame onClick={closeViewer}>
          <CloseBtn onClick={closeViewer}>
            <CloseIcon />
          </CloseBtn>
          <ImageContainer onClick={dontClose}>{props.children}</ImageContainer>
        </ViewerFrame>
      )}
    </>
  )
}
