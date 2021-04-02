import Head from 'next/head'

const Layout = ({ title, children }) => {
    return (
        <div className="layout">
            <Head>
                <title>{ title }</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container">
                {children}
            </main>
        </div>
    );
}
 
export default Layout;