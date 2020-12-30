import React from "react";
import Head from "next/head";

const SEO = () => {
  const name = "Todos";
  const city = "Minden";
  const latitude = "0";
  const longitude = "0";
  const region = "DE-NRW";
  const keywords = ["Todo", "Lukas Weidich"];
  const language = "de";
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta property="content-type" content="text/html; charset=UTF-8" />
      <meta httpEquiv="language" content={language} />
      <meta name="language" content={language} />
      <meta name="keywords" content={keywords.join(",")} />
      <meta name="author" content={name} />
      <meta name="copyright" content={name} />
      <meta name="robots" content="index,follow" />
      <meta name="geo.region" content={region} />
      <meta name="geo.placename" content={city} />
      <meta name="geo.position" content={`${latitude};${longitude}`} />
      <meta name="ICBM" content={`${latitude}, ${longitude}`} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta property="og:site_name" content={name} />
      <meta property="og:type" content="business.business" />
      <meta property="og:latitude" content={latitude} />
      <meta property="og:longitude" content={longitude} />
      <meta property="og:locality" content={city} />
      <meta property="og:region" content={region} />
      <meta property="HandheldFriendly" content="yes" />
      <meta property="audience" content="all" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
