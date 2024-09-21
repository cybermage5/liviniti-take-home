import { mount } from "@vue/test-utils";
import axios from "axios";
import App from "@/App.vue";
import flushPromises from "flush-promises"; // To handle async behavior

jest.mock("axios");

describe("App.vue", () => {
  it("searches movies and renders results", async () => {
    const movies = [
      { imdbID: "1", Title: "Titanic", Year: "1997", Poster: "some-url" },
    ];

    axios.get.mockResolvedValue({
      data: { Response: "True", Search: movies, totalResults: "1" },
    });

    const wrapper = mount(App);

    // Set search query and ensure DOM is updated
    await wrapper.setData({ searchQuery: "titanic" });
    await wrapper.vm.$nextTick();

    // Trigger the search button click
    await wrapper.find("#search-button").trigger("click");
    await flushPromises(); // Wait for all promises to resolve

    // Assert movie card is rendered
    const movieCards = wrapper.findAll(".movie-card");
    expect(movieCards).toHaveLength(1);
    expect(movieCards.at(0).text()).toContain("Titanic");
  });

  it("displays an error when no movies found", async () => {
    axios.get.mockResolvedValue({
      data: { Response: "False", Error: "Movie not found!" },
    });

    const wrapper = mount(App);

    // Set search query and ensure DOM is updated
    await wrapper.setData({ searchQuery: "unknownmovie" });
    await wrapper.vm.$nextTick();

    // Trigger the search button click
    await wrapper.find("#search-button").trigger("click");
    await flushPromises(); // Wait for all promises to resolve

    // Check if error message is displayed
    expect(wrapper.text()).toContain("Movie not found!");
  });
});
