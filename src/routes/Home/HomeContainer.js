import React from "react";
import HomePresentor from "./HomePresentor";
import { moviesApi } from "../../api";

// Container의 역할 : Application에서 사용되어지는 기능(함수), 상태(state), 이벤트 폼을
//                    구분 하고, Presentor에 전달

export default class extends React.Component {
  // 클래스형 컴포넌트에서 state 만들기
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  // constuctor : 클래스 생성자
  //              생성자의 매개변수로 부모 컴포넌트의 props가 들어온다.
  constructor(props) {
    super(props);
  }

  // 컴포넌트가 부모 컴포넌트에 마운트 됐을 때 호출되는 함수
  // useEffect(() => {}, [])와 같다.

  // useEffect 에서의 비동기처리와는 다르게, 클래스형 컴포넌트의 componentDidMount에서의
  // 비동기 처리는 앞에 async 키워드를 붙여주면 된다.
  async componentDidMount() {
    try {
      // data -> results에 원하는 내용이 있었음
      // data : { results : [{},{},{},...]}

      // data안에 있는 results에 들어있는 값을 nowPlaying 변수에 넣겠다.
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();

      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();

      const {
        data: { results: popular },
      } = await moviesApi.popular();

      this.setState({
        nowPlaying,
        upcoming,
        popular,
      });
    } catch (error) {
      this.setState({
        error: "영화 정보를 찾을 수 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  // 함수형 컴포넌트에서 return에 해당된다.
  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;

    return (
      <HomePresentor
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
