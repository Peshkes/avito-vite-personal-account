import CardAdvertisementGenerator from "./advertisements-card/CardAdvertisementGenerator.tsx";
import Gallery from "../../shared/components/gallery/Gallery.tsx";
import PageSizer from "./page-sizer/PageSizer.tsx";
import Filter from "./filter/Filter.tsx";
import Search from "./search/Search.tsx";
import AddAdvertisementButton from "./add-advertisement/AddAdvertisementButton.tsx";
import PageLayout from "../../shared/components/page-layout/PageLayout.tsx";
import AllAdvertisementsPagination from "./AllAdvertisementsPagination.tsx";

const AllAdvertisementsPage = () => {
    return (
        <PageLayout
            title="Все объявления"
            mainContent={<AddAdvertisementButton/>}
            settingsContent={<><PageSizer/><Search/><Filter/></>}>
            <Gallery>
                <CardAdvertisementGenerator/>
            </Gallery>
            <AllAdvertisementsPagination/>
        </PageLayout>
    );
};

export default AllAdvertisementsPage;
