import Link from "next/link";

export function Links() {
    return (
        <>  
            <Link href="/">
                <a> Home </a>
            </Link>

            <Link href="/massas">
                <a> Massas </a>
            </Link>

            <Link href="/carnes">
                <a> Carnes </a>
            </Link>

            <Link href="/doces">
                <a> Doces </a>
            </Link>

            <Link href="/saladas">
                <a> Saladas </a>
            </Link>
        </>
    );
}