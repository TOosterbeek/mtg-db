import SearchAppBar from "./SearchAppBar";

export default function Layout({ children }) {

    return (
        <>
            <SearchAppBar />
            <main>{children}</main>
        </>
    )

}