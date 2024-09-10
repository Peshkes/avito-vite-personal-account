import Pagination from "./pagination/Pagination.tsx";
import Gallery from "../../shared/components/gallery/Gallery.tsx";
import PageSizer from "./page-sizer/PageSizer.tsx";
import style from './AllAdvertisementsPage.module.css';
import Filter from "./filter/Filter.tsx";
import Search from "./search/Search.tsx";
import AddAdvertisementButton from "./add-advertisement/AddAdvertisementButton.tsx";
import CardAdvertisementGenerator from "./advertisements-card/CardAdvertisementGenerator.tsx";

const AllAdvertisementsPage = () => {
    return (
        <main className={style.container}>
            <div className={style.header}>
                <div className={style.main}>
                    <h1>Все объявления</h1>
                    <AddAdvertisementButton/>
                </div>
                <div className={style.settings}>
                    <PageSizer/>
                    <Search/>
                    <Filter/>
                </div>
            </div>
            <Gallery>
                    <CardAdvertisementGenerator/>
            </Gallery>
            <Pagination/>
        </main>
    );
};

export default AllAdvertisementsPage;
