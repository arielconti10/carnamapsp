import { useEffect, useMemo, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const libraries = useMemo<["places", "drawing", "visualization"]>(
    () => ["places", "drawing", "visualization"],
    []
  );
  const [viewType, setViewType] = useState<"list" | "map">("list");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const blocos = api.bloco.getAll.useQuery();

  const handleViewTypeChange = () => {
    setViewType((prev) => (prev === "list" ? "map" : "list"));
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
          Blocos de rua Carnaval SP{" "}
          <span className="text-[hsl(280,100%,70%)]">2023</span>
        </h1>
        <div className="container flex w-full max-w-3xl flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex w-full flex-col items-center gap-4">
            <fieldset className="flex w-full flex-col justify-center">
              <legend className="ml-2 mb-2 text-white">
                Pesquise o nome bloco
              </legend>
              <input
                type="text"
                className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
                placeholder="Ex: A pra??a ?? nossa"
              />
            </fieldset>
            <fieldset className="flex w-full flex-col justify-center">
              <legend className="ml-2 mb-2 text-white">Data do bloco</legend>
              <input
                type="date"
                className="rounded-full bg-white/10 px-4 py-2 text-white"
                placeholder="Data"
              />
            </fieldset>
          </div>
          <div>
            <span>Mudar visualiza????o</span>
            <button onClick={handleViewTypeChange}>
              {viewType === "list" ? "Mapa" : "Lista"}
            </button>
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            {viewType === "list" ? (
              blocos.data ? (
                blocos.data.map((bloco) => (
                  <div
                    className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                    key={bloco.id}
                  >
                    <h1>{bloco.name}</h1>
                    <p>{bloco.route}</p>
                  </div>
                ))
              ) : (
                "Carregando..."
              )
            ) : isLoaded ? (
              <GoogleMap
                options={{
                  disableDefaultUI: true,
                  clickableIcons: true,
                  scrollwheel: false,
                }}
                zoom={14}
                center={{ lat: -23.550185626143133, lng: -46.63333728849464 }}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: "800px", height: "800px" }}
                onLoad={() => console.log("Map Component Loaded...")}
              />
            ) : (
              <>
                <h1>Carregando mapa...</h1>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
