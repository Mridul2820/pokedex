import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout'
import styles from '../styles/Pokemon.module.scss';

const pokeURL = 'https://pokeapi.co/api/v2/pokemon'
const pokeIMG = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail'

export const getServerSideProps = async({ query }) => {
    const id = query.id;
    try {
        const res = await fetch(`${pokeURL}/${id}`);
        const pokemon = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokemon.image = `${pokeIMG}/${paddedId}.png`;
        return {
            props: { pokemon },
        };
    } catch (err) {
        console.error(err);
    }
}

const pokemon = ({ pokemon }) => {
    return (
        <Layout title={pokemon.name}>
            <div  
                className={styles.pokemon}>
                <div className={styles.image}>
                    <Image 
                        src={pokemon.image} 
                        alt={pokemon.name} 
                        height={200}
                        width={200}
                    />
                </div>
                
                <div className={styles.details}>
                    <h1>
                        {pokemon.id}. {pokemon.name}
                    </h1>
                    <h3>
                        <span>Weight : </span> 
                        {pokemon.weight}
                    </h3>
                    <h3>
                        <span>Height : </span>
                        {pokemon.height}
                    </h3>
                    <h3 className="">Type : </h3>
                    {pokemon.types.map((type, index) => (
                        <h3 key={index}>{type.type.name}</h3>
                    ))}
                </div>
            </div>

            <h3 className={styles.home}>
                <Link href="/">
                    <a className="">Home</a>
                </Link>
            </h3>
        </Layout>
    );
}
 
export default pokemon;