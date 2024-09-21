import { shallowMount } from "@vue/test-utils";
import MovieList from "@/components/MovieList.vue";

describe("MovieList.vue", () => {
  it("renders movies when passed", () => {
    const movies = [
      { imdbID: "1", Title: "Titanic", Year: "1997", Poster: "some-url" },
      { imdbID: "2", Title: "Avatar", Year: "2009", Poster: "some-url" },
    ];
    const wrapper = shallowMount(MovieList, {
      propsData: { movies, error: "" },
    });

    const movieCards = wrapper.findAll(".movie-card");
    expect(movieCards).toHaveLength(2); // 2 movies should be rendered
    expect(movieCards.at(0).text()).toContain("Titanic");
    expect(movieCards.at(1).text()).toContain("Avatar");
  });

  it("displays an error message if error prop is set", () => {
    const wrapper = shallowMount(MovieList, {
      propsData: { movies: [], error: "No movies found" },
    });

    expect(wrapper.text()).toContain("No movies found");
  });
});
