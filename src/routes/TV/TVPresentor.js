import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import Section from "../../components/Section";
import PropTypes from "prop-types";

const Container = styled.div`
  padding: 20px;
`;

const TVPresentor = ({ topRated, popular, airingToday, error, loading }) => {
  return (
    <>
      <Helmet>
        <title>TV | Bitflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {topRated && topRated.length && (
            <Section title="상위권">
              {topRated.map((tv) => (
                <Poster
                  key={tv.id}
                  id={tv.id}
                  title={tv.original_name}
                  imageUrl={tv.poster_path}
                  rating={tv.vote_average}
                  isMovie={false}
                  year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {popular && popular.length && (
            <Section title="인기 방영작">
              {popular.map((tv) => (
                <Poster
                  key={tv.id}
                  id={tv.id}
                  title={tv.original_name}
                  imageUrl={tv.poster_path}
                  rating={tv.vote_average}
                  isMovie={false}
                  year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {airingToday && airingToday.length && (
            <Section title="현재 방영작">
              {airingToday.map((tv) => (
                <Poster
                  key={tv.id}
                  id={tv.id}
                  title={tv.original_name}
                  imageUrl={tv.poster_path}
                  rating={tv.vote_average}
                  isMovie={false}
                  year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {error && <Message text={error} color="#e74c4c" />}
        </Container>
      )}
    </>
  );
};

TVPresentor.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresentor;
