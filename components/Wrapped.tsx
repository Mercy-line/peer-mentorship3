import React from "react";
import ClosingSlide from "./ClosingSlide";
import { ClosingSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";

export const Wrapped: React.FC<SlideProps<ClosingSlideData>> = (props) => <ClosingSlide {...props} />;
export default Wrapped;
