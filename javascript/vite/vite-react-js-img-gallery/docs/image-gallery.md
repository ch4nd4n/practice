# Image Gallery Requirements

## Components Structure

### Holder
The main container for the gallery functionality.
- Accepts a mock list of images as props (or defines them internally/imported).

### Input > Filter
- A text input field to filter images by title or keyword.

### Button > Search
- A button to trigger the search/filter action.

### List (ul > li > images)
- Displays the images in a grid or list format.
- Structure:
  ```html
  <ul>
    <li>
      <img src="..." alt="..." />
    </li>
  </ul>
  ```

## flow
1. User lands on the index page.
2. User clicks on "Image Gallery" link.
3. Gallery component renders.
4. User types in filter input and clicks search (or types to filter).
5. List updates to show matching images.
