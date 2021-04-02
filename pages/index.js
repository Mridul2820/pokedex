import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

const pokeURL = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const pokeIMG = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail'

export const getStaticProps = async(context) => {
    try {
        const res = await fetch(`${pokeURL}`);
        const { results } = await res.json();
        const pokedex = results.map((pokemon, index) => {
            const paddedId = ('00' + (index + 1)).slice(-3);

            const image = `${pokeIMG}/${paddedId}.png`;
            return { ...pokemon, image };
        });
        return {
            props: { pokedex },
        };
    } catch (err) {
        console.error(err);
    }
}

export default function Home({ pokedex }) {
    return (
        <Layout title="Pokédex - Next JS">
            <h1 className={styles.title}>Pokédex</h1>
            {pokedex.map((pokemon, index) => (
                <Link href={`/pokemon?id=${index + 1}`}>
                    <a>
                        {/* <img 
                            src={pokemon.image}
                        /> */}
                        <Image 
                            src={pokemon.image} 
                            height={80}
                            width={80}
                        />
                        <span>
                            {index + 1}
                        </span>
                        {pokemon.name}
                    </a>
                </Link>
            ))}
        </Layout>
    )
}
