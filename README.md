# React Mosaicify

![NPM Version](https://img.shields.io/npm/v/@andrehadianto/react-mosaicify?&link=https://www.npmjs.com/package/@andrehadianto/react-mosaicify)


A lightweight React component for turning data into beautiful, grid-based visualizations.

## Features

*   **Responsive Mosaic Grid**: Creates a dense, responsive grid of tiles to visualize data.
*   **Customizable Grid**: Configure the number of columns to control the size and density of the tiles.

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
    { id: '1', imageUrl: 'https://example.com/image1.jpg' },
    { id: '2', imageUrl: 'https://example.com/image2.jpg' },
    { id: '3', imageUrl: 'https://example.com/image3.jpg' },
    // ... more data
  ];

  return (
    <div style={{ width: 400, height: 600 }}>
      <Mosaicify data={myData} />
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
| `className` | `string` | - | Optional CSS class to apply to the outer grid container. |
| `gridClassName` | `string` | - | Optional CSS class to apply to each grid item (both images and placeholders). |
| `numberOfColumns` | `number` | `20` | The number of columns in the grid. Higher values result in smaller tiles. |
| `minNumberOfImages` | `number` | `5` | The minimum number of images to display in the mosaic. Must be used with `maxNumberOfImages`. |
| `maxNumberOfImages` | `number` | `10` | The maximum number of images to display in the mosaic. Must be used with `minNumberOfImages`. |
