import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function gerHeroes() {
  const res = await fetch(`https://www.dota2.com/datafeed/herolist?language=english`).then((res) => res.json());
  return res.result.data.heroes;
}
type LoaderData = {
  heroes: Awaited<ReturnType<typeof gerHeroes>>;
};
export const loader = async () => {
  return json<LoaderData>({
    heroes: await gerHeroes()
  });
};

type HeroProps = {
  id: Number
  name: String
  name_loc: String
  name_english_loc: String
  primary_attr: keyof typeof Primary_attrEnum,
  complexity: Number
}

enum Primary_attrEnum {
  Strength,
  Agility,
  Intelegent
}

const Hero = ({ hero }: { hero: HeroProps }) => {
  const { name, name_english_loc, primary_attr } = hero;

  return (
    <div style={{background:"red",padding:10,margin:5,display:"flex",flexDirection:"column",alignItems:"center"}}>
      <p>{name_english_loc}</p>
      <p>{Primary_attrEnum[primary_attr]}</p>
    </div>
  );
};

export default function Heroes() {
  const { heroes } = useLoaderData() as LoaderData;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4",display:"flex",flexDirection:"row", flexWrap:"wrap" }}>
      {heroes.map((hero: HeroProps) => <Hero hero={hero} />)}
    </div>
  );
}


