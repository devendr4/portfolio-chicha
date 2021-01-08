import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
//@ts-ignore
import { Image, Transformation } from "cloudinary-react";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: #fefefe;
`;

const loadingAnimation = keyframes`
  0%{
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff; }
`;

type Props = {
  publicId: string;
};

const LazyImage = ({ publicId }: Props) => {
  return (
    <LazyLoad>
      <Image publicId={publicId} width="100%" height="100%">
        <Transformation
          fetch_format="auto"
          resource-type="image"
          flags="lossy"
        />
        <Transformation aspectRatio="4:3" crop="fill" />
        <Transformation width="auto" dpr="auto" crop="scale" />
      </Image>
    </LazyLoad>
  );
};

export default LazyImage;
