import React, { useState, useEffect, lazy, Suspense } from "react";
//import { fetchPhotos, CloudinaryPic } from "../CloudinaryService";
import { fetchPhotos } from "../CloudinaryService";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styled from "styled-components";
import Modal from "./Modal";

import SpinnerComponent from "./SpinnerComponent";
const LazyImage = lazy(() => import("./LazyImage"));
type Props = {
  category: string;
};

const PicDiv = styled.div`
  img {
    color: transparent;
    cursor: pointer;
  }
  img[alt]:after {
    display: none;
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
const PicList = ({ category }: Props) => {
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
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    fetchPhotos(category, setImages);
  }, [category]);
  return (
    <PicDiv>
      <Modal
        imageId={selectedImage}
        isOpen={!!selectedImage}
        toggle={() => setSelectedImage("")}
      ></Modal>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
        <Masonry gutter={"10px"}>
          {images.map((i) => {
            return [
              <Suspense fallback={SpinnerComponent}>
                <LazyImage
                  key={i}
                  publicId={i}
                  onClick={() => {
                    setSelectedImage(i);
                  }}
                />
              </Suspense>,
            ];
          })}
        </Masonry>
      </ResponsiveMasonry>
    </PicDiv>
  );
};
export default PicList;
