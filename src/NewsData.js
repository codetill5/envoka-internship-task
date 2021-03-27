import React, { useEffect, useState } from "react";
import "./NewsData.css";
import axios from "axios";
import Pagination from './Pagination';


function NewsData() {
  const [data, setData] = useState([]);
  const [search, setSearch] = React.useState([]);
  // const [pag, getPag] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewPerPage] = useState(10);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=3c45972e24554598886fa5529bd0773c"
      );
        
     

      const value = request.data.articles.filter((index) =>
        index.title.toLowerCase().includes(data)
      );
      setSearch(value);
      // getPag(request.data.totalResults);
    }
    fetchData();
  }, [data]);

  // const numberPages = Math.floor(pag / 10);
  // console.log(numberPages);

  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentNews = search.slice(indexOfFirst, indexOfLast);
  console.log(search.length);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <div className="inner-table">
        <table>
          <tr>
            <th>Source Id</th>
            <th>Source Name</th>
            <th>Author</th>
            <th>Published At</th>
          </tr>

          {currentNews.map((item, index) => (
            <tr>
              <td>{item.source.id || " - "}</td>
              <td>{item.source.name || " - "}</td>
              <td>{item.author || " - "}</td>
              <td>{item.publishedAt || " - "}</td>
            </tr>
          ))}
        </table>
        
      </div>


      <Pagination newsPerPage={newsPerPage} totalPosts={search.length} paginate={paginate} />
    </div>
  );
}

export default NewsData;
