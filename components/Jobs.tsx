import React from "react";
import ContentSlide from "./ContentSlide";
import { ContentSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";

export const Jobs: React.FC<SlideProps<ContentSlideData>> = (props) => <ContentSlide {...props} />;
export default Jobs;
