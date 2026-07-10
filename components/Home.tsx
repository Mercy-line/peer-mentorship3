import React from "react";
import TitleSlide from "./TitleSlide";
import { TitleSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";

export const Home: React.FC<SlideProps<TitleSlideData>> = (props) => <TitleSlide {...props} />;
export default Home;
