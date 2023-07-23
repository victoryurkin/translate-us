import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

export const SettingsIcon: React.FC<Props> = ({ width, height, fill }) => (
  <Svg viewBox="0 0 800 803.07" width={width} height={height} fill={fill}>
    <G>
      <Path d="M350.31 290.16c-89.66 0-162.6 72.94-162.6 162.6s72.94 162.6 162.6 162.6 162.6-72.94 162.6-162.6c0-3.34-2.71-6.05-6.05-6.05-1.62 0-3.14.63-4.28 1.77a6.013 6.013 0 0 0-1.77 4.28c0 82.98-67.51 150.49-150.5 150.49s-150.49-67.51-150.49-150.49 67.51-150.5 150.49-150.5c1.62 0 3.14-.63 4.28-1.77a6.013 6.013 0 0 0 1.77-4.28c0-3.34-2.71-6.05-6.05-6.05ZM702.18 305.35l32.32 20.45 23.18-23.19-20.45-32.32a16.635 16.635 0 0 1-.38-17.15c5.84-10.19 10.36-21.1 13.45-32.45 1.62-5.94 6.38-10.5 12.39-11.85l37.31-8.39v-32.78l-37.31-8.39a16.602 16.602 0 0 1-12.39-11.85 138.368 138.368 0 0 0-13.45-32.45 16.611 16.611 0 0 1 .38-17.15l20.45-32.32-23.18-23.18-32.32 20.45a16.612 16.612 0 0 1-17.15.38 138.09 138.09 0 0 0-32.45-13.44 16.627 16.627 0 0 1-11.86-12.4L632.33.01h-32.79l-8.39 37.31a16.643 16.643 0 0 1-11.86 12.4 138.09 138.09 0 0 0-32.45 13.44 16.612 16.612 0 0 1-17.15-.38l-32.32-20.45-23.18 23.18 20.45 32.32c3.29 5.21 3.44 11.81.38 17.15a138.163 138.163 0 0 0-13.44 32.45 16.617 16.617 0 0 1-12.39 11.85l-37.31 8.39v32.78l37.31 8.39a16.614 16.614 0 0 1 12.39 11.86c3.08 11.34 7.61 22.26 13.44 32.45a16.611 16.611 0 0 1-.38 17.15l-20.45 32.32 23.18 23.19 32.32-20.45c5.21-3.3 11.81-3.44 17.15-.38 10.18 5.83 21.1 10.36 32.45 13.44a16.643 16.643 0 0 1 11.86 12.4l8.39 37.3h32.79l8.39-37.3a16.626 16.626 0 0 1 11.86-12.4c11.35-3.08 22.26-7.61 32.45-13.44a16.589 16.589 0 0 1 17.15.38Zm-52.38 2.86a27.14 27.14 0 0 0-19.39 20.28l-6.54 29.05H608l-6.53-29.05a27.17 27.17 0 0 0-19.4-20.28 127.526 127.526 0 0 1-29.96-12.41c-8.77-5.03-19.52-4.79-28.07.61l-25.17 15.93-11.22-11.22 15.92-25.17c5.4-8.54 5.64-19.29.62-28.06a127.35 127.35 0 0 1-12.41-29.97 27.139 27.139 0 0 0-20.28-19.4l-29.06-6.54v-15.86l29.05-6.54a27.126 27.126 0 0 0 20.28-19.39c2.85-10.48 7.03-20.57 12.42-29.97a27.148 27.148 0 0 0-.62-28.06l-15.93-25.17 11.22-11.22 25.17 15.93c8.54 5.41 19.3 5.64 28.06.62 9.41-5.39 19.49-9.57 29.96-12.41a27.122 27.122 0 0 0 19.4-20.28l6.53-29.05h15.87l6.53 29.06a27.139 27.139 0 0 0 19.4 20.28c10.47 2.85 20.55 7.02 29.96 12.41a27.103 27.103 0 0 0 28.06-.62l25.17-15.93L744.19 67l-15.93 25.17a27.148 27.148 0 0 0-.62 28.06c5.39 9.41 9.57 19.49 12.42 29.97a27.112 27.112 0 0 0 20.27 19.39l29.05 6.54V192l-29.05 6.53a27.157 27.157 0 0 0-20.28 19.39 127.804 127.804 0 0 1-12.42 29.97 27.148 27.148 0 0 0 .62 28.06l15.93 25.17-11.22 11.22-25.16-15.93a27.126 27.126 0 0 0-28.06-.62c-9.41 5.39-19.49 9.57-29.97 12.42Z" />
      <Path d="M615.94 89.16c-52.33 0-94.9 42.57-94.9 94.9s42.57 94.9 94.9 94.9 94.9-42.57 94.9-94.9-42.57-94.9-94.9-94.9Zm0 179.22c-46.5 0-84.32-37.83-84.32-84.32s37.83-84.32 84.32-84.32 84.33 37.83 84.33 84.32-37.83 84.32-84.33 84.32ZM217.73 692.02l5.41 2.85a273.04 273.04 0 0 0 45.9 19.02l5.83 1.81 18.59 82.65a6.016 6.016 0 0 0 5.9 4.72h101.87c2.85 0 5.28-1.94 5.9-4.72l18.59-82.65 5.84-1.81a272.797 272.797 0 0 0 45.91-19.02l5.41-2.85 71.59 45.3a6.038 6.038 0 0 0 7.52-.83l72.03-72.04c2.01-2.02 2.36-5.1.83-7.51l-45.3-71.6 2.85-5.41a273.73 273.73 0 0 0 19.02-45.9l1.81-5.84 82.65-18.59a6.016 6.016 0 0 0 4.72-5.9v-77.69c0-3.34-2.71-6.05-6.05-6.05s-6.05 2.71-6.05 6.05v72.84l-81.53 18.34a6.039 6.039 0 0 0-4.51 4.32 259.736 259.736 0 0 1-25.25 60.93 6.009 6.009 0 0 0 .14 6.24l44.69 70.63-65.19 65.19-70.63-44.69a6.053 6.053 0 0 0-6.24-.14 260.338 260.338 0 0 1-60.94 25.25 6.055 6.055 0 0 0-4.32 4.51l-18.34 81.53h-92.19l-18.34-81.53a6.043 6.043 0 0 0-4.31-4.51 259.985 259.985 0 0 1-60.94-25.25 6.03 6.03 0 0 0-6.24.13l-70.63 44.69-65.19-65.19 44.69-70.63c1.2-1.9 1.25-4.29.14-6.24a260.089 260.089 0 0 1-25.25-60.93 6.055 6.055 0 0 0-4.51-4.32l-81.54-18.34v-92.19l81.53-18.34a6.043 6.043 0 0 0 4.51-4.31c5.8-21.31 14.29-41.81 25.25-60.94a6.031 6.031 0 0 0-.14-6.24l-44.69-70.63L143.72 181l70.63 44.69c1.9 1.2 4.29 1.25 6.25.14a260.016 260.016 0 0 1 60.93-25.25 6.026 6.026 0 0 0 4.31-4.51l18.34-81.54h72.84c3.34 0 6.05-2.71 6.05-6.05s-2.71-6.05-6.05-6.05h-77.68c-2.85 0-5.28 1.94-5.9 4.72l-18.59 82.65-5.84 1.81a272.069 272.069 0 0 0-45.9 19.02l-5.41 2.85-71.59-45.3a6.027 6.027 0 0 0-7.52.84l-72.04 72.03a5.998 5.998 0 0 0-.83 7.51l45.3 71.59-2.85 5.41c-7.71 14.65-14.1 30.1-19.02 45.91l-1.81 5.84L4.69 395.9a6.016 6.016 0 0 0-4.72 5.9v101.88c0 2.85 1.94 5.28 4.72 5.9l82.66 18.59 1.81 5.84a273.04 273.04 0 0 0 19.02 45.9l2.85 5.41-45.3 71.6a6.023 6.023 0 0 0 .83 7.51l72.04 72.04a5.997 5.997 0 0 0 7.51.83l71.6-45.3Z" />
    </G>
  </Svg>
);
