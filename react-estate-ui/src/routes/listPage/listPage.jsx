import "./listPage.scss";
import { Suspense } from "react";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { useLoaderData, Await } from "react-router-dom";
import SkeletonCard from "../../components/skeletonloader/SkeletonCard";

function ListPage() {
  const data = useLoaderData();

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter />
        <Suspense fallback={<SkeletonCard/>}>
          <Await
            resolve={data.resp}
            errorElement={<p>Error loading posts!</p>}
          >
            {(resp) =>
              resp.data.posts.map(item => (
                <Card key={item.id} item={item} />
              ))}
          </Await>
        </Suspense>
      </div>
    </div>
    <div className="mapContainer">
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={data.resp}
          errorElement={<p>Error loading posts!</p>}
        >
          {(resp) =>
            <Map items={resp.data.posts} />}
        </Await>
      </Suspense>

    </div>
  </div>;
}

export default ListPage;
