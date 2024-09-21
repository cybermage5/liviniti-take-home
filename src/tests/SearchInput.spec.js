import { shallowMount } from "@vue/test-utils";
import SearchInput from "@/components/SearchInput.vue";

describe("SearchInput.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SearchInput, {
      propsData: {
        query: "",
        year: "",
        type: "",
        allTypes: ["movie", "series", "episode"],
      },
    });
  });

  it("renders search input fields correctly", () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="number"]').exists()).toBe(true);
    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("emits an update event when query input changes", async () => {
    const input = wrapper.find('input[type="text"]');
    await input.setValue("titanic");
    expect(wrapper.emitted()["update:query"][0]).toEqual(["titanic"]);
  });

  it("emits an update event when year input changes", async () => {
    const input = wrapper.find('input[type="number"]');
    await input.setValue("1997");
    expect(wrapper.emitted()["update:year"][0]).toEqual(["1997"]);
  });

  it("emits an update event when type changes", async () => {
    const select = wrapper.find("select");
    await select.setValue("series");
    expect(wrapper.emitted()["update:type"][0]).toEqual(["series"]);
  });

  it("emits a search event when search button is clicked", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().search).toBeTruthy();
  });
});
