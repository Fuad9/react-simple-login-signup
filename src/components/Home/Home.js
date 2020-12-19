import React, { useEffect, useState } from "react";
import Axios from "axios";

import Loading from "../utilities/Loading";

const Home = () => {
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      const getData = async () => {
         try {
            setLoading(true);
            const response = await Axios.get("https://jsonplaceholder.typicode.com/posts");
            setPosts(response.data);
            setLoading(false);
         } catch (error) {
            setLoading(false);
         }
      };
      getData();
   }, []);

   return (
      <>
         {loading ? (
            <Loading />
         ) : (
            <div>
               <h1>Posts From Random User</h1>
               {posts.map((post) => (
                  <div key={post.id} className="post-container my-3 p-3">
                     <h2>{post.title}</h2>
                     <h4>{post.body}</h4>
                  </div>
               ))}
            </div>
         )}
      </>
   );
};

export default Home;
