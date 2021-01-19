import React, { useState, useEffect } from "react";
//import { fetchPhotos, CloudinaryPic } from "../CloudinaryService";
import { fetchPhotos } from "../CloudinaryService";
import LazyImage from "./LazyImage";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styled, { keyframes } from "styled-components";

type Props = {
  category: string;
};

const comeIn = keyframes`
0% {transform: scale(0)}
75% {transform: scale(1.03)}
100% {transform: scale(1)}
`;

const PicDiv = styled.div`
  .xmasonry .xblock {
    /*    animation: ${comeIn} ease 0.5s;*/
    transition: left 0.3s ease, top 0.3s ease;
  }
  .lazyload-wrapper {
    transition: left 0.3s ease, top 0.3s ease;
  }
`;

/*
interface Category {
  name: string;
  data: CloudinaryPic[];
}
const categories: Category[] = [
  { name: "logos", data: [] },
  { name: "ilustraciones", data: [] },
  { name: "productos", data: [] },
  { name: "art", data: [] },
];

const getData = async () => {
  categories.forEach(async (category) => {
    await fetchPhotos(category.name).then((x) => {
      if (x) {
        category.data = x;
      }
    });
  });
};
 */
export const PicList = ({ category }: Props) => {
  /*
  const [images, setImages] = useState<CloudinaryPic[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    console.log(categories);
    getData().then(() => {
      setImages(categories.filter((x) => x.name === category)[0].data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    getData();
    setImages(categories.filter((x) => x.name === category)[0].data);
    console.log(images);
    }, [category]);*/
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    fetchPhotos(category, setImages);
  }, [category]);
  return (
    <PicDiv>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
        <Masonry gutter={"10px"}>
          {images.map((i) => {
            return <LazyImage key={i} publicId={i} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </PicDiv>
  );
};
