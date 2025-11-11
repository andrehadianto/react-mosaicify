# React Mosaicify

![NPM Version](https://img.shields.io/npm/v/@andrehadianto/react-mosaicify?&link=https://www.npmjs.com/package/@andrehadianto/react-mosaicify)


A lightweight React component for turning data into beautiful, grid-based visualizations.

## Demo

[mosaicify demo
](https://github.com/user-attachments/assets/de78c18e-53df-4c9d-8cbe-efe80867a7ea)

## Features

*   **Lightweight**: 9.2kb gzipped!
*   **Responsive Mosaic Grid**: Dense, responsive grid of tiles to visualize data.
*   **Tooltip!**: Customise your own tooltip to show on each cell.

## Installation

```bash
npm install @andrehadianto/react-mosaicify
```

or

```bash
yarn add @andrehadianto/react-mosaicify
```

## Getting Started

Here's a basic example of how to use `Mosaicify` in your React application:

```tsx
import React from 'react';
import Mosaicify from '@andrehadianto/react-mosaicify';

const App = () => {
  const myData = [
    { id: '1', name: 'User One', imageUrl: 'https://example.com/image1.jpg' },
    { id: '2', name: 'User Two', imageUrl: 'https://example.com/image2.jpg' },
    { id: '3', name: 'User Three', imageUrl: 'https://example.com/image3.jpg' },
    // ... more data
  ];

  return (
    <div style={{ width: 400, height: 600 }}>
      <Mosaicify
        data={myData}
        withTooltip={(item) => <div>{item.name}</div>}
        tooltipPosition="bottom"
        tooltipAlignment="center"
      />
    </div>
  );
};

export default App;
```

## API Docs

### `<Mosaicify />` Props

| Prop | Type | Default | Description |
| - | - | - | - |
| `data` | `Array<{ id: string; imageUrl: string; onClick?: () => void; [key]: string;}>` | - | An array of data objects. Each object must have an `id` and `imageUrl`. |
| `withTooltip` | `(item) => ReactNode` | - | Optional function to render tooltip content for each grid item. |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position of the tooltip. |
| `tooltipAlignment` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the tooltip. |
| `className` | `string` | - | Optional CSS class to apply to the outer grid container. |
| `gridClassName` | `string` | - | Optional CSS class to apply to each grid item (both images and placeholders). |
| `minTileWidth` | `number` | `14` | The minimum width of each tile in pixels. The grid will fit as many columns as possible. |
| `minNumberOfImages` | `number` | `5` | The minimum number of images to display in the mosaic. Must be used with `maxNumberOfImages`. |
| `maxNumberOfImages` | `number` | `10` | The maximum number of images to display in the mosaic. Must be used with `minNumberOfImages`. |
