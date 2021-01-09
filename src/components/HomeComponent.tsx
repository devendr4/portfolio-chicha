import React, { useState } from "react";
import { PicList } from "./PictureListComponent";
import { TabGroup, Tab } from "../styled-components/skills";

const types = ["logos", "ilustraciones", "productos", "art"];
const englishTypes = ["logos", "illustrations", "products", "art"];
export const HomeComponent = () => {
  const [active, setActive] = useState(0);
  return (
    <>
      <TabGroup>
        {englishTypes.map((data, i) => {
          return [
            <Tab isActive={active === i} onClick={() => setActive(i)} key={i}>
              {data}
            </Tab>,
          ];
        })}
      </TabGroup>
      {types.map((data, i) => {
        return [<PicList category={data} isActive={active === i} key={i} />];
      })}
    </>
  );
};
