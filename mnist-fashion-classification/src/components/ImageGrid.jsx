import React, { useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';

const tabs = [
  'Ankle', 'Bag', 'Coat', 'Dress', 'Pullover',
  'Sandal', 'Shirt', 'Sneaker', 'Trouser', 'Tshirt',
];

export default function ImageGrid( { setPathImage }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedImagePath, setSelectedImagePath] = useState(null);

  const size = 150;
  const columns = 4;
  const spacing = 8;
  const gridWidth = columns * size + spacing * 2;

  const images = Array.from({ length: 50 }, (_, i) =>
    `images/${activeTab}/${i}.jpg`
  );

  return (
    <div>
      <div style={{ display: 'flex', marginTop: 20 }}>
        {/* Tabs - vertical left */}
        <div
          style={{
            minWidth: 160,
            padding: '10px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          {tabs.map((label) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              style={{
                padding: '10px',
                textAlign: 'left',
                borderLeft:
                  activeTab === label
                    ? '4px solid blue'
                    : '4px solid transparent',
                fontWeight: activeTab === label ? 'bold' : 'normal',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Image Grid - right */}
        <div style={{ padding: spacing }}>
          <Grid
            columnCount={columns}
            columnWidth={size}
            rowCount={Math.ceil(images.length / columns)}
            rowHeight={size}
            width={gridWidth}
            height={400}
          >
            {({ rowIndex, columnIndex, style }) => {
              const index = rowIndex * columns + columnIndex;
              const src = images[index];
              const isSelected = selectedImagePath === src;
              if (!src) return null;

              return (
                <div
                  style={{
                    ...style,
                    padding: spacing,
                    boxSizing: 'border-box',
                    border: isSelected ? '3px solid red' : 'none',
                  }}
                  onClick={() => setPathImage(src)}
                >
                  <img
                    src={src}
                    alt={`image-${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>
              );
            }}
          </Grid>
        </div>
      </div>
    </div>
  );
}
