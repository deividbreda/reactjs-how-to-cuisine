import Link from "next/link";

export function Links() {
    return (
        <>
            <h1> Categorias </h1>
            <ul>
                <li>
                    <Link href="/massas">
                        <a> Massas </a>
                    </Link>
                </li>
                <li>
                    <Link href="/carnes">
                        <a> Carnes </a>
                    </Link>
                </li>
                <li>
                    <Link href="/doces">
                        <a> Doces </a>
                    </Link>
                </li>
                <li>
                    <Link href="/saladas">
                        <a> Saladas </a>
                    </Link>
                </li>
            </ul>
        </>
    );
}