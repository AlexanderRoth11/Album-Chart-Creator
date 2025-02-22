import CardArea from "@/components/card/card-area";
import CardHeader from "@/components/card/card-header";

import PageLayout from "@/components/page/page-layout";
import { AppProvider } from "@/context/app-context";
import { AlbumSize, AlbumType } from "@/types/enums";

export default function Home() {
  return (
    <AppProvider>
      <PageLayout>
        <div id="large-area" className="mx-4">
          <CardHeader text="Legendary" type={AlbumType.large} />
          <CardArea size={AlbumSize.LARGE} />
        </div>
        <div id="medium-area" className="mx-4 mt-5">
          <CardHeader text="Masterwork" type={AlbumType.medium} />
          <CardArea size={AlbumSize.MEDIUM} />
        </div>
        <div id="small-area" className="mx-4 mt-5">
          <CardHeader text="Epic" type={AlbumType.small} />
          <CardArea size={AlbumSize.SMALL} />
        </div>
      </PageLayout>
    </AppProvider>
  );
}
