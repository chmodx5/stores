import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ImageContainer, Logo, SingleStoreCard } from "../components/elements";
import { signIn, signOut } from "next-auth/react";
import prisma from "../utils/prismadb.js";
import {
  GuestFeaturedStores,
  GuestFeatures,
  GuestHero,
} from "./../components/sections/guest";

export default function Home({ stores }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-6">
        <GuestHero />
        <GuestFeatures />
        <GuestFeaturedStores stores={stores} />
      </main>
    </>
  );
}
export async function getServerSideProps() {
  const stores = await prisma.store.findMany({});

  return {
    props: {
      stores: JSON.parse(JSON.stringify(stores)),
    },
  };
}
