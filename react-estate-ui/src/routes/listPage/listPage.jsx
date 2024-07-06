import "./listPage.scss";
import { Suspense } from "react";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { useLoaderData, Await } from "react-router-dom";
import SkeletonCard from "../../components/skeletonloader/SkeletonCard";
import List from "../../components/list/List";

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
            {
              console.log(resp.data.posts)  
              if(resp.data.posts.length === 0){
                return <p>No posts found</p>
              }
              return <List listData={resp.data.posts} />
            }
          }
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
          {(resp) =>{
            return <Map items={resp.data.posts} />
            }}
        </Await>
      </Suspense>

    </div>
  </div>;
}

export default ListPage;
