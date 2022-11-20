import { json, LoaderFunction } from "@remix-run/node";
import { useParams } from "react-router";
import { useLoaderData } from "@remix-run/react";


export async function getHeroById(heroId: Number) {
  const res = await fetch(`https://www.dota2.com/datafeed/herodata?language=english&hero_id=${heroId}`).then((res) => res.json());
  return res.result.data.heroes[0];
}

export const loader: LoaderFunction = async ({ params }) => {
  return json({
    hero: await getHeroById(Number(params.heroId))
  });
};
const ChangeHero = () => {
  const { heroId } = useParams();

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <a style={{ fontSize: 25, textDecoration: "none" ,color:"white"}} href={`${Number(heroId) - 1}`}>Back</a>
      <a style={{ fontSize: 25, textDecoration: "none" ,color:"white"}} href={`${Number(heroId) + 1}`}>Next</a>
    </div>
  );
};

export default function Hero() {

  const { hero } = useLoaderData();
  const {id, name_loc, bio_loc,npe_desc_loc, abilities } = hero;
  console.log("hero",hero)
  return (
          <div key={id} style={{ padding: 10,backgroundImage:'url("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//backgrounds/greyfade.jpg")',height:"99vh",color:"white" }}>
      <ChangeHero />
      <h1>{name_loc}</h1>
      <h5 style={{color:"#a5e0f3",fontSize:18}}>{npe_desc_loc}</h5>
        <p style={{ width: "100%", minWidth: 600, maxWidth: "70%", fontWeight: 200, fontSize: 24 }}>{bio_loc}</p>
        {abilities.map((ability: { name: String; id:Number })=><img key={abilities.id} src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability.name}.png`} />)}
    </div>
  );
}

