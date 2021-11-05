/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { outMypage } from '../actions/inoutMypageAction';
import {
  resetSearchPage,
  addProductList,
  setProductList,
  addSearchedProductList,
  setSearchedProductList,
  setSearchPage,
} from '../actions/searchAction';
import '../styles/Search.scss';
import NavChange from '../components/NavChange';
import TopButton from '../components/TopButton';
import IsLogin from '../components/IsLogin';
import IsLoadingSmall from '../components/IsLoadingSmall';
import SearchProductList from '../components/SearchProductList';

function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchOrder, setSearchOrder] = useState('views');
  const userState = useSelector((state) => state.userReducer);
  const { isLogin } = userState;
  const searchState = useSelector((state) => state.searchReducer);
  const {
    productList,
    productCount,
    searchedProductList,
    searchedProductCount,
    searchedWord,
    searchType,
    searchPage,
  } = searchState;

  // const [isSearchALL, setIsSearchALL] = useState(true);
  // todo: 처음 전체 제품리스트를 받아온다 - 조회순 (조회순 class명 체인지)
  // todo: 인풋창에 검색을 하면 해당 인풋대로 서버에 요청 query=
  // todo: 리뷰순 클릭시, 리뷰순으로 재요청
  // todo: 100개 이후에는 무한 스크롤 구현 page,size
  // todo: 탑버튼 구현

  // ---- 다시 무한 스크롤 관련 스테이트 만
  const [isLoading, setIsLoading] = useState(false);
  // 리덕스의 productList
  const [queryPage, setQueryPage] = useState(1);
  const [searchedQueryPage, setSearchedQueryPage] = useState(1);
  const [target, setTarget] = useState(null); // 왜 되는지?
  const [pageTotal, setPageTotal] = useState(1);

  // ----- handle products order by views, reviews
  const handleOrderBtn = (e) => {
    const order = e.target.value;
    // if (!searchedProductList) {
    //   axios
    //     .get('/products/all/items', {
    //       params: { order },
    //       loading: false,
    //     })
    //     .then((res) => {
    //       const { items } = res.data;
    //       dispatch(setProductList(items, items.length));
    //       setSearchOrder(order);
    //       setQueryPage(0);
    //     });
    // } else {
    //   axios
    //     .get('/products', {
    //       params: { query: searchedWord, type: searchType, order },
    //       loading: false,
    //     })
    //     .then((res) => {
    //       const { items } = res.data;
    //       dispatch(setSearchedProductList(items, items.length));
    //       setSearchOrder(order);
    //       setQueryPage(0);
    //     });
    // }
  };

  // -------- infinite scroll -------------
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const one = entries[0];
      if (one.isIntersecting) {
        setQueryPage((prev) => prev + 1);
        setSearchedQueryPage((prev) => prev + 1);
      }
    }),
  );

  const getMoreProducts = async () => {
    // 전체 vs 검색어
    if (!searchedProductList) {
      setIsLoading(true);
      const response = await axios.get('/products/all/items', {
        params: { page: queryPage },
      });
      dispatch(
        addProductList(response.data.items, response.data.pages.itemCount),
      );
      setPageTotal(response.data.pages.total);
      setIsLoading(false);
    } else {
      console.log('이게 되나');
      setIsLoading(true);
      const response = await axios.get('/products', {
        params: {
          query: `${searchedWord}`,
          order: searchOrder,
          page: queryPage + 1,
        },
        loading: false,
      });
      dispatch(
        addSearchedProductList(
          response.data.items,
          response.data.pages.itemCount,
        ),
      );
      setPageTotal(response.data.pages.total);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (queryPage <= pageTotal) {
      getMoreProducts();
    }
  }, [queryPage]);

  useEffect(() => {
    const currentEl = target;
    const currentObserver = observer.current;

    if (currentEl) {
      currentObserver.observe(currentEl);
    }
    return () => {
      if (currentEl) {
        currentObserver.unobserve(currentEl);
      }
    };
  }, [target]);

  return (
    <>
      <NavChange />
      <IsLogin />
      <TopButton />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img" />
          <div className="Search_bottom">
            <div className="Search_title">
              <div>
                {!searchedProductList
                  ? `전체 건강기능식품 ${queryPage}`
                  : `"${searchedWord}" 검색 결과`}
                <span>
                  {!searchedProductList
                    ? `(${productCount})`
                    : `(${searchedProductCount})`}
                </span>
              </div>
              <div className="Sequence">
                <button
                  className={
                    searchOrder === 'views' ? 'textColor_change' : 'textColor'
                  }
                  onClick={handleOrderBtn}
                  type="button"
                  value="views"
                >
                  조회순
                </button>
                <button type="button" className="textColor_change">
                  |
                </button>
                <button
                  className={
                    searchOrder === 'views' ? 'textColor' : 'textColor_change'
                  }
                  onClick={handleOrderBtn}
                  type="button"
                  value="reviews"
                >
                  리뷰순
                </button>
              </div>
            </div>
            <div className="Search_products">
              <SearchProductList
                isLoading={isLoading}
                queryPage={queryPage}
                pageTotal={pageTotal}
                setTarget={setTarget}
              />
              <div className={isLoading ? 'targetEl' : 'targetEl_nonVisible'}>
                {isLoading && <IsLoadingSmall />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
