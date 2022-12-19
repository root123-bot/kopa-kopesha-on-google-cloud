
import NextNProgress from "nextjs-progressbar";
{
  /* THIS FILE SHOULD BE THERE IF YOU WANT TO SHOW THE PROGRESS WHEN YOU MOVE FROM ONE PAGE TO ANOTHER .. FOR MORE VIEW THIS LINK 
https://www.npmjs.com/package/nextjs-progressbar */
}
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="red" />
      <Component {...pageProps} />
    </>
  );
}
