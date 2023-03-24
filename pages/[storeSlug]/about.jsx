import React from "react";
import StoreLayout from "../../components/layouts/store/StoreLayout";
import { storeContext } from "../../store/storeContext";

const About = ({ store }) => {
  const { setStore } = useContext(storeContext);

  useEffect(() => {
    setStore(store);
  }, []);
  return <div>About</div>;
};

export async function getServerSideProps(context) {
  const { storeSlug } = context.query;

  const store = await prisma.store.findUnique({
    where: {
      slug: storeSlug,
    },
  });

  return {
    props: {
      store: JSON.parse(JSON.stringify(store)),
    },
  };
}

About.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};
export default About;
