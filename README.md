# Movie Search App with Infinite Scroll and Gap Handling

This project is a Vue.js-based movie search app that allows users to search for movies using the OMDB API. The app supports infinite scrolling and ensures that gaps in the movie grid are filled only when visible gaps are present in the viewport during the initial load.

## Features
- **Movie Search**: Users can search for movies based on keywords, year, and type (movie, series, episode).
- **Infinite Scroll**: Automatically loads more movies as the user scrolls to the bottom of the page.
- **Smart Gap Filling**: If the last row of movies has gaps and is visible on the initial load, more movies are loaded to fill the visible gaps.
- **Image Load Handling**: The app waits for images to fully load before checking for content gaps, ensuring accurate height calculation.

## Key Implementations

1. **Search Functionality**:
   - We utilize the OMDB API to search for movies based on user input.
   - Search results are paginated, and each new page is appended to the existing movie list.
   
2. **Image Load Tracking**:
   - The app waits for all images in the movie grid to load before calculating the height of the content.
   - This is achieved by using JavaScript's `load` event to ensure that the height is calculated after all images are fully rendered.

3. **Gap Detection on Initial Load**:
   - After the first page of movies is loaded, the app checks if the content height is smaller than the window height and whether the last row of the grid has gaps.
   - If gaps are detected and are visible in the viewport, additional movies are fetched to fill the gaps.

4. **Infinite Scrolling**:
   - When the user scrolls to the bottom of the page, more movies are fetched automatically (if available).
   - A scroll threshold is used to trigger the loading before the user reaches the absolute bottom of the page.

## How Gap Handling Works
- **Initial Load**: After the initial page is loaded, the app checks if the visible part of the movie grid has gaps. If it does, additional movies are loaded to fill those gaps.
- **Image Loading**: Since image loading affects the height of the content, the app waits for all images to load before calculating the content height.
- **Subsequent Loads**: After the initial check, infinite scroll is handled based on the user’s scroll position.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cybermage5/liviniti-take-home.git
   ```

2. Navigate to the project directory:
   ```bash
   cd liviniti-take-home
   ```

3. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

4. Add your OMDB API key to the `.env` file:
   ```
   VUE_APP_OMDB_API_URL=https://www.omdbapi.com/
   VUE_APP_OMDB_API_KEY=your-omdb-api-key
   ```

5. Run the development server:
   ```bash
   yarn serve
   ```

6. Test:
   ```bash
   yarn test
   ```

## Usage

1. Enter a movie name in the search bar.
2. (Optional) You can also filter by year or movie type (movie, series, or episode).
3. As you scroll to the bottom of the page, more movies will be loaded automatically.

## Dependencies

- **Vue.js**: Frontend framework
- **Axios**: For making API calls
- **OMDB API**: Movie data source

## License

This project is licensed under the MIT License.
