import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser1TopMusic, setUser2TopMusic } from "../../redux/User/userSlice";
import styles from "./index.module.scss";

export interface IArtist {
  genres: string[];
  name: string;
}

const sum = (arr1: number[], arr2: number[]) => {
  let sum1: number = 0;
  for (let el of arr1) sum1 += el;
  for (let el of arr2) sum1 += el;
  return sum1;
};
const commonArtists: IArtist[] = [];

const Comparison = () => {
  // const []
  const dispatch = useAppDispatch();
  const [genrePercentage, setGenrePercentage] = useState(0);
  const [artistPercentage, setArtistPercentage] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const {
    user1: { topMusic },
    user2: { topMusic: topMusic2 },
  } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(setUser1TopMusic("a"));
    dispatch(setUser2TopMusic("a"));
  }, []);
  useEffect(() => {
    if (!topMusic?.length || !topMusic2?.length) return;
    if (!loading) return;
    const unorganizedGenres1: string[][] = topMusic.map(
      (artist: IArtist, index) => {
        const genreArr = artist.genres;
        return genreArr;
      }
    );

    const allGenres1 = [].concat(...unorganizedGenres1);
    //sort frequency
    var frequency1: any = {};
    allGenres1.map((genre) => {
      frequency1[genre] = 0;
    });
    allGenres1.map((genre) => {
      frequency1[genre] = frequency1[genre] + 1;
    });
    const unorganizedGenres2: string[][] = topMusic.map(
      (artist: IArtist, index) => {
        const genreArr = artist.genres;
        return genreArr;
      }
    );
    const allGenres2 = [].concat(...unorganizedGenres2);
    //sort frequency
    var frequency2: any = {};
    allGenres2.map((genre) => {
      frequency2[genre] = 0;
    });
    allGenres2.map((genre) => {
      frequency2[genre] = frequency2[genre] + 1;
    });
    // console.log(frequency1, allGenres1, frequency2, allGenres2);
    let genreSimilarity = 0;
    for (let genre of Object.keys(frequency1)) {
      console.log(genre, frequency1[genre], frequency2[genre]);
      genreSimilarity =
        frequency1[genre] + (frequency2[genre] || 0) + genreSimilarity;
    }
    const totalGenresFrequency = sum(
      Object.values(frequency1),
      Object.values(frequency2)
    );
    console.log(
      totalGenresFrequency,
      genreSimilarity,
      Object.values(frequency1),
      Object.values(frequency2)
    );
    const genre = +((genreSimilarity / totalGenresFrequency) * 100).toFixed(2);
    setGenrePercentage(genre);
    console.log(+((genreSimilarity / totalGenresFrequency) * 100).toFixed(2));
    let artistSimilarity = 0;
    for (let artist of topMusic) {
      console.log(
        artist.name,
        topMusic2.find((el) => el.name === artist.name)
      );
      if (topMusic2.find((el) => el.name === artist.name)) {
        artistSimilarity += 2;
        commonArtists.push(artist);
      }
    }
    const totalArtists = topMusic.length + topMusic2.length;
    const artist = +((artistSimilarity / totalArtists) * 100).toFixed(2);
    setArtistPercentage(artist);
    setTotalPercentage((genre + artist) / 2);
    // const
    setLoading(false);
  }, [topMusic, topMusic2]);
  if (loading)
    return (
      <h1 className={styles.heading}>We Are Calculating Your Compatibility</h1>
    );
  return (
    <section>
      <h1 className={styles.heading}>
        Your Genre Taste Matches <br /> {genrePercentage}% <br /> Your Artist
        Taste Matches <br /> {artistPercentage}%{/* <hr /> */} <br /> Your Music
        Taste Matches <br /> {totalPercentage}%
      </h1>
      <p className={styles.text}>
        Top Artists You Both Listen To:{" "}
        {commonArtists.slice(0, 5).map((el) => (
          <>
            <hr />
            {el.name}
          </>
        ))}
      </p>
    </section>
  );
};

export default Comparison;
