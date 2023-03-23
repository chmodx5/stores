import React from "react";
import StoreLayout from "../../components/layouts/store/StoreLayout";

const About = () => {
  return <div>About</div>;
};

About.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};
export default About;
