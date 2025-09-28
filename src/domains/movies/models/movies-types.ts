export interface IMovie {
  movieListResult: IMovieListResult;
}

interface IMovieListResult {
  totCnt: number;
  source: string;
  movieList: IMovieList[];
}
interface IMovieList {
  movieNm: string;
  prdtYear: string;
  movieCd: string;
}
