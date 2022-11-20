import { json, LoaderFunction } from "@remix-run/node";
import { useParams } from "react-router";
import { useLoaderData } from "@remix-run/react";


export async function getHeroById(heroId: Number) {
  const res = await fetch(`https://www.dota2.com/datafeed/herodata?language=english&hero_id=${heroId}`).then((res) => res.json());
  console.log("res", res);
  return res.result.data.heroes[0];
}


export const loader: LoaderFunction = async ({
                                               params
                                             }) => {

  return json({
    hero: await getHeroById(Number(params.heroId))
  });
};
const ChangeHero = () => {
  const { heroId } = useParams();

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <a style={{ fontSize: 25, textDecoration: "none"}} href={`${Number(heroId) - 1}`}>Back</a>
      <a style={{ fontSize: 25, textDecoration: "none" }} href={`${Number(heroId) + 1}`}>Next</a>
    </div>
  );
};

export default function Hero() {

  const { hero } = useLoaderData();
  console.log("hero", hero);
  const { name_loc, bio_loc,abilities } = hero;
//  `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_berserkers_call.png
  return (
    <div style={{padding:10}}>
      <ChangeHero />
      <h1>{name_loc}</h1>
      <div>
        <p style={{width:"100%",minWidth:600,maxWidth:"70%",fontWeight:200,fontSize:24}}>{bio_loc}</p>
          {
              abilities.map(ability=><img src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability.name}.png`} />)
          }
      </div>
    </div>
  );
}
